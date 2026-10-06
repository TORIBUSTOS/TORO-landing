/**
 * Módulo de copy — español (v1).
 *
 * Todo el contenido textual de la landing vive acá, desacoplado del markup,
 * para que una v2 con `next-intl` pueda agregar `en.ts` sin tocar componentes:
 * los componentes solo consumen la forma de `Copy`, nunca strings sueltos.
 *
 * Dos fuentes de copy conviven a propósito, sin mezclarse en una misma
 * sección (ver issue OPS-89):
 * - Canon de marca de `toro.toroverse.tech` (statement, propósito,
 *   framework, dirección) — texto literal, no reescribir.
 * - Copy comercial de Rodrigo para esta landing (capacidades, portfolio) —
 *   redacción propia de la landing, ya aprobada.
 */

export type CapabilityItem = {
  title: string
  description: string
}

export type PortfolioCase = {
  id: "finance-engine" | "minos" | "argos"
  name: string
  vertical: string
  description: string
  result: string
}

export type FrameworkStep = {
  number: string
  title: string
  description: string
}

export type DirectoryEntry = {
  name: string
  role: string
}

export type Copy = {
  meta: {
    title: string
    description: string
  }
  nav: {
    logoLabel: string
    links: { label: string; href: string }[]
    cta: string
    /** Versión corta del CTA para el header en pantallas angostas (<640px). */
    ctaShort: string
  }
  hero: {
    eyebrow: string
    heading: string
    positioning: string
    ctaPrimary: string
    ctaSecondary: string
  }
  capabilities: {
    eyebrow: string
    heading: string
    items: CapabilityItem[]
  }
  framework: {
    eyebrow: string
    heading: string
    subheading: string
    steps: FrameworkStep[]
    foundationLinkLabel: string
  }
  portfolio: {
    eyebrow: string
    heading: string
    subheading: string
    cases: PortfolioCase[]
    disclaimer: string
  }
  about: {
    eyebrow: string
    heading: string
    purpose: string
    directoryHeading: string
    directory: DirectoryEntry[]
  }
  contact: {
    eyebrow: string
    heading: string
    subheading: string
    location: string
    form: {
      nameLabel: string
      namePlaceholder: string
      companyLabel: string
      companyPlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submitLabel: string
      submitPendingLabel: string
      successTitle: string
      successMessage: string
      errorTitle: string
      errorMessage: string
      honeypotLabel: string
    }
  }
  footer: {
    tagline: string
    foundationLinkLabel: string
    rights: (year: number) => string
  }
}

