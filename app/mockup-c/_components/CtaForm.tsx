"use client";

import { ArrowRight } from "lucide-react";
import type { Ramo } from "@/lib/content";

export default function CtaForm({ ramos }: { ramos: Ramo[] }) {
  return (
    <form className="c-cta__form" onSubmit={(e) => e.preventDefault()}>
      <div className="c-field">
        <label htmlFor="c-name">Nombre</label>
        <input id="c-name" type="text" placeholder="Tu nombre" />
      </div>
      <div className="c-field">
        <label htmlFor="c-tel">Teléfono</label>
        <input id="c-tel" type="tel" placeholder="6XX XXX XXX" />
      </div>
      <div className="c-field">
        <label htmlFor="c-ramo">¿Qué quieres asegurar?</label>
        <select id="c-ramo" defaultValue="">
          <option value="" disabled>Elige un ramo</option>
          {ramos.map((r) => (
            <option key={r.slug} value={r.slug}>{r.title}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="c-cta__submit">
        Solicitar cotización
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </form>
  );
}
