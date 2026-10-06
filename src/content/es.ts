/**
 * Módulo de copy — español (v1).
 *
 * Todo el contenido textual de la landing vive acá, desacoplado del markup,
 * para que una v2 con `next-intl` pueda agregar `en.ts` sin tocar componentes:
 * los componentes solo consumen la forma de `Copy`, nunca strings sueltos.
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

export type Copy = {
  meta: {
    title: string
    description: string
  }
  nav: {
    logoLabel: string
    links: { label: string; href: string }[]
    cta: string
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
    paragraphs: string[]
    pillars: { title: string; description: string }[]
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
    rights: (year: number) => string
  }
}

export const copy: Copy = {
  meta: {
    title: "TORO — Arquitectura digital y agentes inteligentes para operaciones críticas",
    description:
      "TORO es una firma de desarrollo tecnológico y arquitectura digital especializada en soluciones de software modular, analítica financiera y orquestación de agentes inteligentes para operaciones críticas.",
  },
  nav: {
    logoLabel: "TORO",
    links: [
      { label: "Capacidades", href: "#capacidades" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Sobre TORO", href: "#sobre-toro" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Hablemos de tu infraestructura",
  },
  hero: {
    eyebrow: "Arquitectura digital para operaciones críticas",
    heading: "Infraestructura de software que sostiene decisiones críticas",
    positioning:
      "TORO es una firma de desarrollo tecnológico y arquitectura digital especializada en soluciones de software modular, analítica financiera y orquestación de agentes inteligentes para operaciones críticas.",
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
    heading: "Ingeniería que se hace cargo de la operación",
    paragraphs: [
      "TORO es una firma de desarrollo tecnológico y arquitectura digital especializada en soluciones de software modular, analítica financiera y orquestación de agentes inteligentes para operaciones críticas.",
      "Trabajamos codo a codo con equipos de operaciones, finanzas y tecnología para transformar flujos manuales en sistemas modulares, auditables y preparados para escalar.",
    ],
    pillars: [
      {
        title: "Modularidad",
        description: "Sistemas desacoplados que evolucionan sin reescribirse.",
      },
      {
        title: "Trazabilidad",
        description: "Cada proceso crítico queda registrado y es auditable.",
      },
      {
        title: "Orquestación",
        description: "Agentes e integraciones que operan en tiempo real.",
      },
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
    tagline: "Arquitectura digital y agentes inteligentes para operaciones críticas.",
    rights: (year: number) => `© ${year} TORO. Todos los derechos reservados.`,
  },
}
