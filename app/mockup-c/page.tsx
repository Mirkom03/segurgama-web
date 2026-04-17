import Link from "next/link";
import {
  Phone, ArrowUpRight, ArrowRight, User, MessageCircle,
} from "lucide-react";
import {
  ramos, faqs, testimonials, trustStats, aseguradorasColaboradoras,
  planSteps, diferenciadores, empresa, type Ramo,
} from "@/lib/content";
import CtaForm from "./_components/CtaForm";
import "./mockup-c.css";

export const metadata = {
  title: "Segurgama · Mockup C · Cálido mediterráneo",
};

export default function MockupCPage() {
  return (
    <>
      {/* =============== 1. NAV =============== */}
      <header className="c-nav">
        <div className="c-container c-nav__inner">
          <Link href="#inicio" className="c-nav__brand" aria-label="Segurgama Correduría de Seguros — Inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Segurgama Correduría de Seguros"
              height={40}
              style={{ height: 40, width: "auto", display: "block" }}
            />
          </Link>
          <nav className="c-nav__links">
            <a href="#inicio" className="c-nav__link c-nav__link--active">Inicio</a>
            <a href="#ramos" className="c-nav__link">Ramos</a>
            <a href="#equipo" className="c-nav__link">Equipo</a>
            <a href="#testimonio" className="c-nav__link">Casos reales</a>
            <a href="#faq" className="c-nav__link">FAQ</a>
          </nav>
          <div className="c-nav__dgsfp" title="Registro DGSFP">
            DGSFP <strong>{empresa.dgsfpNumero}</strong>
          </div>
          <a href="#cotiza" className="c-nav__cta">
            Cotizar <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
        </div>
      </header>

      {/* =============== 2. HERO =============== */}
      <section className="c-hero" id="inicio">
        <div className="c-container">
          <div className="c-hero__grid">
            <div className="c-hero__big">
              <span className="c-kicker">Correduría desde 1990</span>
              <span className="c-hero__big-number" aria-label={`${empresa.años} años`}>35</span>
              <span className="c-hero__big-line">
                comparando aseguradoras para cubrir lo que de verdad importa.
              </span>
            </div>
            <div className="c-hero__copy">
              <span className="c-kicker">Multi-ramo · Nacional · Titulados DGSFP</span>
              <h1 className="c-display c-hero__title">
                Corredor humano con <em>nombre y cara</em> — no un bot ni un call center.
              </h1>
              <p className="c-hero__sub">
                Comparamos entre todas las aseguradoras del mercado la mejor póliza para tu
                caso — incluso para lo raro (clásicos, agrícola, náutica, mascotas exóticas,
                RC deportiva). Cuando pase algo, no estarás solo.
              </p>
              <div className="c-hero__actions">
                <a href="#cotiza" className="c-btn c-btn--primary">
                  Cotizar mi seguro
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
                <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="c-hero__phone">
                  O llámanos · <strong>{empresa.telefono}</strong>
                </a>
              </div>

              <div className="c-hero__list">
                {trustStats.map((s, i) => (
                  <div key={i} className="c-hero__list-item">
                    <span className="c-hero__list-num">
                      <strong>{s.value}</strong>
                    </span>
                    <span className="c-hero__list-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== 3. PROBLEMA (editorial) =============== */}
      <section className="c-problem">
        <div className="c-container">
          <div className="c-problem__inner">
            <div>
              <span className="c-kicker">Por qué contar con nosotros</span>
              <h2 className="c-heading c-problem__title">
                La letra pequeña y los bots <em>te dejan solo cuando pasa algo.</em>
              </h2>
            </div>
            <ul className="c-problem__list">
              <li className="c-problem__num">01</li>
              <li className="c-problem__text">
                <h3 className="c-problem__text-title">Las aseguradoras directas venden lo suyo.</h3>
                <p className="c-problem__text-body">
                  No comparan con el resto del mercado. Lo que te ofrecen es lo que tienen — no lo que más te conviene.
                </p>
              </li>
              <li className="c-problem__num">02</li>
              <li className="c-problem__text">
                <h3 className="c-problem__text-title">Los comparadores son bots.</h3>
                <p className="c-problem__text-body">
                  Rellenas 40 campos y acabas en un call center rotativo. Sin criterio, sin acompañamiento, sin nadie que recuerde tu caso.
                </p>
              </li>
              <li className="c-problem__num">03</li>
              <li className="c-problem__text">
                <h3 className="c-problem__text-title">Lo raro no lo cubre casi nadie.</h3>
                <p className="c-problem__text-body">
                  Coche clásico, maquinaria agrícola, embarcación, mascota exótica, drone. Te rechazan o te suben la prima a lo imposible.
                </p>
              </li>
              <li className="c-problem__num">04</li>
              <li className="c-problem__text">
                <h3 className="c-problem__text-title">Cuando hay siniestro, pierdes tú.</h3>
                <p className="c-problem__text-body">
                  La letra pequeña aparece justo cuando la necesitas. Descubres que la cobertura era otra — y nadie te ayuda a pelear.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =============== 4. RAMOS editorial listado =============== */}
      <section className="c-ramos" id="ramos">
        <div className="c-container">
          <div className="c-ramos__head">
            <span className="c-kicker">Todo lo que cubrimos</span>
            <h2 className="c-heading c-ramos__title">Más de 20 ramos. Desde lo común hasta lo raro.</h2>
            <p className="c-ramos__sub">
              Elige qué quieres asegurar y te traemos la mejor opción entre decenas de aseguradoras. Si alguien lo cubre en España, lo encontramos nosotros.
            </p>
          </div>
          <div className="c-ramos__grid">
            {ramos.map((r: Ramo, i: number) => {
              const special = r.slug === "otros";
              return (
                <a
                  key={r.slug}
                  href={`#cotiza`}
                  className={`c-ramo ${special ? "c-ramo--special" : ""}`}
                  id={`ramo-${r.slug}`}
                >
                  <span className="c-ramo__num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="c-ramo__main">
                    <h3 className="c-ramo__title">{r.title}</h3>
                    <p className="c-ramo__blurb">{r.blurb}</p>
                  </div>
                  <ArrowUpRight className="c-ramo__arrow" size={16} strokeWidth={2} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== 5. DIFERENCIADOR editorial =============== */}
      <section className="c-differ">
        <div className="c-container">
          <div className="c-differ__inner">
            <div>
              <span className="c-kicker" style={{ color: "var(--c-teja)" }}>Qué nos hace distintos</span>
              <h2 className="c-differ__title">
                Una <em>correduría multi-aseguradora</em> con trato de toda la vida.
              </h2>
            </div>
            <div className="c-differ__pillars">
              {diferenciadores.map((d, i) => (
                <div key={d.title} className="c-pillar">
                  <span className="c-pillar__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="c-pillar__title">{d.title}</h3>
                    <p className="c-pillar__body">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 6. INSURERS =============== */}
      <section className="c-insurers" aria-label="Aseguradoras colaboradoras">
        <div className="c-container c-insurers__label">
          <span className="c-kicker" style={{ marginInline: "auto" }}>
            Algunas aseguradoras con las que trabajamos
          </span>
        </div>
        <div className="c-insurers__track">
          {[...aseguradorasColaboradoras, ...aseguradorasColaboradoras].map((n, i) => (
            <span key={`${n}-${i}`} className="c-insurers__logo">{n}</span>
          ))}
        </div>
      </section>

      {/* =============== 7. PLAN (grid bloques borde navy) =============== */}
      <section className="c-plan" id="plan">
        <div className="c-container">
          <div className="c-plan__head">
            <span className="c-kicker">Cómo trabajamos</span>
            <h2 className="c-heading c-plan__title">En tres pasos. Sin letra pequeña.</h2>
          </div>
          <div className="c-plan__grid">
            {planSteps.map((s) => (
              <article key={s.step} className="c-plan__step">
                <div className="c-plan__num">{s.step}</div>
                <h3 className="c-plan__step-title">{s.title}</h3>
                <p className="c-plan__step-body">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 8. EQUIPO =============== */}
      <section className="c-team" id="equipo">
        <div className="c-container">
          <div className="c-team__head">
            <div>
              <span className="c-kicker">Quién te atiende</span>
              <h2 className="c-heading c-team__title">
                Corredores con cara, nombre y teléfono directo.
              </h2>
            </div>
            <div className="c-team__badge">100% titulados DGSFP</div>
          </div>
          <div className="c-team__grid">
            {[
              { nombre: "Marta Delgado", rol: "Coordinación · Autos y hogar", años: "35 años" },
              { nombre: "Carlos Vidal", rol: "Empresa · industria · construcción", años: "22 años" },
              { nombre: "Lucía Ferrer", rol: "Salud · vida · decesos", años: "18 años" },
              { nombre: "Andrés Torres", rol: "Náutica · agro · especiales", años: "14 años" },
            ].map((p, i) => (
              <article key={i} className="c-team__card">
                <div className="c-team__photo" aria-label={`Foto cliente · retrato 4:5 de ${p.nombre}`}>
                  <div className="c-team__photo-ph">
                    <User size={28} strokeWidth={1.5} />
                    <span className="c-team__photo-label">
                      Foto cliente<br />4:5 · retrato
                    </span>
                  </div>
                </div>
                <div className="c-team__card-meta">
                  <h3 className="c-team__card-name">{p.nombre}</h3>
                  <p className="c-team__card-role">{p.rol}</p>
                  <span className="c-team__card-years">{p.años} en seguros</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 9. TESTIMONIO ANCHO COMPLETO (signature #2) =============== */}
      <section className="c-testimonial" id="testimonio">
        <span className="c-testimonial__big-quote" aria-hidden="true">"</span>
        <div className="c-container c-testimonial__inner">
          <span className="c-kicker" style={{ color: "var(--c-teja)", marginInline: "auto" }}>
            Lo que dicen quienes dejaron los comparadores
          </span>
          <p className="c-testimonial__quote" style={{ marginTop: "1.75rem" }}>
            "{testimonials[1].quote}"
          </p>
          <div className="c-testimonial__cite">
            <span className="c-testimonial__name">{testimonials[1].author}</span>
            <span className="c-testimonial__meta">{testimonials[1].role} · {testimonials[1].ramo}</span>
          </div>
          <div className="c-testimonial__more">
            {[testimonials[0], testimonials[2]].map((t, i) => (
              <div key={i} className="c-testimonial__small">
                <p className="c-testimonial__small-q">"{t.quote}"</p>
                <p className="c-testimonial__small-cite">
                  — {t.author}, {t.ramo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 10. FAQ =============== */}
      <section className="c-faq" id="faq">
        <div className="c-container">
          <div className="c-faq__head">
            <span className="c-kicker">Preguntas frecuentes</span>
            <h2 className="c-heading c-faq__title">Dudas honestas, respuestas claras.</h2>
          </div>
          <div className="c-faq__list">
            {faqs.map((f, i) => (
              <details key={i} className="c-faq__item" open={i === 0}>
                <summary className="c-faq__summary">
                  <span className="c-faq__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{f.q}</span>
                  <span className="c-faq__plus">+</span>
                </summary>
                <div className="c-faq__body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =============== 11. CTA FINAL =============== */}
      <section className="c-cta" id="cotiza">
        <div className="c-container">
          <div className="c-cta__inner">
            <div>
              <span className="c-kicker" style={{ color: "var(--c-cream)" }}>
                Empieza tu cotización
              </span>
              <h2 className="c-cta__title" style={{ marginTop: "1.25rem" }}>
                Un corredor te llama hoy. Sin letra pequeña.
              </h2>
              <p className="c-cta__sub">
                Cuéntanos qué quieres asegurar y en menos de 24h laborables tienes la mejor opción del mercado en tu email — traducida al castellano.
              </p>
              <a
                href={`tel:${empresa.telefono.replace(/\s/g, "")}`}
                className="c-cta__phone"
              >
                <Phone size={16} strokeWidth={2} />
                {empresa.telefono}
              </a>
            </div>
            <CtaForm ramos={ramos} />
          </div>
        </div>
      </section>

      {/* =============== 12. FOOTER =============== */}
      <footer className="c-footer">
        <div className="c-container">
          <div className="c-footer__grid">
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--c-cream)",
                  padding: "0.7rem 1rem",
                  borderRadius: 4,
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
              <p className="c-footer__desc" style={{ marginTop: "1rem" }}>
                Correduría de seguros nacional con {empresa.años} años. Elegimos por ti entre todas las aseguradoras del mercado la póliza que mejor te encaje — con asesoramiento humano titulado.
              </p>
              <span className="c-footer__dgsfp">DGSFP · Nº {empresa.dgsfpNumero}</span>
            </div>
            <div className="c-footer__col">
              <h4>Ramos</h4>
              <ul className="c-footer__links">
                {ramos.slice(0, 7).map((r) => (
                  <li key={r.slug}><a href={`#ramo-${r.slug}`}>{r.title}</a></li>
                ))}
                <li><a href="#ramos"><strong>Ver todos →</strong></a></li>
              </ul>
            </div>
            <div className="c-footer__col">
              <h4>Segurgama</h4>
              <ul className="c-footer__links">
                <li><a href="#equipo">Equipo</a></li>
                <li><a href="#testimonio">Casos reales</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#plan">Cómo trabajamos</a></li>
              </ul>
            </div>
            <div className="c-footer__col">
              <h4>Contacto</h4>
              <ul className="c-footer__links">
                <li><a href={`tel:${empresa.telefono}`}>{empresa.telefono}</a></li>
                <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
                <li><a href="#">WhatsApp · {empresa.whatsapp}</a></li>
                <li style={{ fontSize: 12, color: "rgba(245,239,228,0.4)", marginTop: "0.5rem" }}>
                  {empresa.idiomas.join(" · ")}
                </li>
              </ul>
            </div>
          </div>
          <div className="c-footer__bottom">
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
      <div className="c-mobile" role="complementary">
        <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="c-mobile__phone">
          <Phone size={15} strokeWidth={2.5} />
          Llamar
        </a>
        <a href="#" className="c-mobile__wa">
          <MessageCircle size={15} strokeWidth={2.5} />
          WhatsApp
        </a>
        <a href="#cotiza" className="c-mobile__cta">
          Cotizar <ArrowRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}
