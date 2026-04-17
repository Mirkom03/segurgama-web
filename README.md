# Segurgama Correduría de Seguros — Web demo

Next.js 16 + TypeScript + Tailwind v4 + Motion v12 + Lenis.

## Mockups F2

Tres direcciones opuestas, mismo molde sectorial (ver [Briefing Visual](https://github.com/Mirkom03/segurgama-web/blob/main/docs/briefing-visual.md)):

- `/mockup-a` — Institucional confianza moderna (navy + crema + ámbar)
- `/mockup-b` — Claro moderno humano (azul activo + verde fresh)
- `/mockup-c` — Cálido mediterráneo (crema + teja + navy)

## Dev

```
npm install
npm run dev
```

Server en http://localhost:3002

## Stack

- Next.js 16.1 (App Router)
- React 19.2
- Tailwind CSS v4 (preflight incluido, tokens con `@theme`)
- Motion v12 (below-fold animations)
- Lenis (smooth scroll)
- Lucide React (iconos)

## Estructura

```
app/
  layout.tsx          # Root layout
  page.tsx            # Landing con links a mockups
  globals.css         # Tokens @theme + reset mínimo
  mockup-a/           # Direccion institucional
  mockup-b/           # Direccion moderna fresh
  mockup-c/           # Direccion cálida
lib/
  content.ts          # Ramos, FAQs, testimonios, diferenciadores
```

Cada mockup tiene CSS aislado por prefijos `.a-*`, `.b-*`, `.c-*` para evitar cross-contamination.
