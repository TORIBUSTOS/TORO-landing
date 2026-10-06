/**
 * Configuración de sitio que depende de datos todavía no definidos
 * (ver issue OPS-89 — "Datos de contacto"). Mientras no lleguen, estas
 * constantes quedan vacías y los componentes deben ocultar el elemento
 * asociado en lugar de renderizar un link roto.
 */

export const siteConfig = {
  name: "TORO",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toro-landing.vercel.app",
  locale: "es" as const,
  location: "Córdoba, Argentina",
  /** Pendiente de dato — ver spec del issue. Vacío = no se renderiza el ícono. */
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
}
