#!/usr/bin/env node
/**
 * AIDE Studios — Preflight Web Mecánico
 *
 * Versión canónica en el vault. Copiar a <cliente>-web/scripts/preflight-web.mjs
 * en F2 (antes del primer deploy).
 *
 * Ejecuta checks derivados de rule 13 con Playwright real contra una URL.
 * Escribe preflight-report.json con overall PASS/FAIL + timestamp ISO.
 * Exit 0 si PASS, 1 si FAIL, 2 si error de uso.
 *
 * Uso:
 *   node scripts/preflight-web.mjs <URL> [--expected-lang=es] [--paths=/,/mockup-a,/mockup-b]
 *                                  [--min-concrete-data=3] [--skip-anti-generic]
 *                                  [--impeccable-scan=app,components,src]
 *                                  [--skip-impeccable]
 *
 * Flags v3 (rule 16):
 *   --min-concrete-data=N       N tipos de datos concretos del cliente (default 3).
 *   --skip-anti-generic         Saltar checks A (adjetivos vacíos) + B (datos concretos).
 *                               Usar SOLO si el cliente no ha facilitado datos todavía
 *                               (demo F2 muy temprana). Requiere nota en el turno.
 *
 * Flags v4 (rule 17 — impeccable):
 *   --impeccable-scan=<dirs>    Directorios separados por coma a escanear con impeccable CLI
 *                               (default: autodetecta app,components,src,pages si existen).
 *   --skip-impeccable           Saltar scan impeccable CLI (útil si no hay red o npx falla).
 *
 * Política impeccable: WARN-level. Findings van a report.impeccable pero NO afectan
 * overall PASS/FAIL. Rule 14 hook global sigue bloqueando solo por overall=PASS.
 * Rationale: el CLI puede tener falsos positivos en código legítimo; Mirko decide
 * qué arreglar. Para bloqueo duro ver rule 17 sección "Elevar a FAIL".
 *
 * Requisitos:
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 *   (impeccable se descarga via npx al vuelo, sin install local)
 *
 * Selector obligatorio:
 *   Cada página verificada debe tener un <section data-hero>...</section>
 *   (o un elemento con atributo `data-hero`) como sección principal del hero.
 *   Si falta → FAIL con mensaje claro para arreglarlo.
 *
 * Ver:
 *   .claude/rules/13-preflight-web.md   — checklist humano (qué y por qué)
 *   .claude/rules/14-preflight-mechanical-evidence.md — regla mecánica F2
 *   .claude/rules/16-analisis-cliente-como-motor.md — pipeline v3 (checks A + B)
 *   .claude/rules/17-impeccable-integration.md — integración impeccable CLI
 *   .claude/rules/errores.md — historia de incidentes que dieron origen
 */

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

