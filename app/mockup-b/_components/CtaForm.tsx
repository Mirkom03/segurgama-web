"use client";

import { ArrowRight, Phone } from "lucide-react";
import type { Ramo } from "@/lib/content";

type Props = {
  ramos: Ramo[];
  telefono: string;
};

export default function CtaForm({ ramos, telefono }: Props) {
  return (
    <form className="b-cta__form" onSubmit={(e) => e.preventDefault()}>
      <div className="b-field">
        <label htmlFor="b-cta-name">Nombre</label>
        <input id="b-cta-name" type="text" placeholder="Tu nombre" />
      </div>
      <div className="b-field">
        <label htmlFor="b-cta-tel">Teléfono</label>
        <input id="b-cta-tel" type="tel" placeholder="6XX XXX XXX" />
      </div>
      <div className="b-field">
        <label htmlFor="b-cta-ramo">¿Qué quieres asegurar?</label>
        <select id="b-cta-ramo" defaultValue="">
          <option value="" disabled>Elige un seguro</option>
          {ramos.map((r) => (
            <option key={r.slug} value={r.slug} style={{ color: "#111" }}>
              {r.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="b-cta__submit">
        Cotizar ahora
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
      <div className="b-cta__or">o llama</div>
      <a href={`tel:${telefono.replace(/\s/g, "")}`} className="b-cta__phone">
        <Phone size={16} strokeWidth={2} />
        {telefono}
      </a>
    </form>
  );
}
