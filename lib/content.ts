/**
 * Content compartido entre los 3 mockups de Segurgama.
 *
 * Al pasar a F4 (multipágina post-firma), este archivo migra a Supabase o CMS.
 *
 * Los placeholders marcados [TBC] son datos que Miguel confirmará en Gate F1/F2.
 */

export type Ramo = {
  slug: string;
  group: "particular" | "profesional" | "empresa" | "especial";
  title: string;
  blurb: string;
  highlights: string[];
  cta: string;
};

export const ramos: Ramo[] = [
  {
    slug: "coche",
    group: "particular",
    title: "Coche y moto",
    blurb: "Turismo, moto, furgoneta, flotas. También clásicos y vehículos de colección.",
    highlights: ["Todo riesgo / terceros ampliado", "Asistencia 24h", "Clásicos hasta 40+ años"],
    cta: "Cotiza tu coche",
  },
  {
    slug: "hogar",
    group: "particular",
    title: "Hogar y comunidades",
    blurb: "Vivienda habitual, segunda residencia, casa rural y comunidades de propietarios.",
    highlights: ["Continente + contenido", "Daños por agua", "RC familiar"],
    cta: "Cotiza tu hogar",
  },
  {
    slug: "salud",
    group: "particular",
    title: "Salud y decesos",
    blurb: "Cuadro médico nacional, hospitalización, dental. Decesos con servicio integral.",
    highlights: ["Sin copagos", "Acceso a especialistas", "Dental incluido"],
    cta: "Cotiza tu salud",
  },
  {
    slug: "vida",
    group: "particular",
    title: "Vida y ahorro",
    blurb: "Vida riesgo, inversión, planes de ahorro y jubilación.",
    highlights: ["Capital por fallecimiento", "Invalidez", "Fiscalidad optimizada"],
    cta: "Cotiza tu vida",
  },
  {
    slug: "mascotas",
    group: "particular",
    title: "Mascotas",
    blurb: "Perros, gatos, caballos, reptiles y animales exóticos. RC obligatoria para razas PPP.",
    highlights: ["RC obligatoria PPP", "Asistencia veterinaria", "Cobertura exóticos"],
    cta: "Cotiza tu mascota",
  },
  {
    slug: "rc-profesional",
    group: "profesional",
    title: "Responsabilidad civil profesional",
    blurb: "Autónomos, profesionales colegiados y oficios. También deportivos (monitores, guías).",
    highlights: ["RC profesional", "Defensa jurídica", "RC deportiva especializada"],
    cta: "Cotiza tu RC",
  },
  {
    slug: "empresa-pyme",
    group: "empresa",
    title: "Multirriesgo pyme y comercio",
    blurb: "Oficinas, comercios, talleres, restauración, hostelería.",
    highlights: ["Continente + contenido", "Pérdida de beneficios", "RC explotación"],
    cta: "Cotiza tu empresa",
  },
  {
    slug: "agro-maquinaria",
    group: "especial",
    title: "Maquinaria agrícola y obra",
    blurb: "Tractores, cosechadoras, maquinaria de construcción, todo terreno.",
    highlights: ["Daños propios", "RC circulación", "Rotura de maquinaria"],
    cta: "Cotiza tu maquinaria",
  },
  {
    slug: "nautico",
    group: "especial",
    title: "Embarcaciones y motos de agua",
    blurb: "Veleros, lanchas, motos de agua, yates. Uso privado y chárter.",
    highlights: ["Casco + RC", "Asistencia náutica", "Uso comercial"],
    cta: "Cotiza tu barco",
  },
  {
    slug: "construccion",
    group: "empresa",
    title: "Construcción y montaje",
    blurb: "Todo riesgo construcción (TRC), RC decenal, montaje maquinaria industrial.",
    highlights: ["TRC", "RC decenal", "RC subsidiaria"],
    cta: "Cotiza tu obra",
  },
  {
    slug: "hosteleria",
    group: "empresa",
    title: "Hostelería y restauración",
    blurb: "Bares, restaurantes, cafeterías, hoteles, discotecas.",
    highlights: ["RC locales", "Intoxicación alimentaria", "Pérdida de beneficios"],
    cta: "Cotiza tu hostelería",
  },
  {
    slug: "otros",
    group: "especial",
    title: "Ramos especializados",
    blurb: "Drones, eventos, embarcaciones de recreo, colecciones, bodegas, viñedos, galerías, perfiles atípicos.",
    highlights: ["Cobertura en ramos especializados", "Riesgos específicos", "Asesoramiento personalizado"],
    cta: "Solicitar asesoramiento",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "¿Qué es una correduría de seguros y en qué se diferencia de una aseguradora?",
    a: "Una aseguradora vende sus propias pólizas. Una correduría como Segurgama representa a decenas de aseguradoras: analizamos tu caso y elegimos entre TODAS la que mejor te cubra al mejor precio. Somos tu asesor independiente, no el comercial de una marca.",
  },
  {
    q: "¿Me sale más caro contratar con una correduría?",
    a: "Al contrario. Cobramos una comisión a la aseguradora, no a ti. Al comparar entre decenas de compañías solemos conseguir primas más bajas que yendo directo. Y si surge un siniestro, te acompañamos sin coste.",
  },
  {
    q: "¿Quién me atiende? ¿Son personas o un sistema automático?",
    a: "Personas. Todos nuestros empleados tienen titulación oficial en seguros (requisito DGSFP para poder asesorar). Tendrás un corredor asignado con nombre y teléfono directo, no una centralita donde el operador cambia en cada llamada.",
  },
  {
    q: "Tengo un coche clásico, maquinaria agrícola, barco o mascota exótica. ¿Lo cubrís?",
    a: "Sí. Llevamos 35 años trabajando con ramos especializados que las aseguradoras directas suelen rechazar: vehículos clásicos, maquinaria agrícola, embarcaciones de recreo, reptiles, aves rapaces, bodegas, drones, eventos y otros nichos. Si existe una aseguradora en España que lo cubra, la encontramos.",
  },
  {
    q: "¿Qué pasa si tengo un siniestro?",
    a: "Llamas a tu corredor. Nosotros abrimos el parte, seguimos el expediente con la aseguradora, vigilamos plazos y peleamos la indemnización justa. No te dejamos solo con la burocracia.",
  },
  {
    q: "¿Cuánto tarda en llegarme la cotización?",
    a: "Para la mayoría de ramos, 24-48 horas laborables. Casos complejos (industria, náutica, riesgos especiales) pueden llevar 3-5 días porque consultamos a más aseguradoras.",
  },
  {
    q: "¿Puedo anular mi póliza actual y traerla a vosotros?",
    a: "Sí. Te ayudamos con la notificación a tu aseguradora actual (plazo mínimo 1 mes antes del vencimiento). Gestionamos toda la transición.",
  },
  {
    q: "¿Puedo cancelar la póliza que me gestionéis?",
    a: "Por supuesto. La póliza es tuya, nosotros solo la gestionamos. Puedes cancelarla al vencimiento anual o si cambia tu situación (venta, baja, etc.) según marque la ley.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  ramo: string;
  photoSlot?: string; // label del slot para foto real cuando Miguel la aporte
};

// Testimonios placeholder — reemplazar con reales de Miguel en Gate F2
export const testimonials: Testimonial[] = [
  {
    quote:
      "Tenía el Mustang '67 con una póliza que no me cubría el valor real. Segurgama me encontró una aseguradora especializada en clásicos. La prima bajó y la cobertura subió.",
    author: "[TBC]",
    role: "Coleccionista",
    ramo: "Coche clásico",
    photoSlot: "Foto cliente · 1:1",
  },
  {
    quote:
      "Tuve una fuga de agua un sábado por la noche. Llamé a mi corredora de Segurgama. El lunes tenía al perito. La indemnización cayó en 15 días. Nunca más voy directo.",
    author: "[TBC]",
    role: "Propietaria",
    ramo: "Hogar",
    photoSlot: "Foto cliente · 1:1",
  },
  {
    quote:
      "Abrimos un restaurante y ningún comparador sabía dármelo claro. Segurgama me montó multirriesgo + RC + pérdida de beneficios en tres días.",
    author: "[TBC]",
    role: "Hostelero",
    ramo: "Hostelería",
    photoSlot: "Foto cliente · 1:1",
  },
];

export type TrustStat = { value: string; label: string };

// Trust bar — datos a confirmar con Miguel en Gate F2
export const trustStats: TrustStat[] = [
  { value: "35+", label: "años de experiencia" },
  { value: "10.000+", label: "clientes en España [TBC]" },
  { value: "20+", label: "ramos especializados" },
  { value: "100%", label: "empleados titulados DGSFP" },
  { value: "5", label: "idiomas: ES · EN · CA · VAL · GL" },
];

// Aseguradoras colaboradoras — placeholders hasta que Miguel aporte logos reales
export const aseguradorasColaboradoras: string[] = [
  "MAPFRE",
  "Allianz",
  "AXA",
  "Mutua Madrileña",
  "Línea Directa",
  "Reale",
  "Generali",
  "Liberty Seguros",
  "Pelayo",
  "Zurich",
  "Catalana Occidente",
  "DKV",
];

export type PlanStep = {
  step: string;
  title: string;
  description: string;
};

export const planSteps: PlanStep[] = [
  {
    step: "01",
    title: "Cuéntanos qué quieres asegurar",
    description:
      "Elige ramo y rellena el formulario corto (2 minutos). Si es una cobertura específica o un ramo especializado, llámanos directamente.",
  },
  {
    step: "02",
    title: "Comparamos entre todas las aseguradoras",
    description:
      "Consultamos decenas de compañías con las que colaboramos. Te presentamos la mejor opción en 24h con la letra pequeña traducida.",
  },
  {
    step: "03",
    title: "Firmas y te acompañamos siempre",
    description:
      "Contratamos online o con tu corredor. Y cuando pase algo — siniestro, renovación, cambio — nos ocupamos nosotros.",
  },
];

export type Diferenciador = {
  title: string;
  body: string;
  icon: string; // lucide icon name
};

export const diferenciadores: Diferenciador[] = [
  {
    title: "Asesoramiento humano y titulado",
    body: "Todos nuestros empleados cuentan con titulación oficial en seguros (requisito DGSFP). No te atiende un sistema automático ni un operador distinto cada vez.",
    icon: "UserCheck",
  },
  {
    title: "Comparamos todo el mercado",
    body: "No vendemos una sola marca. Analizamos decenas de aseguradoras y elegimos la póliza con mejor cobertura al mejor precio para tu caso.",
    icon: "Scale",
  },
  {
    title: "Especialistas en ramos difíciles",
    body: "Vehículos clásicos, maquinaria agrícola, embarcaciones, RC deportiva, mascotas exóticas, maquinaria industrial. Coberturas específicas que las grandes aseguradoras suelen rechazar.",
    icon: "Sparkles",
  },
  {
    title: "Te acompañamos en el siniestro",
    body: "Tu corredor abre el parte, sigue el expediente, vigila plazos y pelea la indemnización contigo. No gestionas la burocracia en solitario.",
    icon: "ShieldCheck",
  },
];

export const empresa = {
  nombre: "Segurgama Correduría de Seguros S.L.",
  años: 35,
  dgsfpNumero: "J-XXXX", // [TBC con Miguel]
  telefono: "+34 91X XX XX XX", // [TBC con Miguel]
  email: "info@segurgama.es", // [TBC con Miguel]
  whatsapp: "+34 6XX XXX XXX", // [TBC con Miguel]
  direccion: {
    ciudad: "[TBC]",
    calle: "[TBC]",
    cp: "[TBC]",
  },
  idiomas: ["Español", "English", "Català", "Valencià", "Galego"],
};
