import Link from "next/link";
import {
  Phone, Car, Home as HomeIcon, HeartPulse, Shield, Dog, Briefcase, Building2,
  Tractor, Ship, HardHat, UtensilsCrossed, Sparkles, ArrowUpRight, ArrowRight,
  UserCheck, ShieldCheck, Star, Plus, User, MessageCircle, Check, X,
} from "lucide-react";
import {
  ramos, faqs, testimonials, aseguradorasColaboradoras,
  planSteps, empresa, type Ramo,
} from "@/lib/content";
import HeroSelector from "./_components/HeroSelector";
import CtaForm from "./_components/CtaForm";
import NavMega from "./_components/NavMega";
import "./mockup-d.css";

const ramoIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  coche: Car, hogar: HomeIcon, salud: HeartPulse, vida: Shield,
  mascotas: Dog, "rc-profesional": Briefcase, "empresa-pyme": Building2,
  "agro-maquinaria": Tractor, nautico: Ship, construccion: HardHat,
  hosteleria: UtensilsCrossed, otros: Sparkles,
};

// Órbita aseguradoras: posiciones fijas en distintos ángulos y radios
const orbitalNodes = [
  { name: "MAPFRE", ring: 1, angle: -20 },
  { name: "Allianz", ring: 2, angle: 40 },
  { name: "AXA", ring: 1, angle: 75 },
  { name: "Mutua Madrileña", ring: 3, angle: 180 },
  { name: "Línea Directa", ring: 2, angle: 200 },
  { name: "Generali", ring: 1, angle: 220 },
  { name: "Zurich", ring: 3, angle: 320 },
  { name: "Reale", ring: 2, angle: 300 },
  { name: "Catalana Occ.", ring: 1, angle: 135 },
];

// Convierte ángulo + ring en posición relativa dentro del contenedor circular
function orbitalPosition(ring: number, angle: number) {
  const radii = { 1: 50, 2: 33, 3: 17 }; // % from center
  const r = radii[ring as 1 | 2 | 3];
  const rad = (angle * Math.PI) / 180;
  const left = 50 + r * Math.cos(rad);
  const top = 50 + r * Math.sin(rad);
  return { left: `${left}%`, top: `${top}%` };
}

export const metadata = {
  title: "Segurgama · Mockup D · Derivado del logo",
};