// ---------- Args ----------
const argv = process.argv.slice(2);
const url = argv.find((a) => /^https?:\/\//i.test(a));
const getOpt = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const expectedLang = getOpt('expected-lang', 'es');
const pathsArg = getOpt('paths', '/'); // comma-separated
const paths = pathsArg.split(',').map((p) => p.trim()).filter(Boolean);
const tolerance = Number(getOpt('hero-tolerance', '0')); // px over 800 allowed
const minConcreteData = Number(getOpt('min-concrete-data', '3')); // rule 16 check B
const skipAntiGeneric = argv.includes('--skip-anti-generic'); // escape hatch cuando la demo no tiene datos aún
const skipImpeccable = argv.includes('--skip-impeccable'); // rule 17 — escape hatch si CLI falla
const impeccableScanArg = getOpt('impeccable-scan', ''); // rule 17 — dirs separados por coma

if (!url) {
  console.error('Usage: node scripts/preflight-web.mjs <URL> [--expected-lang=es] [--paths=/,/mockup-a]');
  process.exit(2);
}

// ---------- Report ----------
const report = {
  url,
  expectedLang,
  paths,
  timestamp: new Date().toISOString(),
  checks: [],
};
const add = (name, status, evidence, meta = {}) =>
  report.checks.push({ name, status, evidence, ...meta });
const pass = (name, evidence, meta) => add(name, 'PASS', evidence, meta);
const fail = (name, evidence, meta) => add(name, 'FAIL', evidence, meta);

// ---------- Helpers ----------
const digitsOf = (s) => (s || '').replace(/\D+/g, '');
const normalizePath = (raw) => {
  // Defensive: Git Bash / MSYS may mangle "/foo" → "C:/Program Files/Git/foo".
  // Strip any C:/... prefix that starts with a Windows drive letter.
  let p = raw.trim();
  const drive = p.match(/^[A-Za-z]:[\\/].*?[\\/]([^\\/].*)$/);
  if (drive) p = '/' + drive[1].split(/[\\/]/).pop();
  // If path doesn't start with / or protocol, add leading slash.
  if (!p.startsWith('/') && !/^https?:/.test(p)) p = '/' + p;
  return p;
};
const fullUrl = (base, p) => {
  const u = new URL(base);
  const np = normalizePath(p);
  u.pathname = np === '/' ? '/' : np.replace(/\/$/, '');
  u.search = '';
  return u.toString();
};

// ---------- Run ----------
const browser = await chromium.launch();
try {
  for (const p of paths) {
    const target = fullUrl(url, p);
    const prefix = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_');

    // Desktop 1440×800
    const ctxDesktop = await browser.newContext({
      viewport: { width: 1440, height: 800 },
      deviceScaleFactor: 1,
      locale: expectedLang,
      extraHTTPHeaders: { 'Accept-Language': expectedLang },
    });
    const pageD = await ctxDesktop.newPage();
    const consoleErrors = [];
    pageD.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300));
    });

    let loadOk = true;
    try {
      const resp = await pageD.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
      if (!resp || !resp.ok()) {
        loadOk = false;
        fail(`${prefix}_page_loads`, `HTTP ${resp?.status() ?? 'no response'} at ${target}`);
      } else {
        pass(`${prefix}_page_loads`, `HTTP ${resp.status()} at ${target}`);
      }
      await pageD.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    } catch (err) {
      loadOk = false;
      fail(`${prefix}_page_loads`, `Navigation error: ${err.message}`);
    }

    if (loadOk) {
      // --- Hero fits 1440×800 ---
      const heroBottom1440 = await pageD.evaluate(() => {
        const el = document.querySelector('[data-hero]');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { bottom: Math.round(r.bottom), height: Math.round(r.height) };
      });
      if (heroBottom1440 === null) {
        fail(
          `${prefix}_hero_selector_1440x800`,
          `No [data-hero] element found on ${target}. Añade data-hero al <section> del hero.`
        );
      } else if (heroBottom1440.bottom > 800 + tolerance) {
        fail(
          `${prefix}_hero_fits_1440x800`,
          `Hero bottom=${heroBottom1440.bottom}px (limit 800). Overflow by ${heroBottom1440.bottom - 800}px. Height=${heroBottom1440.height}px.`,
          { bottom: heroBottom1440.bottom, limit: 800 }
        );
      } else {
        pass(
          `${prefix}_hero_fits_1440x800`,
          `Hero bottom=${heroBottom1440.bottom}px, cabe con ${800 - heroBottom1440.bottom}px de holgura. Height=${heroBottom1440.height}px.`,
          { bottom: heroBottom1440.bottom }
        );
      }

      // --- html lang ---
      const htmlLang = await pageD.evaluate(() => document.documentElement.lang || '');
      const normalizedLang = (htmlLang || '').toLowerCase().split('-')[0];
      if (normalizedLang !== expectedLang) {
        fail(
          `${prefix}_default_locale`,
          `<html lang="${htmlLang}"> != expected "${expectedLang}". Revisar localeDetection y default del routing.`,
          { htmlLang, expectedLang }
        );
      } else {
        pass(`${prefix}_default_locale`, `<html lang="${htmlLang}">`, { htmlLang });
      }

      // --- Maps iframes (Embed API sin key = FAIL) ---
      const mapsIssues = await pageD.evaluate(() => {
        const issues = [];
        const ok = [];
        document.querySelectorAll('iframe').forEach((f) => {
          const src = f.getAttribute('src') || '';
          if (!/google\.com\/maps/.test(src)) return;
          const isEmbedV1 = /\/maps\/embed\/v1\//.test(src);
          const hasKey = /[?&]key=/.test(src);
          if (isEmbedV1 && !hasKey) {
            issues.push(src);
          } else {
            ok.push(src);
          }
        });
        return { issues, ok };
      });
      if (mapsIssues.issues.length > 0) {
        fail(
          `${prefix}_maps_iframes_valid`,
          `${mapsIssues.issues.length} iframe(s) usan Embed API sin &key=. Reemplaza por https://maps.google.com/maps?q=<addr>&output=embed o añade API key.\n` +
            mapsIssues.issues.map((s, i) => `  [${i}] ${s}`).join('\n')
        );
      } else {
        pass(
          `${prefix}_maps_iframes_valid`,
          `${mapsIssues.ok.length} iframe(s) de Google Maps válidos (0 Embed API sin key).`
        );
      }

      // --- Phones: digits(display) == digits(href), length 9-13 ---
      const phones = await pageD.$$eval('a[href^="tel:"]', (links) =>
        links.map((a) => ({ href: a.getAttribute('href') || '', text: (a.textContent || '').trim() }))
      );
      let phonesFail = [];
      let phonesPass = 0;
      for (const ph of phones) {
        const hd = ph.href.replace(/\D+/g, '');
        const td = ph.text.replace(/\D+/g, '');
        const hrefValidLen = hd.length >= 9 && hd.length <= 13;
        // CTA-style link (no digits in display, ej. "Call now", "Hablar con asesor") is OK
        // as long as href has valid digits.
        if (td.length === 0) {
          if (hrefValidLen) {
            phonesPass++;
          } else {
            phonesFail.push(`CTA phone "${ph.text}" → href "${ph.href}" tiene ${hd.length} dígitos (esperado 9-13)`);
          }
        } else if (hd === td) {
          if (hrefValidLen) phonesPass++;
          else phonesFail.push(`Phone "${ph.text}" tiene ${hd.length} dígitos (esperado 9-13)`);
        } else if (hd.endsWith(td) && (hd.length - td.length) <= 3) {
          // Display sin prefijo país (ej. "919 388 276" con href "+34919388276") → OK.
          if (hrefValidLen) phonesPass++;
          else phonesFail.push(`Phone "${ph.text}" tiene ${hd.length} dígitos (esperado 9-13)`);
        } else {
          phonesFail.push(`Display "${ph.text}" (digits ${td}) ≠ href "${ph.href}" (digits ${hd})`);
        }
      }
      if (phones.length === 0) {
        pass(`${prefix}_phone_format`, `0 tel: links en la página (skip).`);
      } else if (phonesFail.length > 0) {
        fail(`${prefix}_phone_format`, phonesFail.join('\n'));
      } else {
        pass(`${prefix}_phone_format`, `${phonesPass}/${phones.length} tel: links válidos (digits match + 9-13 length).`);
      }

      // --- Overflow-x 1440 ---
      const overflow1440 = await pageD.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
      }));
      if (overflow1440.sw > overflow1440.iw + 1) {
        fail(
          `${prefix}_overflow_x_1440`,
          `scrollWidth=${overflow1440.sw}px > innerWidth=${overflow1440.iw}px. Algo se sale horizontal.`
        );
      } else {
        pass(
          `${prefix}_overflow_x_1440`,
          `scrollWidth=${overflow1440.sw}px ≤ innerWidth=${overflow1440.iw}px.`
        );
      }

      // --- HTML title non-empty ---
      const title = await pageD.title();
      if (!title || title.trim().length === 0) {
        fail(`${prefix}_html_title`, `<title> vacío.`);
      } else {
        pass(`${prefix}_html_title`, `<title>${title}</title>`);
      }

      // --- Console errors ---
      if (consoleErrors.length > 0) {
        fail(
          `${prefix}_console_errors`,
          `${consoleErrors.length} errors: ${consoleErrors.slice(0, 5).join(' | ')}${consoleErrors.length > 5 ? ' …' : ''}`
        );
      } else {
        pass(`${prefix}_console_errors`, `0 errors en console del browser.`);
      }

      // --- Anti-genérico Check A (rule 16): adjetivos vacíos fuera del H1/H2 ---
      // Origen: pipeline v3 (2026-04-21). Rule 16. Si la web usa adjetivos de LLM
      // genérico ("soluciones integrales", "innovador", "líder") en H1/H2, FAIL.
      // El copy correcto debe venir del Copy Brief firmado en F1.5.
      if (skipAntiGeneric) {
        pass(`${prefix}_empty_adjectives`, `(skipped con --skip-anti-generic)`);
      } else {
        const emptyAdjectives = [
          'soluciones integrales',
          'innovador', 'innovadora', 'innovación',
          'líder del sector', 'lider del sector',
          'excelencia',
          'compromiso total',
          'dedicación absoluta',
          'pasión por',
          'transformar tu', 'potenciar tu', 'revolucionar',
          'calidad garantizada', 'calidad y servicio',
        ];
        const adjHits = await pageD.evaluate((list) => {
          const headings = Array.from(document.querySelectorAll('h1, h2'));
          const hits = [];
          for (const h of headings) {
            const raw = (h.textContent || '').replace(/\s+/g, ' ').trim();
            const lower = raw.toLowerCase();
            for (const word of list) {
              if (lower.includes(word.toLowerCase())) {
                hits.push({ tag: h.tagName, text: raw.slice(0, 120), word });
              }
            }
          }
          return hits;
        }, emptyAdjectives);
        if (adjHits.length > 0) {
          fail(
            `${prefix}_empty_adjectives`,
            `${adjHits.length} adjetivo(s) vacío(s) en H1/H2. Usar copy del Copy Brief (F1.5):\n` +
              adjHits.slice(0, 5).map((h) => `  [${h.tag}] "${h.text}" ← contiene "${h.word}"`).join('\n')
          );
        } else {
          pass(`${prefix}_empty_adjectives`, `0 adjetivos vacíos en H1/H2.`);
        }
      }

      // --- Anti-genérico Check B (rule 16): ≥N datos concretos del cliente ---
      // Origen: pipeline v3 (2026-04-21). Rule 16. El home debe contener al menos
      // N (default 3) datos verificables del cliente: licencia/DGP nº, año de
      // fundación, cifras (clientes/proyectos/inmuebles), certificaciones sectoriales,
      // testimonios con nombre, código postal + localidad. Vienen del Business DNA
      // (F0.7) + Copy Brief (F1.5). Patterns distintos, no hits totales.
      if (skipAntiGeneric) {
        pass(`${prefix}_concrete_data`, `(skipped con --skip-anti-generic)`);
      } else {
        const concreteData = await pageD.evaluate(() => {
          const text = document.body.innerText || '';
          const patterns = [
            { name: 'Licencia/DGP/ISO/colegiación', re: /\b(DGP|ISO\s*\d{3,5}|colegiad[oa]\s+n[ºo°]|licencia\s+n[ºo°]|RGSEAA|reg\.\s*sanitario)\b/i },
            { name: 'Año de fundación', re: /\b(desde|since|fundad[oa]s?\s+en|operando\s+desde|en\s+activo\s+desde)\s+(19|20)\d{2}\b/i },
            { name: 'Cifra + unidad de negocio', re: /\b\d{2,}\s*(clientes?|proyectos?|inmuebles?|operaciones?|a[ñn]os\s+de\s+(experiencia|trayectoria|servicio)|pedidos?|env[íi]os?|obras?|restaurantes?|locales?|tiendas?)\b/i },
            { name: 'Certificación sectorial nombrada', re: /\b(estrella\s+michelin|guia\s+repsol|iso\s*9001|iso\s*27001|soc\s*2|pci\s*dss|eficiencia\s+energ[eé]tica\s+[A-G]|sello\s+(de\s+)?calidad)\b/i },
            { name: 'Código postal + localidad', re: /\b\d{5}\s+[A-ZÁÉÍÓÚÑ][a-zá-ú]{2,}/ },
            { name: 'Testimonio con nombre y rol', re: /—\s*[A-ZÁÉÍÓÚÑ][a-zá-úñ]+\s+[A-ZÁÉÍÓÚÑ][a-zá-úñ]+,\s+[a-zá-úñA-ZÁÉÍÓÚÑ]/ },
          ];
          const hits = [];
          for (const { name, re } of patterns) {
            const match = text.match(re);
            if (match) hits.push({ type: name, sample: match[0].slice(0, 80) });
          }
          return hits;
        });
        if (concreteData.length < minConcreteData) {
          fail(
            `${prefix}_concrete_data`,
            `Sólo ${concreteData.length}/${minConcreteData} tipos de datos concretos detectados. ` +
              `Añadir datos del Business DNA + Copy Brief: licencia/DGP nº, año fundación, cifras (clientes/proyectos/inmuebles), certificaciones, código postal, testimonios con nombre+rol. ` +
              (concreteData.length > 0
                ? `Encontrados: ${concreteData.map((d) => `${d.type}("${d.sample}")`).join(', ')}.`
                : `Ninguno encontrado.`)
          );
        } else {
          pass(
            `${prefix}_concrete_data`,
            `${concreteData.length}/${minConcreteData} tipos de datos concretos: ${concreteData.map((d) => d.type).join(', ')}.`
          );
        }
      }
    }

    await ctxDesktop.close();

    // Mobile 390×844
    if (loadOk) {
      const ctxMobile = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        locale: expectedLang,
        extraHTTPHeaders: { 'Accept-Language': expectedLang },
        isMobile: true,
        hasTouch: true,
      });
      const pageM = await ctxMobile.newPage();
      try {
        await pageM.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await pageM.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

        const heroBottom390 = await pageM.evaluate(() => {
          const el = document.querySelector('[data-hero]');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { bottom: Math.round(r.bottom), height: Math.round(r.height) };
        });
        if (heroBottom390 === null) {
          fail(
            `${prefix}_hero_selector_390x844`,
            `No [data-hero] element found on mobile at ${target}.`
          );
        } else if (heroBottom390.bottom > 844 + tolerance) {
          fail(
            `${prefix}_hero_fits_390x844`,
            `Mobile hero bottom=${heroBottom390.bottom}px (limit 844). Overflow by ${heroBottom390.bottom - 844}px.`
          );
        } else {
          pass(
            `${prefix}_hero_fits_390x844`,
            `Mobile hero bottom=${heroBottom390.bottom}px, cabe con ${844 - heroBottom390.bottom}px holgura.`
          );
        }

        const overflow390 = await pageM.evaluate(() => ({
          sw: document.documentElement.scrollWidth,
          iw: window.innerWidth,
        }));
        if (overflow390.sw > overflow390.iw + 1) {
          fail(
            `${prefix}_overflow_x_390`,
            `Mobile scrollWidth=${overflow390.sw}px > innerWidth=${overflow390.iw}px.`
          );
        } else {
          pass(
            `${prefix}_overflow_x_390`,
            `Mobile scrollWidth=${overflow390.sw}px ≤ innerWidth=${overflow390.iw}px.`
          );
        }
      } catch (err) {
        fail(`${prefix}_mobile_checks`, `Mobile navigation error: ${err.message}`);
      }
      await ctxMobile.close();
    }
  }
} finally {
  await browser.close();
}

