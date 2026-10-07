/**
 * Módulo único de configuración de sitio y contacto (ver issue OPS-89).
 *
 * Todo dato de contacto vive acá, nunca hardcodeado en un componente. Los
 * valores sin fuente confirmada quedan vacíos a propósito — los componentes
 * deben ocultar el elemento asociado (ícono, link, fila) en lugar de
 * renderizar un dato inventado. La `source_policy` de `toro.toroverse.tech`
 * excluye email/teléfono/redes de sus endpoints públicos: no rellenar esos
 * huecos con datos de relleno tipo `info@toro.com`.
 */

export const siteConfig = {
  name: "TORO",
  /**
   * `organization.json` (CANONICAL) dice "Building intelligence. Creating
   * impact."; el header de toro.toroverse.tech muestra "Intelligence into
   * operation". Discrepancia sin resolver — Rodrigo define cuál queda.
   * Usamos la marcada CANONICAL hasta entonces. Constante aislada a
   * propósito para cambiarla en un solo lugar.
   */
  tagline: "Building intelligence. Creating impact.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toro-landing.vercel.app",
  /** Public foundation — institucional/técnica. Esta landing es la puerta comercial; conviven. */
  foundationUrl: "https://toro.toroverse.tech/",
  locale: "es" as const,
  location: "Córdoba, Argentina",
  /** Pendiente de dato. Vacío = no se renderiza el ícono ni el link. */
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
}
