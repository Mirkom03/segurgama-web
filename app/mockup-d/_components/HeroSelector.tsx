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
    <div className="d-selector__panel">
      <div className="d-selector__col d-selector__col--chips">
        <span className="d-selector__label">
          <span className="d-selector__label-num">01</span>
          Elige qué quieres asegurar
        </span>
        <div className="d-chips">
          {quickRamos.map((r) => {
            const Icon = icons[r.slug];
            const on = r.slug === active;
            return (
              <button
                key={r.slug}
                type="button"
                className={`d-chip ${on ? "d-chip--active" : ""}`}
                onClick={() => setActive(r.slug)}
              >
                <Icon size={14} strokeWidth={2} />
                {r.title}
              </button>
            );
          })}
        </div>
        <p className="d-selector__extra">
          ¿Buscas una cobertura específica? Trabajamos con vehículos clásicos, drones, náutica, maquinaria, mascotas exóticas, RC deportiva, bodegas y otros seguros especializados.{" "}
          <a href="#ramos">Ver todos los seguros →</a>
        </p>
      </div>

      <form
        className="d-selector__col d-selector__col--form"
        onSubmit={(e) => e.preventDefault()}
        aria-label={`Cotizar ${activeRamo.title}`}
      >
        <span className="d-selector__label">
          <span className="d-selector__label-num">02</span>
          Déjanos tu teléfono — te llamamos en 10 min
        </span>
        <div className="d-selector__fields">
          <div className="d-field">
            <label htmlFor="d-sel-tel">Teléfono</label>
            <input id="d-sel-tel" type="tel" placeholder="6XX XXX XXX" autoComplete="tel" />
          </div>
          <div className="d-field">
            <label htmlFor="d-sel-name">Tu nombre</label>
            <input id="d-sel-name" type="text" placeholder="Nombre y apellido" />
          </div>
        </div>
        <button type="submit" className="d-selector__submit">
          Cotizar {activeRamo.title.split(" ")[0].toLowerCase()}
          <ArrowRight size={15} strokeWidth={2.5} />
        </button>
        <p className="d-selector__note">
          Te llama un corredor titulado DGSFP. Sin centralitas. Sin menús automáticos.
        </p>
      </form>
    </div>
  );
}
