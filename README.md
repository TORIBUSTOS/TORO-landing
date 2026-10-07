## TORO — Landing institucional (v1)

Landing de una sola página, formato portfolio comercial para TORO. Next.js
(App Router) + TypeScript estricto + Tailwind CSS v4 + shadcn/ui, estética
dark-tech sobre fondo obsidiana.

Esta landing **convive** con `https://toro.toroverse.tech/` (la *public
foundation*, institucional/técnica): esta es la puerta de entrada comercial
(posicionamiento, capacidades, portfolio, conversión a llamada
exploratoria), no un reemplazo. Nombre, tagline, statement institucional,
propósito, framework operativo y dirección vienen literales del canon de esa
fuente; capacidades y portfolio son copy propio de esta landing (Rodrigo).
Cada sitio es `canonical` de sí mismo — no hay canonical cruzado entre
dominios.

### Cómo correr el proyecto

Requiere Node.js 20.9+ y pnpm.

```bash
pnpm install
cp .env.example .env.local   # completar según corresponda, ver abajo
pnpm dev                     # http://localhost:3000
```

Otros scripts:

```bash
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm build       # build de producción (Turbopack)
```

### Estructura de carpetas

```
src/
  app/
    actions/contact.ts   # Server Action del formulario de contacto
    layout.tsx            # fonts, metadata, Analytics/SpeedInsights, lang="es"
    page.tsx               # ensambla las secciones de la landing
    globals.css            # design tokens (paleta + tipografía) de Tailwind v4
    sitemap.ts / robots.ts
    opengraph-image.tsx    # imagen OG generada en build
  components/
    sections/               # Header, Hero, Capabilities, Framework, Portfolio,
                             # About, Contact, Footer — una sección por archivo
    mockups/                 # placeholders visuales de los 3 casos de portfolio
    ui/                       # componentes shadcn/ui (button, card, input, ...)
    logo.tsx                  # wordmark placeholder de TORO
  content/
    es.ts                     # TODO el copy de la landing (español, v1)
  lib/
    site-config.ts             # config de sitio y contacto (URL, tagline, LinkedIn, foundation)
    contact-schema.ts         # esquema zod compartido cliente/servidor
```

### Módulos de copy (i18n-ready)

Todo el texto vive en `src/content/es.ts`, tipado con `Copy`. Los componentes
nunca usan strings sueltos: reciben la sección de copy que les corresponde
como prop. Para la v2 con `next-intl` (es/en), el plan es:

1. Crear `src/content/en.ts` implementando el mismo tipo `Copy`.
2. Resolver qué archivo importar según el locale activo (p. ej. un helper
   `getCopy(locale)` en lugar del `import { copy } from "@/content/es"` actual).
3. Ningún componente de `src/components` necesita cambios.

El tagline institucional (`"Building intelligence. Creating impact."`) tiene
una discrepancia sin resolver con el header de `toro.toroverse.tech`
(`"Intelligence into operation"`). Vive como constante aislada en
`src/lib/site-config.ts` (`siteConfig.tagline`) para cambiarla en un solo
lugar cuando Rodrigo defina cuál queda.

### Reemplazar el logo

El wordmark placeholder vive en `src/components/logo.tsx`. Cuando llegue el
SVG final, reemplazar el contenido de ese componente (mismo nombre de
export) — nada más lo importa directamente salvo `Header` y `Footer`.

### Reemplazar los mockups del portfolio

Los 3 casos (`TORO Finance Engine`, `MINOS Analítica`, `Argos Intelligence`)
usan composiciones propias en CSS/SVG como placeholder visual, aisladas en
`src/components/mockups/`:

- `finance-engine-mockup.tsx`
- `minos-mockup.tsx`
- `argos-mockup.tsx`

Cada uno se usa desde `src/components/sections/portfolio.tsx`. Para
reemplazar por una captura real, cambiar ese componente por una `<img>` (o
`next/image`) con el screenshot correspondiente — el resto de la sección
(texto, layout de la card) no cambia.

### Datos de contacto — política

El único dato de contacto visible en la página es la ubicación ("Córdoba,
Argentina", en el footer). El sitio oficial (`toro.toroverse.tech`) excluye
a propósito email, teléfono, redes y dirección postal de sus endpoints
públicos (`source_policy`) — esta landing respeta la misma política:

- Todo dato de contacto vive centralizado en `src/lib/site-config.ts`.
- Si un dato no está confirmado (LinkedIn, teléfono, etc.), el valor queda
  vacío y el componente **no renderiza** el ícono, el link ni la fila
  asociada. Nunca se usa un placeholder falso (`info@toro.com`, un teléfono
  inventado, etc.) — en una web pública, un dato falso es peor que un hueco.
- El email de destino del formulario (`CONTACT_TO_EMAIL`) **no se muestra
  nunca como `mailto:` visible** ni se commitea con un valor real: es una
  casilla personal y el repo es público. Vive solo como variable de entorno,
  consumida server-side por la Server Action de contacto.

### Variables de entorno

Ver `.env.example`. Ninguna es obligatoria para que el build o el `pnpm dev`
funcionen:

| Variable | Uso | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | metadata, OG image, canonical, sitemap/robots | usa un valor de placeholder de Vercel |
| `NEXT_PUBLIC_LINKEDIN_URL` | ícono de LinkedIn en el footer | el ícono no se renderiza |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | entrega del formulario por email (Resend) | se intenta `CONTACT_WEBHOOK_URL` |
| `CONTACT_WEBHOOK_URL` | destino POST del formulario si no hay Resend configurado | se loguea server-side, el usuario igual ve éxito |

### Formulario de contacto

`src/components/sections/contact-form.tsx` valida en cliente con
`react-hook-form` + `zod` (mismo esquema que el servidor, en
`src/lib/contact-schema.ts`). El envío real ocurre en la Server Action
`src/app/actions/contact.ts`, que:

- revalida con el mismo esquema zod (defensa en profundidad),
- descarta silenciosamente envíos de bots (honeypot `company_website`),
- aplica un rate limit simple en memoria por IP,
- despacha con esta precedencia: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (vía
  Resend) → `CONTACT_WEBHOOK_URL` (POST JSON) → si no hay ninguna, loguea
  server-side y degrada a éxito sin exponer el detalle al usuario.

El rate limit es un `Map` en memoria del proceso: en **v1 ya es una
limitación real**, no solo a futuro — el target de deploy es Vercel, donde
cada invocación de la Server Action puede correr en una instancia
serverless distinta, así que el conteo no se comparte entre invocaciones de
forma confiable. Protege contra un bot repitiendo sobre la misma instancia
tibia, pero no es una defensa robusta contra spam. Si hace falta algo más
serio antes de v2, mover el conteo a un store compartido (Redis/Upstash).

`RESEND_API_KEY` está **pendiente** — crear la cuenta del proveedor es
decisión de Rodrigo. Hasta que la pase, el formulario funciona de punta a
punta (valida, responde, muestra éxito) pero no entrega el mensaje a nadie;
queda solo en los logs del server.

### Fuera de alcance de esta v1

Deploy real en Vercel / dominio / DNS (paso humano), `next-intl` /
versión en inglés, CMS, blog, autenticación y assets gráficos definitivos —
ver el issue OPS-89 para el detalle completo.
