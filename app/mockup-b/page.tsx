import Link from "next/link";
import {
  Phone, Car, Home as HomeIcon, HeartPulse, Shield, Dog, Briefcase, Building2,
  Tractor, Ship, HardHat, UtensilsCrossed, Sparkles, ArrowUpRight, Check, X,
  UserCheck, Scale, ShieldCheck, Star, Plus, User, MessageCircle,
} from "lucide-react";
import {
  ramos, faqs, testimonials, trustStats, aseguradorasColaboradoras,
  planSteps, diferenciadores, empresa, type Ramo,
} from "@/lib/content";
import HeroSelector from "./_components/HeroSelector";
import CtaForm from "./_components/CtaForm";
import "./mockup-b.css";

const ramoIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  coche: Car, hogar: HomeIcon, salud: HeartPulse, vida: Shield,
  mascotas: Dog, "rc-profesional": Briefcase, "empresa-pyme": Building2,
  "agro-maquinaria": Tractor, nautico: Ship, construccion: HardHat,
  hosteleria: UtensilsCrossed, otros: Sparkles,
};

const pillarIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  UserCheck, Scale, Sparkles, ShieldCheck,
};

export const metadata = {
  title: "Segurgama · Mockup B · Claro moderno humano",
};

export default function MockupBPage() {
  return (
    <>
      {/* =============== 1. NAV PILL FLOTANTE =============== */}
      <header className="b-nav">
        <Link href="#inicio" className="b-nav__brand" aria-label="Segurgama Correduría de Seguros — Inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Segurgama Correduría de Seguros"
            height={38}
            style={{ height: 38, width: "auto", display: "block" }}
          />
        </Link>
        <nav className="b-nav__links">
          <a href="#ramos" className="b-nav__link">Seguros</a>
          <a href="#compara" className="b-nav__link">Humanos vs bots</a>
          <a href="#plan" className="b-nav__link">Cómo funciona</a>
          <a href="#faq" className="b-nav__link">FAQ</a>
        </nav>
        <div className="b-nav__status">
          <span className="b-nav__status-dot" />
          Corredor online ahora
        </div>
        <a href="#cotiza" className="b-nav__cta">
          Cotizar
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
      </header>

      {/* =============== 2. HERO =============== */}
      <section className="b-hero" id="inicio">
        <div className="b-container">
          <div className="b-hero__inner">
            <div className="b-hero__head">
              <span className="b-kicker">Correduría DGSFP · {empresa.años} años</span>
              <h1 className="b-display b-hero__title">
                La mejor póliza del mercado, <em>elegida por alguien humano.</em>
              </h1>
              <p className="b-hero__subtitle">
                Elige el seguro, deja tu móvil y un corredor titulado te llama en menos de 10 minutos con la comparativa de todas las aseguradoras, incluidos seguros especializados que otras compañías rechazan.
              </p>
            </div>

            <HeroSelector ramos={ramos} />

            <div className="b-hero__trust">
              {trustStats.map((s, i) => (
                <div key={i} className="b-hero__trust-item">
                  <span className="b-hero__trust-value">{s.value}</span>
                  <span className="b-hero__trust-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 3. COMPARADOR HUMANO vs BOT =============== */}
      <section className="b-compare" id="compara">
        <div className="b-container">
          <div className="b-compare__head">
            <span className="b-kicker">Lo que nos diferencia</span>
            <h2 className="b-heading b-compare__title">
              Los bots no saben tu caso. Nosotros sí.
            </h2>
            <p style={{ fontSize: 15, color: "#555", maxWidth: "52ch", lineHeight: 1.55, margin: "0.5rem 0 0" }}>
              Un comparador online rellena un formulario y te deriva a una centralita donde el operador cambia a cada llamada. Segurgama es un corredor humano titulado DGSFP que te acompaña durante toda la vida de la póliza.
            </p>
          </div>

          <div className="b-compare__grid">
            <article className="b-compare__col b-compare__col--bot">
              <span className="b-compare__col-tag">Comparador online</span>
              <h3 className="b-compare__col-title">Un bot que te hace preguntas</h3>
              <ul className="b-compare__list">
                <li><X size={16} strokeWidth={2.5} />Te derivan a una centralita donde el operador cambia en cada llamada</li>
                <li><X size={16} strokeWidth={2.5} />Solo comparan precio base, no coberturas reales</li>
                <li><X size={16} strokeWidth={2.5} />Si tienes un siniestro, te dejan solo ante la aseguradora</li>
                <li><X size={16} strokeWidth={2.5} />No cubren seguros especializados (clásicos, náutica, agrícola, exóticos)</li>
                <li><X size={16} strokeWidth={2.5} />Nadie te conoce ni recuerda tu historial</li>
              </ul>
            </article>

            <div className="b-compare__vs">vs</div>

            <article className="b-compare__col b-compare__col--human">
              <span className="b-compare__col-tag">Segurgama</span>
              <h3 className="b-compare__col-title">Un corredor humano con nombre</h3>
              <ul className="b-compare__list">
                <li><Check size={16} strokeWidth={2.5} />Te atiende siempre la misma persona titulada DGSFP</li>
                <li><Check size={16} strokeWidth={2.5} />Comparamos cobertura real, letra pequeña incluida</li>
                <li><Check size={16} strokeWidth={2.5} />Gestionamos tu siniestro contigo, peleamos plazos</li>
                <li><Check size={16} strokeWidth={2.5} />Cubrimos seguros especializados — 35 años de experiencia</li>
                <li><Check size={16} strokeWidth={2.5} />Conocemos tu historial completo de pólizas</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* =============== 4. RAMOS =============== */}
      <section className="b-ramos" id="ramos">
        <div className="b-container">
          <div className="b-ramos__head">
            <div>
              <span className="b-kicker">Seguros que cubrimos</span>
              <h2 className="b-heading b-ramos__title">Elige qué quieres asegurar.</h2>
            </div>
            <p className="b-ramos__sub">
              Todos los seguros del mercado, desde coche y hogar hasta drones, bodegas y mascotas exóticas.
              Si alguien lo cubre en España, lo encontramos nosotros.
            </p>
          </div>

          <div className="b-ramos__grid">
            {ramos.map((r: Ramo) => {
              const Icon = ramoIcons[r.slug] ?? Shield;
              const special = r.slug === "otros";
              return (
                <a
                  key={r.slug}
                  href={`#ramo-${r.slug}`}
                  id={`ramo-${r.slug}`}
                  className={`b-ramo ${special ? "b-ramo--special" : ""}`}
                >
                  <div className="b-ramo__icon">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="b-ramo__title">{r.title}</h3>
                  <p className="b-ramo__blurb">{r.blurb}</p>
                  <span className="b-ramo__cta">
                    {r.cta}
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== 5. DIFERENCIADOR / PILARES =============== */}
      <section className="b-differ">
        <div className="b-container">
          <div className="b-differ__inner">
            <span className="b-kicker" style={{ marginInline: "auto" }}>Por qué somos distintos</span>
            <h2 className="b-heading b-differ__title">
              Cuatro razones por las que <em>nuestros clientes ya no van directos.</em>
            </h2>
          </div>

          <div className="b-pillars">
            {diferenciadores.map((d) => {
              const Icon = pillarIcons[d.icon] ?? ShieldCheck;
              return (
                <article key={d.title} className="b-pillar">
                  <div className="b-pillar__icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="b-pillar__title">{d.title}</h3>
                  <p className="b-pillar__body">{d.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== 6. INSURERS MARQUEE =============== */}
      <section className="b-insurers" aria-label="Aseguradoras colaboradoras">
        <div className="b-container b-insurers__label">
          <span className="b-kicker" style={{ marginInline: "auto" }}>Algunas aseguradoras con las que trabajamos</span>
        </div>
        <div className="b-insurers__track">
          {[...aseguradorasColaboradoras, ...aseguradorasColaboradoras].map((n, i) => (
            <span key={`${n}-${i}`} className="b-insurers__logo">{n}</span>
          ))}
        </div>
      </section>

      {/* =============== 7. PLAN =============== */}
      <section className="b-plan" id="plan">
        <div className="b-container">
          <div className="b-plan__head">
            <span className="b-kicker">En tres pasos</span>
            <h2 className="b-heading b-plan__title">Rápido, humano, sin letra pequeña.</h2>
          </div>
          <div className="b-plan__grid">
            {planSteps.map((s) => (
              <article key={s.step} className="b-plan__step">
                <div className="b-plan__num">{s.step}</div>
                <h3 className="b-plan__step-title">{s.title}</h3>
                <p className="b-plan__step-body">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 8. EQUIPO =============== */}
      <section className="b-team" id="equipo">
        <div className="b-container">
          <div className="b-team__head">
            <div>
              <span className="b-kicker">Quién te atiende</span>
              <h2 className="b-heading b-team__title">
                El equipo que llevará tu póliza. Con nombre, cara y móvil directo.
              </h2>
            </div>
            <div className="b-team__badge">
              <UserCheck size={14} strokeWidth={2} />
              100% titulados DGSFP
            </div>
          </div>

          <div className="b-team__grid">
            {[
              { nombre: "Marta Delgado", rol: "Coordinación · Autos y hogar", tag: "35 años" },
              { nombre: "Carlos Vidal", rol: "Empresa · industria · construcción", tag: "22 años" },
              { nombre: "Lucía Ferrer", rol: "Salud · vida · decesos", tag: "18 años" },
              { nombre: "Andrés Torres", rol: "Náutica · agro · especiales", tag: "14 años" },
            ].map((p, i) => (
              <article key={i} className="b-team__card">
                <div className="b-team__photo" aria-label={`Foto cliente · retrato 4:5 de ${p.nombre}`}>
                  <div className="b-team__photo-ph">
                    <User size={28} strokeWidth={1.5} />
                    <span className="b-team__photo-label">
                      Foto cliente<br />4:5 · retrato
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="b-team__name">{p.nombre}</h3>
                  <p className="b-team__role">{p.rol}</p>
                  <span className="b-team__tag">{p.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 9. TESTIMONIOS =============== */}
      <section className="b-tests">
        <div className="b-container">
          <div className="b-tests__head">
            <div>
              <span className="b-kicker">Clientes que dejaron el comparador</span>
              <h2 className="b-heading b-tests__title">Historias reales de quienes vinieron de bots.</h2>
            </div>
            <div className="b-rating">
              <span className="b-rating__stars">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}
              </span>
              <strong style={{ fontSize: 13 }}>4.8/5</strong>
              <span style={{ color: "#777" }}>· 320 reseñas [TBC]</span>
            </div>
          </div>

          <div className="b-tests__grid">
            {testimonials.map((t, i) => (
              <article key={i} className="b-test">
                <p className="b-test__quote">"{t.quote}"</p>
                <div className="b-test__foot">
                  <div className="b-test__avatar" aria-hidden="true">
                    {t.author.charAt(0) === "[" ? "?" : t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="b-test__author">{t.author}</p>
                    <p className="b-test__meta">{t.role}</p>
                  </div>
                </div>
                <span className="b-test__tag">{t.ramo}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 10. FAQ =============== */}
      <section className="b-faq" id="faq">
        <div className="b-container">
          <div className="b-faq__inner">
            <div>
              <span className="b-kicker">Preguntas frecuentes</span>
              <h2 className="b-heading b-faq__title">Dudas honestas, respuestas directas.</h2>
            </div>
            <div className="b-faq__list">
              {faqs.map((f, i) => (
                <details key={i} className="b-faq__item" open={i === 0}>
                  <summary className="b-faq__summary">
                    {f.q}
                    <span className="b-faq__plus">
                      <Plus size={14} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className="b-faq__body">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 11. CTA FINAL =============== */}
      <section className="b-cta" id="cotiza">
        <div className="b-container">
          <div className="b-cta__inner">
            <div>
              <span className="b-kicker" style={{ background: "rgba(21, 184, 112, 0.2)", color: "#B6F0D5" }}>
                Empieza por tu ramo
              </span>
              <h2 className="b-heading b-cta__title" style={{ marginTop: "1rem" }}>
                Un corredor humano te llama <em>en menos de 10 minutos.</em>
              </h2>
              <p className="b-cta__sub">
                Formulario corto, sin compromiso. Te llama un corredor titulado con la mejor póliza del mercado, también para seguros especializados.
              </p>
              <div style={{ marginTop: "1.75rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13.5, color: "rgba(255,255,255,0.85)" }}>
                  <UserCheck size={14} strokeWidth={2} color="var(--b-green)" />
                  Corredor titulado DGSFP
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13.5, color: "rgba(255,255,255,0.85)" }}>
                  <ShieldCheck size={14} strokeWidth={2} color="var(--b-green)" />
                  Sin compromiso, sin permanencia
                </div>
              </div>
            </div>

            <CtaForm ramos={ramos} telefono={empresa.telefono} />
          </div>
        </div>
      </section>

      {/* =============== 12. FOOTER =============== */}
      <footer className="b-footer">
        <div className="b-container">
          <div className="b-footer__grid">
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#FFFFFF",
                  padding: "0.7rem 1rem",
                  borderRadius: 12,
                  width: "fit-content",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Segurgama Correduría de Seguros"
                  height={32}
                  style={{ height: 32, width: "auto", display: "block" }}
                />
              </span>
              <p className="b-footer__desc" style={{ marginTop: "1rem" }}>
                Correduría de seguros nacional con {empresa.años} años. Elegimos por ti entre todas las aseguradoras del mercado — con asesoramiento humano titulado.
              </p>
              <span className="b-footer__dgsfp">DGSFP · Nº {empresa.dgsfpNumero}</span>
            </div>
            <div className="b-footer__col">
              <h4>Seguros</h4>
              <ul className="b-footer__links">
                {ramos.slice(0, 7).map((r) => (
                  <li key={r.slug}><a href={`#ramo-${r.slug}`}>{r.title}</a></li>
                ))}
                <li><a href="#ramos"><strong>Ver todos →</strong></a></li>
              </ul>
            </div>
            <div className="b-footer__col">
              <h4>Segurgama</h4>
              <ul className="b-footer__links">
                <li><a href="#compara">Humanos vs bots</a></li>
                <li><a href="#equipo">Equipo</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#plan">Cómo trabajamos</a></li>
              </ul>
            </div>
            <div className="b-footer__col">
              <h4>Contacto</h4>
              <ul className="b-footer__links">
                <li><a href={`tel:${empresa.telefono}`}>{empresa.telefono}</a></li>
                <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
                <li><a href="#">WhatsApp · {empresa.whatsapp}</a></li>
                <li style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
                  {empresa.idiomas.join(" · ")}
                </li>
              </ul>
            </div>
          </div>
          <div className="b-footer__bottom">
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
      <div className="b-mobile" role="complementary">
        <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="b-mobile__phone">
          <Phone size={15} strokeWidth={2.5} />
          Llamar
        </a>
        <a href="#" className="b-mobile__wa">
          <MessageCircle size={15} strokeWidth={2.5} />
          WhatsApp
        </a>
        <a href="#cotiza" className="b-mobile__cta">
          Cotizar
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}
