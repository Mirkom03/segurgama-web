import Link from "next/link";
import {
  Phone,
  Car,
  Home as HomeIcon,
  HeartPulse,
  Shield,
  Dog,
  Briefcase,
  Building2,
  Tractor,
  Ship,
  HardHat,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  MessageSquareWarning,
  UserX,
  FileWarning,
  UserCheck,
  Scale,
  ShieldCheck,
  Star,
  Plus,
  User,
  MessageCircle,
} from "lucide-react";
import {
  ramos,
  faqs,
  testimonials,
  trustStats,
  aseguradorasColaboradoras,
  planSteps,
  diferenciadores,
  empresa,
  type Ramo,
} from "@/lib/content";
import ContactForm from "./_components/ContactForm";
import "./mockup-a.css";

// Icon mapping por ramo
const ramoIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  coche: Car,
  hogar: HomeIcon,
  salud: HeartPulse,
  vida: Shield,
  mascotas: Dog,
  "rc-profesional": Briefcase,
  "empresa-pyme": Building2,
  "agro-maquinaria": Tractor,
  nautico: Ship,
  construccion: HardHat,
  hosteleria: UtensilsCrossed,
  otros: Sparkles,
};

const pillarIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  UserCheck,
  Scale,
  Sparkles,
  ShieldCheck,
};

export const metadata = {
  title: "Segurgama · Mockup A · Institucional confianza moderna",
};