export default function MockupDPage() {
  return (
    <>
      {/* =============== 0. STATUS BAR =============== */}
      <div className="d-status">
        <div className="d-container d-status__inner">
          <div className="d-status__left">
            <span>
              <span className="d-status__dot" />
              Marta online · respuesta &lt; 2 min
            </span>
            <span>DGSFP · nº {empresa.dgsfpNumero}</span>
            <span>L-V 9:00-19:00</span>
          </div>
          <div className="d-status__right">
            <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`}>
              {empresa.telefono}
            </a>
          </div>
        </div>
      </div>

      {/* =============== 1. NAV =============== */}
      <header className="d-nav">
        <div className="d-container d-nav__inner">
          <Link href="#inicio" className="d-nav__brand" aria-label="Segurgama Correduría de Seguros — Inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Segurgama Correduría de Seguros"
              height={40}
              style={{ height: 40, width: "auto", display: "block" }}
            />
          </Link>
          <NavMega ramos={ramos} telefono={empresa.telefono} />
        </div>
      </header>

      {/* =============== 2. HERO =============== */}
      <section className="d-hero" id="inicio">
        <div className="d-container">
          <div className="d-hero__grid">
            <div className="d-hero__copy">
              <span className="d-kicker">Correduría · multi-aseguradora</span>
              <h1 className="d-display d-hero__title">
                Decenas de aseguradoras. <em>Un corredor humano.</em>
              </h1>
              <p className="d-hero__sub">
                Desde 1990 buscamos la mejor póliza del mercado para ti, incluidos los ramos especializados (vehículos clásicos, maquinaria agrícola, náutica, mascotas exóticas). Sin sistemas automáticos ni centralitas impersonales.
              </p>
              <div className="d-hero__cta">
                <a href="#cotiza" className="d-btn d-btn--primary">
                  Cotizar mi seguro
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
                <a href="#humanos-vs-bots" className="d-btn d-btn--ghost">
                  Humanos vs bots
                </a>
              </div>

              <div className="d-hero__stats">
                <div className="d-hero__stat">
                  <div className="d-hero__stat-v"><strong>35+</strong></div>
                  <div className="d-hero__stat-l">años mediando</div>
                </div>
                <div className="d-hero__stat">
                  <div className="d-hero__stat-v"><strong>12+</strong></div>
                  <div className="d-hero__stat-l">aseguradoras</div>
                </div>
                <div className="d-hero__stat">
                  <div className="d-hero__stat-v"><strong>20+</strong></div>
                  <div className="d-hero__stat-l">ramos cubiertos</div>
                </div>
                <div className="d-hero__stat">
                  <div className="d-hero__stat-v"><strong>100%</strong></div>
                  <div className="d-hero__stat-l">titulados DGSFP</div>
                </div>
              </div>
            </div>

            {/* SIGNATURE MOMENT #1 — Órbita de aseguradoras alrededor de Segurgama */}
            <div className="d-orbital" aria-hidden="true">
              <span className="d-orbital__lima-glow" />
              <div className="d-orbital__ring d-orbital__ring--1" />
              <div className="d-orbital__ring d-orbital__ring--2" />
              <div className="d-orbital__ring d-orbital__ring--3" />

              {orbitalNodes.map((n) => (
                <span
                  key={n.name}
                  className="d-orbital__node"
                  style={orbitalPosition(n.ring, n.angle)}
                  title={n.name}
                >
                  {n.name}
                </span>
              ))}

              <div className="d-orbital__center">
                <span className="d-orbital__center-label">Tú aquí</span>
                <span className="d-orbital__center-title">Segurgama</span>
                <span className="d-orbital__center-sub">
                  Un corredor conecta todo.<br />Tú solo eliges.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== 2.5. SELECTOR PRESUPUESTO =============== */}
      <section className="d-selector" id="cotiza-rapido">
        <div className="d-container">
          <div className="d-selector__head">
            <span className="d-kicker">Cotiza en 2 minutos</span>
            <h2 className="d-heading d-selector__title">
              Elige ramo, deja tu móvil — <em>te llamamos en menos de 10 min.</em>
            </h2>
            <p className="d-selector__sub">
              Sin formularios de 40 campos. Un corredor humano titulado se conecta con la aseguradora correcta y te trae la mejor póliza del mercado en 24h.
            </p>
          </div>
          <HeroSelector ramos={ramos} />
        </div>
      </section>

      {/* =============== 2.6. HUMANO VS BOT (propuesta de valor) =============== */}
      <section className="d-compare" id="humanos-vs-bots">
        <div className="d-container">
          <div className="d-compare__head">
            <span className="d-kicker" style={{ marginInline: "auto" }}>
              La diferencia real
            </span>
            <h2 className="d-heading d-compare__title">
              Los bots no saben tu caso. <em>Nosotros sí.</em>
            </h2>
            <p className="d-compare__sub">
              Un comparador online rellena un formulario y te deriva a una centralita donde el operador cambia a cada llamada. Segurgama es un corredor humano titulado DGSFP que te acompaña durante toda la vida de la póliza.
            </p>
          </div>

          <div className="d-compare__grid">
            <article className="d-compare__col d-compare__col--bot">
              <span className="d-compare__col-tag">Comparador online</span>
              <h3 className="d-compare__col-title">Un bot que te hace preguntas</h3>
              <ul className="d-compare__list">
                <li><X size={15} strokeWidth={2.5} />Te derivan a una centralita sin memoria: operador distinto cada llamada</li>
                <li><X size={15} strokeWidth={2.5} />Solo comparan precio base, no coberturas reales</li>
                <li><X size={15} strokeWidth={2.5} />Si tienes un siniestro, te dejan solo ante la aseguradora</li>
                <li><X size={15} strokeWidth={2.5} />No cubren ramos especializados: clásicos, náutica, agrícola, exóticos</li>
                <li><X size={15} strokeWidth={2.5} />Nadie recuerda tu historial cuando renuevas</li>
              </ul>
            </article>

            <span className="d-compare__vs" aria-hidden="true">vs</span>

            <article className="d-compare__col d-compare__col--human">
              <span className="d-compare__col-tag">Segurgama</span>
              <h3 className="d-compare__col-title">Un corredor humano con nombre</h3>
              <ul className="d-compare__list">
                <li><Check size={15} strokeWidth={2.5} />Te atiende siempre la misma persona titulada DGSFP</li>
                <li><Check size={15} strokeWidth={2.5} />Comparamos cobertura real con letra pequeña traducida</li>
                <li><Check size={15} strokeWidth={2.5} />Gestionamos tu siniestro y peleamos plazos por ti</li>
                <li><Check size={15} strokeWidth={2.5} />Cubrimos ramos especializados — 35 años buscando pólizas</li>
                <li><Check size={15} strokeWidth={2.5} />Conocemos tu historial entero cuando toca renovar</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* =============== 3. PROBLEMA =============== */}
      <section className="d-problem">
        <div className="d-container">
          <div className="d-problem__inner">
            <div>
              <span className="d-kicker">Por qué existimos</span>
              <h2 className="d-heading d-problem__title">
                Los comparadores son bots. Las aseguradoras <em>venden solo lo suyo.</em>
              </h2>
            </div>
            <ul className="d-problem__list">
              <li className="d-problem__item">
                <span className="d-problem__item-num">01</span>
                <div>
                  <h3 className="d-problem__item-title">La letra pequeña sorprende cuando pasa algo</h3>
                  <p className="d-problem__item-body">
                    Contrataste una póliza que parecía completa. El día del siniestro descubres que la cobertura real era otra.
                  </p>
                </div>
              </li>
              <li className="d-problem__item">
                <span className="d-problem__item-num">02</span>
                <div>
                  <h3 className="d-problem__item-title">Los comparadores te pasan a call center</h3>
                  <p className="d-problem__item-body">
                    Rellenas 40 campos en un formulario y acabas en una centralita donde el operador cambia cada llamada, sin criterio ni memoria de tu caso.
                  </p>
                </div>
              </li>
              <li className="d-problem__item">
                <span className="d-problem__item-num">03</span>
                <div>
                  <h3 className="d-problem__item-title">Las aseguradoras directas venden solo su marca</h3>
                  <p className="d-problem__item-body">
                    No comparan con el resto del mercado. Lo que te ofrecen es lo que tienen, no necesariamente lo que más te conviene.
                  </p>
                </div>
              </li>
              <li className="d-problem__item">
                <span className="d-problem__item-num">04</span>
                <div>
                  <h3 className="d-problem__item-title">Los ramos especializados casi nadie los cubre</h3>
                  <p className="d-problem__item-body">
                    Vehículo clásico, maquinaria agrícola, embarcación, mascota exótica, dron. Las grandes compañías los rechazan o aplican primas desproporcionadas.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =============== 4. RAMOS =============== */}
      <section className="d-ramos" id="ramos">
        <div className="d-container">
          <div className="d-ramos__head">
            <div>
              <span className="d-kicker">Ramos que cubrimos</span>
              <h2 className="d-heading d-ramos__title">Elige qué quieres asegurar.</h2>
            </div>
            <p className="d-ramos__sub">
              Más de 20 ramos, desde coche y hogar hasta bodegas, drones y mascotas exóticas. Si alguien lo cubre en España, lo encontramos nosotros.
            </p>
          </div>

          <div className="d-ramos__grid">
            {ramos.map((r: Ramo) => {
              const Icon = ramoIcons[r.slug] ?? Shield;
              const special = r.slug === "otros";
              return (
                <a
                  key={r.slug}
                  href="#cotiza"
                  id={`ramo-${r.slug}`}
                  className={`d-ramo ${special ? "d-ramo--special" : ""}`}
                >
                  <div className="d-ramo__icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="d-ramo__title">{r.title}</h3>
                  <p className="d-ramo__blurb">{r.blurb}</p>
                  <span className="d-ramo__cta">
                    {r.cta}
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== 6. INSURERS =============== */}
      <section className="d-insurers" aria-label="Aseguradoras colaboradoras">
        <div className="d-container d-insurers__label">
          <span className="d-kicker" style={{ marginInline: "auto" }}>
            Aseguradoras con las que trabajamos
          </span>
        </div>
        <div className="d-insurers__track">
          {[...aseguradorasColaboradoras, ...aseguradorasColaboradoras].map((n, i) => (
            <span key={`${n}-${i}`} className="d-insurers__logo">{n}</span>
          ))}
        </div>
      </section>

      {/* =============== 7. PLAN =============== */}
      <section className="d-plan" id="plan">
        <div className="d-container">
          <div className="d-plan__head">
            <span className="d-kicker">En tres pasos</span>
            <h2 className="d-heading d-plan__title">Rápido, humano, sin letra pequeña.</h2>
          </div>
          <div className="d-plan__grid">
            {planSteps.map((s, i) => (
              <article key={s.step} className="d-plan__step">
                <div className="d-plan__num">{s.step}</div>
                <h3 className="d-plan__step-title">{s.title}</h3>
                <p className="d-plan__step-body">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 8. EQUIPO =============== */}
      <section className="d-team" id="equipo">
        <div className="d-container">
          <div className="d-team__head">
            <div>
              <span className="d-kicker">Quién te atiende</span>
              <h2 className="d-heading d-team__title">
                Corredores con cara, nombre y móvil directo.
              </h2>
            </div>
            <div className="d-team__badge">
              <UserCheck size={13} strokeWidth={2} />
              100% titulados DGSFP
            </div>
          </div>

          <div className="d-team__grid">
            {[
              { nombre: "Marta Delgado", rol: "Coordinación · Autos y hogar", tag: "35 años" },
              { nombre: "Carlos Vidal", rol: "Empresa · industria · construcción", tag: "22 años" },
              { nombre: "Lucía Ferrer", rol: "Salud · vida · decesos", tag: "18 años" },
              { nombre: "Andrés Torres", rol: "Náutica · agro · especiales", tag: "14 años" },
            ].map((p, i) => (
              <article key={i} className="d-team__card">
                <div className="d-team__photo" aria-label={`Foto cliente · retrato 4:5 de ${p.nombre}`}>
                  <div className="d-team__photo-ph">
                    <User size={30} strokeWidth={1.5} />
                    <span className="d-team__photo-label">
                      Foto cliente<br />4:5 · retrato
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="d-team__card-name">{p.nombre}</h3>
                  <p className="d-team__card-role">{p.rol}</p>
                  <span className="d-team__card-tag">{p.tag} en seguros</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 9. TESTIMONIOS =============== */}
      <section className="d-tests">
        <div className="d-container">
          <div className="d-tests__head">
            <div>
              <span className="d-kicker">Clientes que dejaron el comparador</span>
              <h2 className="d-heading d-tests__title">Historias reales de quienes confiaron en humanos.</h2>
            </div>
            <div className="d-rating">
              <span className="d-rating__stars">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}
              </span>
              <strong style={{ fontSize: 13 }}>4.8/5</strong>
              <span style={{ color: "rgba(10,18,32,0.55)" }}>· 320 reseñas [TBC]</span>
            </div>
          </div>

          <div className="d-tests__grid">
            {testimonials.map((t, i) => (
              <article key={i} className="d-test">
                <p className="d-test__quote">"{t.quote}"</p>
                <div className="d-test__foot">
                  <div className="d-test__avatar" aria-hidden="true">
                    {t.author.charAt(0) === "[" ? "?" : t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="d-test__author">{t.author}</p>
                    <p className="d-test__meta">{t.role}</p>
                  </div>
                </div>
                <span className="d-test__tag">{t.ramo}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 10. FAQ =============== */}
      <section className="d-faq" id="faq">
        <div className="d-container">
          <div className="d-faq__inner">
            <div className="d-faq__head">
              <span className="d-kicker">Preguntas frecuentes</span>
              <h2 className="d-heading d-faq__title">Dudas honestas, respuestas claras.</h2>
              <p className="d-faq__sub">
                Todo lo que nos preguntan antes de contratar una correduría, respondido sin tecnicismos.
              </p>
            </div>
            <div className="d-faq__list">
              {faqs.map((f, i) => (
                <details key={i} className="d-faq__item" open={i === 0}>
                  <summary className="d-faq__summary">
                    <span className="d-faq__num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{f.q}</span>
                    <span className="d-faq__plus">
                      <Plus size={14} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className="d-faq__body">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 11. CTA FINAL =============== */}
      <section className="d-cta" id="cotiza">
        <div className="d-container">
          <div className="d-cta__inner">
            <div>
              <span className="d-kicker" style={{ color: "var(--d-yellow)" }}>
                Empieza tu cotización
              </span>
              <h2 className="d-cta__title">
                Un corredor humano te llama <em>en menos de 10 minutos.</em>
              </h2>
              <p className="d-cta__sub">
                Formulario corto (2 minutos). Te llama un corredor titulado con la mejor póliza del mercado, también para ramos especializados.
              </p>
              <a
                href={`tel:${empresa.telefono.replace(/\s/g, "")}`}
                className="d-cta__phone-link"
              >
                <Phone size={16} strokeWidth={2} />
                Llama ya · {empresa.telefono}
              </a>
            </div>
            <CtaForm ramos={ramos} />
          </div>
        </div>
      </section>

      {/* =============== 12. FOOTER =============== */}
      <footer className="d-footer">
        <div className="d-container">
          <div className="d-footer__grid">
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--d-cream)",
                  padding: "0.7rem 1rem",
                  borderRadius: 8,
                  width: "fit-content",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Segurgama Correduría de Seguros"
                  height={34}
                  style={{ height: 34, width: "auto", display: "block" }}
                />
              </span>
              <p className="d-footer__desc">
                Correduría de seguros nacional con {empresa.años} años. Elegimos por ti entre todas las aseguradoras del mercado — con asesoramiento humano titulado.
              </p>
              <span className="d-footer__dgsfp">DGSFP · Nº {empresa.dgsfpNumero}</span>
            </div>
            <div className="d-footer__col">
              <h4>Ramos</h4>
              <ul className="d-footer__links">
                {ramos.slice(0, 7).map((r) => (
                  <li key={r.slug}><a href={`#ramo-${r.slug}`}>{r.title}</a></li>
                ))}
                <li><a href="#ramos"><strong>Ver todos →</strong></a></li>
              </ul>
            </div>
            <div className="d-footer__col">
              <h4>Segurgama</h4>
              <ul className="d-footer__links">
                <li><a href="#humanos-vs-bots">Humanos vs bots</a></li>
                <li><a href="#equipo">Equipo</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#plan">Cómo trabajamos</a></li>
              </ul>
            </div>
            <div className="d-footer__col">
              <h4>Contacto</h4>
              <ul className="d-footer__links">
                <li><a href={`tel:${empresa.telefono}`}>{empresa.telefono}</a></li>
                <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
                <li><a href="#">WhatsApp · {empresa.whatsapp}</a></li>
                <li style={{ fontSize: 12, color: "rgba(250,249,242,0.4)", marginTop: "0.5rem" }}>
                  {empresa.idiomas.join(" · ")}
                </li>
              </ul>
            </div>
          </div>
          <div className="d-footer__bottom">
            <span>© 2026 Segurgama Correduría de Seguros S.L.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Aviso legal</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacidad</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* =============== 13. STICKY MOBILE =============== */}
      <div className="d-mobile" role="complementary">
        <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="d-mobile__phone">
          <Phone size={15} strokeWidth={2.5} />
          Llamar
        </a>
        <a href="#" className="d-mobile__wa">
          <MessageCircle size={15} strokeWidth={2.5} />
          WhatsApp
        </a>
        <a href="#cotiza" className="d-mobile__cta">
          Cotizar
          <ArrowRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}