// ---------- Impeccable CLI scan (rule 17) ----------
// WARN-level: findings van a report.impeccable pero NO afectan overall PASS/FAIL.
// El CLI escanea estático HTML/JSX/TSX/CSS y detecta 25 anti-patterns (AI slop + a11y).
// Para bloqueo duro, promover en rule 17 (sección "Elevar a FAIL").
report.impeccable = await runImpeccableScan({ skip: skipImpeccable, dirsArg: impeccableScanArg });

async function runImpeccableScan({ skip, dirsArg }) {
  if (skip) {
    return { ran: false, reason: 'skipped with --skip-impeccable', findings: [], findingCount: 0 };
  }

  // Autodetectar directorios a escanear si no se especifican.
  // Para Next/Vite: app, components, src, pages. Fallback: '.'.
  let dirs = [];
  if (dirsArg) {
    dirs = dirsArg.split(',').map((d) => d.trim()).filter(Boolean);
  } else {
    const candidates = ['app', 'components', 'src', 'pages'];
    for (const c of candidates) {
      try {
        const stat = await fs.stat(path.resolve(process.cwd(), c));
        if (stat.isDirectory()) dirs.push(c);
      } catch {
        // no existe, skip
      }
    }
    if (dirs.length === 0) dirs = ['.'];
  }

  try {
    // Usa --fast (regex) para evitar el coste de jsdom en árboles grandes.
    // npx descarga impeccable al vuelo si no está instalado localmente.
    const args = ['--yes', 'impeccable@latest', 'detect', '--fast', '--json', ...dirs];
    let stdout = '';
    let exitCode = 0;
    try {
      const result = await execFileP('npx', args, {
        cwd: process.cwd(),
        maxBuffer: 10 * 1024 * 1024, // 10MB por si el proyecto tiene muchos findings
        timeout: 120_000, // 2 min hard timeout
        shell: process.platform === 'win32', // Windows necesita shell para resolver npx
      });
      stdout = result.stdout;
    } catch (err) {
      // exit code 2 = findings (comportamiento esperado del CLI).
      if (err.code === 2) {
        stdout = err.stdout || '';
        exitCode = 2;
      } else {
        return {
          ran: false,
          reason: `npx impeccable failed: ${err.message.slice(0, 200)}`,
          findings: [],
          findingCount: 0,
        };
      }
    }

    let findings = [];
    try {
      const parsed = JSON.parse(stdout);
      findings = Array.isArray(parsed) ? parsed : (parsed.findings || parsed.results || []);
    } catch (parseErr) {
      return {
        ran: false,
        reason: `JSON parse failed: ${parseErr.message.slice(0, 120)}`,
        findings: [],
        findingCount: 0,
        rawPreview: stdout.slice(0, 500),
      };
    }

    // Agrupar por antipattern id para reporte legible.
    const byId = {};
    for (const f of findings) {
      const id = f.antipattern || f.id || 'unknown';
      if (!byId[id]) byId[id] = { count: 0, samples: [] };
      byId[id].count++;
      if (byId[id].samples.length < 3) {
        byId[id].samples.push({
          file: f.file || f.filePath || f.path || '?',
          snippet: (f.snippet || f.match || '').slice(0, 200),
        });
      }
    }

    return {
      ran: true,
      dirs,
      exitCode,
      findingCount: findings.length,
      byCategory: byId,
      level: 'WARN',
      note: 'Findings no afectan overall PASS/FAIL. Ver rule 17 para promover a FAIL.',
    };
  } catch (err) {
    return {
      ran: false,
      reason: `unexpected error: ${err.message.slice(0, 200)}`,
      findings: [],
      findingCount: 0,
    };
  }
}