export const copy: Copy = {
  meta: {
    title: "TORO — Building intelligence. Creating impact.",
    description:
      "TORO integra estrategia, productos, sistemas e inteligencia artificial para convertir complejidad en decisiones, ejecución y aprendizaje trazables.",
  },
  nav: {
    logoLabel: "TORO",
    links: [
      { label: "Capacidades", href: "#capacidades" },
      { label: "Framework", href: "#framework" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Sobre TORO", href: "#sobre-toro" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Hablemos de tu infraestructura",
    ctaShort: "Contacto",
  },
  hero: {
    // Tagline CANONICAL de organization.json — ver src/lib/site-config.ts.
    eyebrow: "Building intelligence. Creating impact.",
    // Statement institucional literal (canon de marca, no redactar propio).
    heading:
      "TORO integra estrategia, productos, sistemas e inteligencia artificial para convertir complejidad en decisiones, ejecución y aprendizaje trazables.",
    // Propósito literal (canon de marca).
    positioning:
      "Construir y operar sistemas útiles que aumenten claridad, control, capacidad de ejecución y continuidad.",
    ctaPrimary: "Hablemos de tu infraestructura",
    ctaSecondary: "Ver portfolio",
  },
  capabilities: {
    eyebrow: "Capacidades",
    heading: "Cuatro frentes, un mismo estándar de ingeniería",
    items: [
      {
        title: "Arquitectura de Software y Sistemas Modulares",
        description:
          "Plataformas a medida, desacopladas, escalables y orientadas a alta disponibilidad.",
      },
      {
        title: "Fintech e Inteligencia de Capital",
        description:
          "Módulos de conciliación, dashboards analíticos y herramientas de control financiero y tesorería.",
      },
      {
        title: "Automatización y Agentes Autónomos",
        description:
          "Flujos de trabajo orquestados con IA para tareas operativas repetitivas y monitoreo en tiempo real.",
      },
      {
        title: "Optimización de Procesos Operativos",
        description:
          "Integración de herramientas de gestión interna y migración de flujos manuales a entornos digitales centralizados.",
      },
    ],
  },
  framework: {
    eyebrow: "Framework operativo",
    heading: "Cómo operamos",
    subheading:
      "Cinco pasos, el mismo orden en cada sistema que construimos u operamos.",
    // Pasos y descripciones literales del canon (CANONICAL en origen),
    // ya condensados a una línea por paso — el detalle extendido vive en
    // la public foundation.
    steps: [
      {
        number: "01",
        title: "Observar",
        description: "Leer el sistema real antes de proponer cambios.",
      },
      {
        number: "02",
        title: "Decidir",
        description: "Separar evidencia, supuestos y recomendación.",
      },
      {
        number: "03",
        title: "Ejecutar",
        description: "Avanzar con el movimiento más simple, útil y reversible.",
      },
      {
        number: "04",
        title: "Verificar",
        description: "Comprobar funcionamiento, riesgos y efecto operativo.",
      },
      {
        number: "05",
        title: "Documentar",
        description:
          "Dejar fuente, estado, decisión y continuidad para el siguiente agente.",
      },
    ],
    foundationLinkLabel: "Public foundation",
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "Casos insignia",
    subheading:
      "Tres sistemas construidos a medida para operaciones donde la precisión y la trazabilidad no son negociables.",
    cases: [
      {
        id: "finance-engine",
        name: "TORO Finance Engine",
        vertical: "Sector Salud / Corporativo",
        description:
          "Plataforma centralizada de conciliación multibancaria y reportería financiera automatizada.",
        result:
          "Reducción drástica de fricción operativa en cierres mensuales y trazabilidad de tesorería al 100%.",
      },
      {
        id: "minos",
        name: "MINOS Analítica",
        vertical: "Gestión Patrimonial / Trading",
        description:
          "Dashboard de análisis técnico y monitoreo de activos con alertas e ingesta de datos en tiempo real.",
        result:
          "Consolidación de señales operativas en un solo punto de control unificado.",
      },
      {
        id: "argos",
        name: "Argos Intelligence",
        vertical: "Operaciones Internas",
        description:
          "Motor de señalización y soporte a la toma de decisiones asistido por agentes.",
        result:
          "Aceleración en el filtrado de eventos críticos y tiempos de respuesta reducidos.",
      },
    ],
    disclaimer:
      "Interfaces ilustrativas — mockups propios generados para esta presentación, pendientes de reemplazo por capturas reales.",
  },
  about: {
    eyebrow: "Sobre TORO",
    heading: "Propósito",
    // Propósito literal (canon de marca).
    purpose:
      "Construir y operar sistemas útiles que aumenten claridad, control, capacidad de ejecución y continuidad.",
    directoryHeading: "Dirección",
    // Mención breve — el perfil extendido vive en la public foundation.
    directory: [
      { name: "Tori", role: "Fundador y Director Ejecutivo" },
      { name: "Rosario", role: "Chief Strategy, Systems & Execution" },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Hablemos de tu infraestructura",
    subheading:
      "Contanos en qué estás trabajando y te contactamos para coordinar una llamada exploratoria.",
    location: "Córdoba, Argentina",
    form: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre completo",
      companyLabel: "Empresa",
      companyPlaceholder: "Nombre de tu empresa",
      emailLabel: "Email",
      emailPlaceholder: "nombre@empresa.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Contanos sobre tu operación y qué estás buscando resolver.",
      submitLabel: "Enviar mensaje",
      submitPendingLabel: "Enviando…",
      successTitle: "Mensaje enviado",
      successMessage: "Gracias por escribirnos. Te vamos a contactar a la brevedad.",
      errorTitle: "No pudimos enviar tu mensaje",
      errorMessage: "Intentá nuevamente en unos minutos o escribinos por otro canal.",
      honeypotLabel: "Dejá este campo vacío",
    },
  },
  footer: {
    tagline: "Building intelligence. Creating impact.",
    foundationLinkLabel: "Public foundation",
    rights: (year: number) => `© ${year} TORO. Todos los derechos reservados.`,
  },
}