export default function MockupAPage() {
  return (
    <>
      {/* =============== 1. NAV =============== */}
      <header className="a-nav">
        <div className="a-container a-nav__inner">
          <Link href="#inicio" className="a-nav__brand">
            <span className="a-nav__brand-dot" />
            Segurgama<span style={{ color: "var(--a-amber-deep)", fontWeight: 500 }}>.</span>
          </Link>
          <nav className="a-nav__links">
            <a href="#ramos" className="a-nav__link">Ramos</a>
            <a href="#diferenciador" className="a-nav__link">Por qué nosotros</a>
            <a href="#plan" className="a-nav__link">Cómo funciona</a>
            <a href="#equipo" className="a-nav__link">Equipo</a>
            <a href="#faq" className="a-nav__link">FAQ</a>
          </nav>
          <div className="a-nav__advisor" title="Asesor disponible">
            <span className="a-nav__advisor-dot" />
            Marta · {empresa.telefono}
          </div>
          <a href="#cotiza" className="a-nav__cta">
            Cotiza ya
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </header>

      {/* =============== 2. HERO =============== */}
      <section className="a-hero" id="inicio">
        <div className="a-container">
          <div className="a-hero__grid">
            <div className="a-hero__copy">
              <span className="a-kicker">Correduría DGSFP · {empresa.años} años</span>
              <h1 className="a-display a-hero__title">
                Un corredor humano. <em>Todas las aseguradoras.</em>
              </h1>
              <p className="a-hero__subtitle">
                Somos corredores titulados con 35 años comparando el mercado. En 24h te traemos la mejor póliza para tu caso — incluidos los raros que nadie quiere cubrir.
              </p>

              <div className="a-hero__chips">
                {ramos.slice(0, 8).map((r) => {
                  const Icon = ramoIcons[r.slug] ?? Shield;
                  return (
                    <a key={r.slug} href={`#ramo-${r.slug}`} className="a-hero__chip">
                      <Icon size={14} strokeWidth={2} />
                      {r.title}
                    </a>
                  );
                })}
                <a href="#ramos" className="a-hero__chip" style={{ fontWeight: 600 }}>
                  + 12 ramos más
                </a>
              </div>

              <div className="a-hero__actions">
                <a href="#cotiza" className="a-btn a-btn--primary">
                  Cotizar mi seguro
                  <ArrowRight size={16} strokeWidth={2.5} />
                </a>
                <a href="#revision" className="a-btn a-btn--ghost">
                  Revisa gratis mi póliza actual
                </a>
              </div>
            </div>

            <aside className="a-hero__card" aria-label="Llama ahora">
              <div className="a-hero__card-header">
                <span className="a-hero__card-header-dot" />
                Atendemos ahora · L-V 9:00-19:00
              </div>
              <a
                href={`tel:${empresa.telefono.replace(/\s/g, "")}`}
                className="a-hero__card-phone"
                style={{ textDecoration: "none" }}
              >
                {empresa.telefono}
              </a>
              <p className="a-hero__card-hours">
                Coordinador directo: <strong style={{ color: "var(--a-bone)" }}>Marta Delgado</strong>.
                Sin centrales ni IVR. Respuesta humana en menos de 2 min.
              </p>

              <div className="a-hero__card-divider" />

              <dl className="a-hero__card-kv">
                <dt className="a-mono">Años</dt>
                <dd>{empresa.años}+ en mediación</dd>
                <dt className="a-mono">DGSFP</dt>
                <dd>Registro nº {empresa.dgsfpNumero}</dd>
                <dt className="a-mono">Equipo</dt>
                <dd>100% titulados en seguros</dd>
                <dt className="a-mono">Ámbito</dt>
                <dd>Toda España</dd>
              </dl>

              <div className="a-hero__card-badge">
                <Plus size={10} strokeWidth={3} />
                Revisión gratuita de tu póliza actual
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =============== 3. TRUST BAR =============== */}
      <section className="a-trust" aria-label="Indicadores de confianza">
        <div className="a-container">
          <div className="a-trust__grid">
            {trustStats.map((s, i) => (
              <div key={i} className="a-trust__item">
                <span className="a-trust__value">{s.value}</span>
                <span className="a-trust__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 4. PROBLEMA / VILLANO =============== */}
      <section className="a-problem" id="por-que">
        <div className="a-container">
          <div className="a-problem__inner">
            <div>
              <span className="a-kicker">Por qué existimos</span>
              <h2 className="a-display a-problem__title" style={{ marginTop: "0.5rem" }}>
                Los comparadores son bots. Las aseguradoras te atienden como número. Nosotros somos personas tituladas.
              </h2>
            </div>
            <ul className="a-problem__list">
              <li className="a-problem__item">
                <div className="a-problem__item-icon">
                  <AlertTriangle size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="a-problem__item-title">La letra pequeña te sorprende cuando pasa algo</h3>
                  <p className="a-problem__item-body">
                    Contrataste una póliza que parecía completa hasta el primer siniestro. Descubres que la cobertura real era otra.
                  </p>
                </div>
              </li>
              <li className="a-problem__item">
                <div className="a-problem__item-icon">
                  <UserX size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="a-problem__item-title">Los comparadores te pasan a un call center</h3>
                  <p className="a-problem__item-body">
                    Después de 40 minutos rellenando datos acabas en una central que no conoce tu caso. Sin criterio, sin acompañamiento.
                  </p>
                </div>
              </li>
              <li className="a-problem__item">
                <div className="a-problem__item-icon">
                  <MessageSquareWarning size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="a-problem__item-title">Las aseguradoras directas venden solo su marca</h3>
                  <p className="a-problem__item-body">
                    No comparan con el resto del mercado. Lo que te ofrecen es lo que ellos tienen — no necesariamente lo mejor para ti.
                  </p>
                </div>
              </li>
              <li className="a-problem__item">
                <div className="a-problem__item-icon">
                  <FileWarning size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="a-problem__item-title">Lo raro no lo cubre casi nadie</h3>
                  <p className="a-problem__item-body">
                    Coche clásico, barco, maquinaria agrícola, mascota exótica, drone, RC deportiva. Las grandes aseguradoras te rechazan o te suben la prima.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =============== 5. RAMOS GRID =============== */}
      <section className="a-ramos" id="ramos">
        <div className="a-container">
          <div className="a-ramos__header">
            <div>
              <span className="a-kicker">Ramos que cubrimos</span>
              <h2 className="a-display a-ramos__title" style={{ marginTop: "0.5rem" }}>
                Elige qué quieres asegurar.
              </h2>
            </div>
            <p className="a-ramos__subtitle">
              Más de 20 ramos, desde coche y hogar hasta bodegas, drones y mascotas exóticas. Si alguien lo cubre en España, lo encontramos nosotros.
            </p>
          </div>

          <div className="a-ramos__grid">
            {ramos.map((r: Ramo) => {
              const Icon = ramoIcons[r.slug] ?? Shield;
              const isSpecial = r.slug === "otros";
              return (
                <a
                  key={r.slug}
                  href={`#cotiza-${r.slug}`}
                  className={`a-ramo-card ${isSpecial ? "a-ramo-card--special" : ""}`}
                  id={`ramo-${r.slug}`}
                >
                  <div className="a-ramo-card__icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="a-ramo-card__title">{r.title}</h3>
                  <p className="a-ramo-card__blurb">{r.blurb}</p>
                  <span className="a-ramo-card__cta">
                    {r.cta}
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== 6. DIFERENCIADOR — signature #1 =============== */}
      <section className="a-differ" id="diferenciador">
        <div className="a-container">
          <div className="a-differ__inner">
            <div>
              <span className="a-kicker" style={{ color: "var(--a-amber)" }}>
                Treinta y cinco años · un solo interlocutor
              </span>
              <div className="a-differ__big" style={{ marginTop: "1.5rem" }}>
                {empresa.años}
                <span className="a-differ__big-plus">+</span>
              </div>
              <p className="a-differ__big-label">
                años eligiendo entre todas las aseguradoras del mercado
              </p>
            </div>

            <div className="a-differ__copy">
              <h2 className="a-display a-differ__title">
                Una correduría multi-aseguradora, multi-ramo. Humana, titulada y sin letra pequeña inventada.
              </h2>
              <div className="a-differ__pillars">
                {diferenciadores.map((d) => {
                  const Icon = pillarIcons[d.icon] ?? ShieldCheck;
                  return (
                    <div key={d.title} className="a-differ__pillar">
                      <div className="a-differ__pillar-icon">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <h4 className="a-differ__pillar-title">{d.title}</h4>
                      <p className="a-differ__pillar-body">{d.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aseguradoras marquee */}
      <section className="a-insurers" aria-label="Aseguradoras colaboradoras">
        <div className="a-container a-insurers__label">
          <span className="a-kicker">Algunas aseguradoras con las que trabajamos</span>
        </div>
        <div className="a-insurers__track">
          {[...aseguradorasColaboradoras, ...aseguradorasColaboradoras].map((name, i) => (
            <span key={`${name}-${i}`} className="a-insurers__logo">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* =============== 7. COMO FUNCIONA =============== */}
      <section className="a-plan" id="plan">
        <div className="a-container">
          <div className="a-plan__header">
            <span className="a-kicker">En tres pasos</span>
            <h2 className="a-display a-plan__title">
              Rápido, humano, sin letra pequeña.
            </h2>
          </div>
          <div className="a-plan__grid">
            {planSteps.map((s) => (
              <article key={s.step} className="a-plan__step">
                <div className="a-plan__step-num">{s.step}</div>
                <h3 className="a-plan__step-title">{s.title}</h3>
                <p className="a-plan__step-body">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 8. EQUIPO — signature #2 (fotos slots) =============== */}
      <section className="a-team" id="equipo">
        <div className="a-container">
          <div className="a-team__header">
            <div>
              <span className="a-kicker">Quién te atiende</span>
              <h2 className="a-display a-team__title" style={{ marginTop: "0.5rem" }}>
                El equipo que llevará tu póliza. Con nombre, cara y móvil directo.
              </h2>
            </div>
            <div className="a-team__badge">
              <UserCheck size={14} strokeWidth={2} />
              100% titulados DGSFP
            </div>
          </div>

          <div className="a-team__grid">
            {[
              { nombre: "Marta Delgado", rol: "Coordinación general · Autos y hogar", tag: "35 años" },
              { nombre: "Carlos Vidal", rol: "Empresa · industria · construcción", tag: "22 años" },
              { nombre: "Lucía Ferrer", rol: "Salud · vida · decesos", tag: "18 años" },
              { nombre: "Andrés Torres", rol: "Náutica · agro · ramos especiales", tag: "14 años" },
            ].map((p, i) => (
              <article key={i} className="a-team__card">
                <div className="a-team__photo-slot" aria-label={`Foto cliente · retrato 4:5 de ${p.nombre}`}>
                  <div className="a-team__photo-placeholder">
                    <User size={28} strokeWidth={1.5} />
                    <span className="a-team__photo-placeholder-label">
                      Foto cliente<br />4:5 · retrato
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="a-team__card-name">{p.nombre}</h3>
                  <p className="a-team__card-role">{p.rol}</p>
                  <span className="a-team__card-tag">{p.tag} experiencia</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 9. TESTIMONIOS =============== */}
      <section className="a-testimonials" id="testimonios">
        <div className="a-container">
          <div className="a-testimonials__header">
            <div>
              <span className="a-kicker">Clientes que ya no van directos</span>
              <h2 className="a-display a-testimonials__title" style={{ marginTop: "0.5rem" }}>
                Lo que dicen quienes dejaron el comparador.
              </h2>
            </div>
            <div className="a-rating">
              <span className="a-rating__stars">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
              </span>
              <strong>4.8/5</strong>
              <span style={{ color: "var(--a-steel)" }}>· 320 reseñas Google [TBC]</span>
            </div>
          </div>

          <div className="a-testimonials__grid">
            {testimonials.map((t, i) => (
              <article key={i} className="a-testimonial">
                <p className="a-testimonial__quote">"{t.quote}"</p>
                <div className="a-testimonial__foot">
                  <div className="a-testimonial__photo" aria-hidden="true">
                    {t.author.charAt(0) === "[" ? "?" : t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="a-testimonial__author">{t.author}</p>
                    <p className="a-testimonial__meta">{t.role}</p>
                  </div>
                </div>
                <span className="a-testimonial__ramo">{t.ramo}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 10. FAQ =============== */}
      <section className="a-faq" id="faq">
        <div className="a-container">
          <div className="a-faq__inner">
            <div>
              <span className="a-kicker">Preguntas frecuentes</span>
              <h2 className="a-display a-faq__title" style={{ marginTop: "0.5rem" }}>
                Dudas honestas, respuestas claras.
              </h2>
            </div>
            <div className="a-faq__list">
              {faqs.map((f, i) => (
                <details key={i} className="a-faq__item" open={i === 0}>
                  <summary className="a-faq__summary">
                    {f.q}
                    <span className="a-faq__summary-icon">
                      <Plus size={15} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className="a-faq__body">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 11. CTA FINAL =============== */}
      <section className="a-cta-final" id="cotiza">
        <div className="a-container">
          <div className="a-cta-final__inner">
            <div>
              <span className="a-kicker" style={{ color: "var(--a-amber)" }}>
                Empieza por tu ramo
              </span>
              <h2 className="a-display a-cta-final__title" style={{ marginTop: "0.75rem" }}>
                Cuéntanos qué quieres asegurar y <em>te llamamos hoy.</em>
              </h2>
              <p className="a-cta-final__sub">
                Form corto (2 min). En menos de 24h laborables tienes la mejor opción del mercado
                en tu email, con la letra pequeña traducida al castellano.
              </p>

              <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13.5, color: "rgba(245,241,232,0.8)" }}>
                  <UserCheck size={14} strokeWidth={2} color="var(--a-amber)" />
                  Corredor titulado te atenderá
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13.5, color: "rgba(245,241,232,0.8)" }}>
                  <ShieldCheck size={14} strokeWidth={2} color="var(--a-amber)" />
                  Sin permanencia, sin compromiso
                </div>
              </div>
            </div>

            <ContactForm ramos={ramos} telefono={empresa.telefono} />
          </div>
        </div>
      </section>

      {/* =============== 12. FOOTER =============== */}
      <footer className="a-footer">
        <div className="a-container">
          <div className="a-footer__grid">
            <div className="a-footer__brand">
              <span className="a-footer__logo">
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--a-amber)",
                    display: "inline-block",
                  }}
                />
                Segurgama
              </span>
              <p className="a-footer__desc">
                Correduría de seguros nacional con {empresa.años} años. Elegimos por ti entre todas las aseguradoras del mercado la póliza que mejor te encaje — con asesoramiento humano titulado.
              </p>
              <span className="a-footer__dgsfp">
                DGSFP · Registro nº {empresa.dgsfpNumero}
              </span>
            </div>
            <div className="a-footer__col">
              <h4>Ramos</h4>
              <ul className="a-footer__links">
                {ramos.slice(0, 7).map((r) => (
                  <li key={r.slug}>
                    <a href={`#ramo-${r.slug}`}>{r.title}</a>
                  </li>
                ))}
                <li><a href="#ramos"><strong>Ver todos →</strong></a></li>
              </ul>
            </div>
            <div className="a-footer__col">
              <h4>Segurgama</h4>
              <ul className="a-footer__links">
                <li><a href="#por-que">Por qué nosotros</a></li>
                <li><a href="#equipo">Equipo</a></li>
                <li><a href="#testimonios">Clientes</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#plan">Cómo trabajamos</a></li>
              </ul>
            </div>
            <div className="a-footer__col">
              <h4>Contacto</h4>
              <ul className="a-footer__links">
                <li><a href={`tel:${empresa.telefono}`}>{empresa.telefono}</a></li>
                <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
                <li><a href="#">WhatsApp · {empresa.whatsapp}</a></li>
                <li style={{ marginTop: "0.5rem", fontSize: 12, color: "rgba(245,241,232,0.4)" }}>
                  {empresa.idiomas.join(" · ")}
                </li>
              </ul>
            </div>
          </div>
          <div className="a-footer__bottom">
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
      <div className="a-mobile-sticky" role="complementary" aria-label="Acciones rápidas">
        <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="a-mobile-sticky__phone">
          <Phone size={15} strokeWidth={2.5} />
          Llamar
        </a>
        <a href="#" className="a-mobile-sticky__wa">
          <MessageCircle size={15} strokeWidth={2.5} />
          WhatsApp
        </a>
        <a href="#cotiza" className="a-mobile-sticky__quote">
          <ArrowRight size={15} strokeWidth={2.5} />
          Cotizar
        </a>
      </div>
    </>
  );
}
