"use client";

import { useState } from "react";
import {
  Car, Home as HomeIcon, HeartPulse, Shield, Dog, Briefcase,
  Building2, Tractor, Ship, ArrowRight,
} from "lucide-react";
import type { Ramo } from "@/lib/content";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  coche: Car, hogar: HomeIcon, salud: HeartPulse, vida: Shield,
  mascotas: Dog, "rc-profesional": Briefcase, "empresa-pyme": Building2,
  "agro-maquinaria": Tractor, nautico: Ship,
};

type Props = { ramos: Ramo[] };

export default function HeroSelector({ ramos }: Props) {
  const quickRamos = ramos.filter((r) => icons[r.slug]);
  const [active, setActive] = useState<string>("coche");
  const activeRamo = ramos.find((r) => r.slug === active) ?? ramos[0];

  return (
    <div className="b-hero__panel">
      <div className="b-hero__panel-chips">
        <span className="b-hero__panel-label">1. Elige qué quieres asegurar</span>
        <div className="b-chips">
          {quickRamos.map((r) => {
            const Icon = icons[r.slug];
            const on = r.slug === active;
            return (
              <button
                key={r.slug}
                type="button"
                className={`b-chip ${on ? "b-chip--active" : ""}`}
                onClick={() => setActive(r.slug)}
              >
                <Icon size={14} strokeWidth={2} />
                {r.title}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.55, marginTop: "0.25rem" }}>
          ¿Buscas una cobertura específica? Trabajamos con vehículos clásicos, drones, náutica, maquinaria, mascotas exóticas, RC deportiva, bodegas y otros ramos especializados. <a href="#ramos" style={{ color: "var(--b-blue-deep)", fontWeight: 600 }}>Ver todos →</a>
        </p>
      </div>

      <form
        className="b-hero__panel-form"
        onSubmit={(e) => e.preventDefault()}
        aria-label={`Cotizar ${activeRamo.title}`}
      >
        <span className="b-hero__panel-label">2. Tu teléfono — te llamamos en 10 min</span>
        <div className="b-field">
          <label htmlFor="b-tel">Teléfono</label>
          <input id="b-tel" type="tel" placeholder="6XX XXX XXX" autoComplete="tel" />
        </div>
        <div className="b-field">
          <label htmlFor="b-name">Tu nombre</label>
          <input id="b-name" type="text" placeholder="Nombre y apellido" />
        </div>
        <div className="b-hero__panel-foot">
          <button type="submit" className="b-btn b-btn--primary">
            Cotizar {activeRamo.title.split(" ")[0].toLowerCase()}
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
        <p className="b-hero__panel-foot-note">
          Te llama un corredor titulado. Sin centralitas ni menús automáticos.
        </p>
      </form>
    </div>
  );
}
