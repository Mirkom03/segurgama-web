"use client";

import { ArrowRight, Phone } from "lucide-react";
import type { Ramo } from "@/lib/content";

type Props = {
  ramos: Ramo[];
  telefono: string;
};

export default function ContactForm({ ramos, telefono }: Props) {
  return (
    <form
      className="a-cta-final__form"
      onSubmit={(e) => {
        e.preventDefault();
        // En F2 demo solo evita recarga. Integración real en F3/F4.
      }}
    >
      <div className="a-cta-final__row">
        <div className="a-field">
          <label htmlFor="a-nombre">Nombre</label>
          <input id="a-nombre" type="text" placeholder="Tu nombre" />
        </div>
        <div className="a-field">
          <label htmlFor="a-telefono">Teléfono</label>
          <input id="a-telefono" type="tel" placeholder="6XX XXX XXX" />
        </div>
      </div>
      <div className="a-field">
        <label htmlFor="a-ramo">¿Qué quieres asegurar?</label>
        <select id="a-ramo" defaultValue="">
          <option value="" disabled>Elige un ramo</option>
          {ramos.map((r) => (
            <option key={r.slug} value={r.slug} style={{ color: "#111" }}>
              {r.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="a-cta-final__submit">
        Solicitar cotización
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>

      <div className="a-cta-final__or">o llama ahora</div>

      <a
        href={`tel:${telefono.replace(/\s/g, "")}`}
        className="a-cta-final__phone-link"
      >
        <Phone size={16} strokeWidth={2} />
        {telefono}
      </a>
    </form>
  );
}
