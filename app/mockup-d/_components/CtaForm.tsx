"use client";

import { ArrowRight } from "lucide-react";
import type { Ramo } from "@/lib/content";

export default function CtaForm({ ramos }: { ramos: Ramo[] }) {
  return (
    <form className="d-cta__form" onSubmit={(e) => e.preventDefault()}>
      <div className="d-field">
        <label htmlFor="d-name">Nombre</label>
        <input id="d-name" type="text" placeholder="Tu nombre" />
      </div>
      <div className="d-field">
        <label htmlFor="d-tel">Teléfono</label>
        <input id="d-tel" type="tel" placeholder="6XX XXX XXX" />
      </div>
      <div className="d-field">
        <label htmlFor="d-ramo">¿Qué quieres asegurar?</label>
        <select id="d-ramo" defaultValue="">
          <option value="" disabled>Elige un ramo</option>
          {ramos.map((r) => (
            <option key={r.slug} value={r.slug} style={{ color: "#111" }}>
              {r.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="d-cta__submit">
        Cotizar ahora
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </form>
  );
}
