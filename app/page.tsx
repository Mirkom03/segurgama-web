import Link from "next/link";

const mockups = [
  {
    id: "a",
    name: "Institucional confianza moderna",
    palette: "Navy + Crema + Ámbar dorado",
    type: "Geist · Inter · IBM Plex Mono",
    anchor: "Allianz + Mutua Madrileña + Mapfre",
    summary:
      "Corporate trusted: sólido, 35 años, aseguradora-masa moderna bien ejecutada. Signature: oversize '35' ámbar + logos aseguradoras colaboradoras.",
  },
  {
    id: "b",
    name: "Claro moderno humano",
    palette: "Azul activo + Verde fresh + Off-white",
    type: "Bricolage Grotesque · Inter · Geist Mono",
    anchor: "Rastreator + Línea Directa + Welcome Seguros",
    summary:
      "Fresh digital con alma: la energía ágil de un comparador moderno pero con humanos visibles. Signature: chip-selector hero con form inline + comparador humano-vs-bot.",
  },
  {
    id: "d",
    name: "Derivado del logo",
    palette: "Navy + Lima + Amarillo + Cream (desde el logo cliente)",
    type: "Space Grotesk · Inter · Space Mono",
    anchor: "Brand del cliente (paleta + sensibilidad del globo)",
    summary:
      "Identidad nacida del logo actual: evoca el globo con órbitas de aseguradoras alrededor del corredor. Humanist geometric, status bar navy arriba, CTAs lima+amarillo. Signature: hero orbital + oversize '35' gradient lima→amarillo.",
  },
];

export default function IndexPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0F1318",
        color: "#F5F1E8",
        fontFamily: "var(--font-inter)",
        padding: "clamp(2rem, 5vw, 5rem)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#D99A2C",
              marginBottom: "0.5rem",
              fontFamily: "var(--font-plex-mono)",
            }}
          >
            AIDE Studios · Gate F2 · 2026-04-17
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Segurgama Correduría de Seguros
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: 17,
              maxWidth: 680,
              color: "#B5BECA",
              lineHeight: 1.55,
            }}
          >
            Cuatro direcciones opuestas dentro del eyebrow sectorial (correduría
            nacional, humana, titulada). Mismo mensaje, misma arquitectura, cuatro
            pieles. A/B/C parten de refs sectoriales; D parte del logo actual del cliente.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {mockups.map((m) => (
            <Link
              key={m.id}
              href={`/mockup-${m.id}`}
              style={{
                display: "block",
                padding: "1.75rem",
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(245,241,232,0.08)",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.25s var(--ease-expo)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-plex-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#D99A2C",
                  marginBottom: "0.75rem",
                }}
              >
                Mockup {m.id.toUpperCase()}
              </div>
              <h2
                style={{
                  fontSize: "1.35rem",
                  lineHeight: 1.2,
                  fontWeight: 600,
                  margin: 0,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.015em",
                }}
              >
                {m.name}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "#B5BECA",
                  margin: 0,
                  marginBottom: "1.25rem",
                }}
              >
                {m.summary}
              </p>
              <dl
                style={{
                  display: "grid",
                  gap: 6,
                  fontSize: 12.5,
                  fontFamily: "var(--font-plex-mono)",
                  color: "#8A94A4",
                  margin: 0,
                }}
              >
                <div>
                  <span style={{ color: "#5F6B79" }}>Paleta · </span>
                  {m.palette}
                </div>
                <div>
                  <span style={{ color: "#5F6B79" }}>Tipo · </span>
                  {m.type}
                </div>
                <div>
                  <span style={{ color: "#5F6B79" }}>Refs · </span>
                  {m.anchor}
                </div>
              </dl>
            </Link>
          ))}
        </div>

        <footer
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(245,241,232,0.08)",
            fontSize: 12,
            color: "#5F6B79",
            fontFamily: "var(--font-plex-mono)",
          }}
        >
          Segurgama Correduría de Seguros S.L. · Demo privada AIDE Studios · No
          indexable.
        </footer>
      </div>
    </main>
  );
}