// ---------- Summary ----------
report.total = report.checks.length;
report.passed = report.checks.filter((c) => c.status === 'PASS').length;
report.failed = report.checks.filter((c) => c.status === 'FAIL').length;
report.failed_checks = report.checks.filter((c) => c.status === 'FAIL').map((c) => c.name);
report.overall = report.failed === 0 ? 'PASS' : 'FAIL';

const outPath = path.resolve(process.cwd(), 'preflight-report.json');
await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8');

console.log(JSON.stringify(report, null, 2));
console.log('');
console.log(`preflight-report.json written to: ${outPath}`);
console.log(`overall: ${report.overall}  (${report.passed}/${report.total} PASS)`);
if (report.failed > 0) {
  console.log(`failed: ${report.failed_checks.join(', ')}`);
}

// Impeccable summary (WARN-level — no afecta overall).
if (report.impeccable) {
  if (report.impeccable.ran) {
    console.log(`impeccable: ${report.impeccable.findingCount} findings (WARN, no bloquean)`);
    if (report.impeccable.findingCount > 0 && report.impeccable.byCategory) {
      const cats = Object.keys(report.impeccable.byCategory)
        .sort((a, b) => report.impeccable.byCategory[b].count - report.impeccable.byCategory[a].count)
        .slice(0, 5);
      for (const id of cats) {
        console.log(`  - ${id}: ${report.impeccable.byCategory[id].count}`);
      }
    }
  } else {
    console.log(`impeccable: not run (${report.impeccable.reason})`);
  }
}

process.exit(report.overall === 'PASS' ? 0 : 1);
