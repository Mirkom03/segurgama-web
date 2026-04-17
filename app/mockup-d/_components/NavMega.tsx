"use client";

import { useState } from "react";
import {
  Car, Home as HomeIcon, HeartPulse, Shield, Dog, Briefcase,
  Building2, Tractor, Ship, HardHat, UtensilsCrossed, Sparkles,
  ChevronDown, Menu, X, Phone, ArrowRight, ArrowUpRight,
} from "lucide-react";
import type { Ramo } from "@/lib/content";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  coche: Car, hogar: HomeIcon, salud: HeartPulse, vida: Shield,
  mascotas: Dog, "rc-profesional": Briefcase, "empresa-pyme": Building2,
  "agro-maquinaria": Tractor, nautico: Ship, construccion: HardHat,
  hosteleria: UtensilsCrossed, otros: Sparkles,
};

type GroupKey = "particular" | "profesional" | "empresa" | "especial";

const groupLabels: Record<GroupKey, string> = {
  particular: "Particulares",
  profesional: "Profesionales",
  empresa: "Empresa",
  especial: "Especializados",
};

type Props = { ramos: Ramo[]; telefono: string };

export default function NavMega({ ramos, telefono }: Props) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const grouped: Record<GroupKey, Ramo[]> = {
    particular: ramos.filter((r) => r.group === "particular"),
    profesional: ramos.filter((r) => r.group === "profesional"),
    empresa: ramos.filter((r) => r.group === "empresa"),
    especial: ramos.filter((r) => r.group === "especial"),
  };

  const closeAll = () => {
    setMegaOpen(false);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="d-nav__links">
        <div
          className="d-mega__wrap"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button
            type="button"
            className={`d-nav__link d-mega__trigger ${megaOpen ? "d-mega__trigger--open" : ""}`}
            aria-expanded={megaOpen}
            aria-haspopup="true"
            onClick={() => setMegaOpen((o) => !o)}
          >
            Seguros
            <ChevronDown size={14} strokeWidth={2.5} />
          </button>
        </div>
        <a href="#humanos-vs-bots" className="d-nav__link">Humanos vs bots</a>
        <a href="#equipo" className="d-nav__link">Equipo</a>
        <a href="#faq" className="d-nav__link">FAQ</a>
        <a href="#cotiza" className="d-nav__link">Contacto</a>
      </nav>

      <a href="#cotiza" className="d-nav__cta">
        Cotizar ahora
        <ArrowRight size={14} strokeWidth={2.5} />
      </a>

      <button
        type="button"
        className="d-hamburger"
        onClick={() => setDrawerOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      {/* Mega-menu panel desktop */}
      <div
        className={`d-mega__panel ${megaOpen ? "d-mega__panel--open" : ""}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="d-container d-mega__inner">
          <div className="d-mega__grid">
            {(Object.keys(groupLabels) as GroupKey[]).map((key) => (
              <div className="d-mega__col" key={key}>
                <span className="d-mega__col-label">{groupLabels[key]}</span>
                <ul className="d-mega__list">
                  {grouped[key].map((r) => {
                    const Icon = icons[r.slug] ?? Shield;
                    return (
                      <li key={r.slug}>
                        <a
                          href={`#cotiza-${r.slug}`}
                          className="d-mega__item"
                          onClick={closeAll}
                        >
                          <span className="d-mega__item-icon">
                            <Icon size={15} strokeWidth={2} />
                          </span>
                          <span className="d-mega__item-text">
                            <span className="d-mega__item-title">{r.title}</span>
                            <span className="d-mega__item-blurb">{r.highlights[0]}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="d-mega__foot">
            <span className="d-mega__foot-line">
              35 años especializándonos en ramos difíciles — incluidos los que otras aseguradoras rechazan.
            </span>
            <div className="d-mega__foot-ctas">
              <a
                href="#ramos"
                className="d-mega__foot-link"
                onClick={closeAll}
              >
                Ver todos los ramos
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
              <a
                href="#cotiza-rapido"
                className="d-mega__foot-cta"
                onClick={closeAll}
              >
                Cotizar en 2 min
                <ArrowRight size={13} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="d-drawer__overlay"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`d-drawer ${drawerOpen ? "d-drawer--open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <header className="d-drawer__head">
          <span className="d-drawer__brand">Segurgama</span>
          <button
            type="button"
            className="d-drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        <div className="d-drawer__body">
          <span className="d-drawer__label">Seguros</span>
          {(Object.keys(groupLabels) as GroupKey[]).map((key) => (
            <details key={key} className="d-drawer__cat" open={key === "particular"}>
              <summary>
                {groupLabels[key]}
                <ChevronDown size={16} strokeWidth={2.5} />
              </summary>
              <ul>
                {grouped[key].map((r) => {
                  const Icon = icons[r.slug] ?? Shield;
                  return (
                    <li key={r.slug}>
                      <a
                        href={`#cotiza-${r.slug}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <Icon size={14} strokeWidth={2} />
                        {r.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
          <nav className="d-drawer__nav">
            <a href="#humanos-vs-bots" onClick={() => setDrawerOpen(false)}>Humanos vs bots</a>
            <a href="#plan" onClick={() => setDrawerOpen(false)}>Cómo funciona</a>
            <a href="#equipo" onClick={() => setDrawerOpen(false)}>Equipo</a>
            <a href="#faq" onClick={() => setDrawerOpen(false)}>FAQ</a>
            <a href="#cotiza" onClick={() => setDrawerOpen(false)}>Contacto</a>
          </nav>
        </div>
        <footer className="d-drawer__foot">
          <a
            href={`tel:${telefono.replace(/\s/g, "")}`}
            className="d-drawer__foot-phone"
          >
            <Phone size={15} strokeWidth={2.5} />
            Llamar
          </a>
          <a
            href="#cotiza"
            className="d-drawer__foot-cta"
            onClick={() => setDrawerOpen(false)}
          >
            Cotizar
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </footer>
      </aside>
    </>
  );
}
