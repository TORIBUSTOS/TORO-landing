## TORO — Landing institucional (v1)

Landing de una sola página, formato portfolio, para TORO (firma de desarrollo
tecnológico y arquitectura digital). Next.js (App Router) + TypeScript
estricto + Tailwind CSS v4 + shadcn/ui, estética dark-tech sobre fondo
obsidiana.

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
    sections/               # Header, Hero, Capabilities, Portfolio, About,
                             # Contact, Footer — una sección por archivo
    mockups/                 # placeholders visuales de los 3 casos de portfolio
    ui/                       # componentes shadcn/ui (button, card, input, ...)
    logo.tsx                  # wordmark placeholder de TORO
  content/
    es.ts                     # TODO el copy de la landing (español, v1)
    site.ts                   # constantes dependientes de env vars (URL, LinkedIn)
  lib/
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

### Variables de entorno

Ver `.env.example`. Ninguna es obligatoria para que el build o el `pnpm dev`
funcionen:

| Variable | Uso | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | metadata, OG image, sitemap/robots | usa un valor de placeholder de Vercel |
| `NEXT_PUBLIC_LINKEDIN_URL` | ícono de LinkedIn en el footer | el ícono no se renderiza |
| `CONTACT_WEBHOOK_URL` | destino POST del formulario de contacto | se intenta `CONTACT_TO_EMAIL`, si tampoco hay, solo se loguea server-side |
| `CONTACT_TO_EMAIL` | referencia de destino por email (sin proveedor conectado aún) | ídem — se loguea server-side |

### Formulario de contacto

`src/components/sections/contact-form.tsx` valida en cliente con
`react-hook-form` + `zod` (mismo esquema que el servidor, en
`src/lib/contact-schema.ts`). El envío real ocurre en la Server Action
`src/app/actions/contact.ts`, que:

- revalida con el mismo esquema zod (defensa en profundidad),
- descarta silenciosamente envíos de bots (honeypot `company_website`),
- aplica un rate limit simple en memoria por IP,
- despacha a `CONTACT_WEBHOOK_URL` si está configurada; si no, deja
  constancia en los logs del server (no hay proveedor de email conectado en
  v1 — ver tabla de env vars arriba).

### Fuera de alcance de esta v1

Deploy real en Vercel / dominio / DNS (paso humano), `next-intl` /
versión en inglés, CMS, blog, autenticación y assets gráficos definitivos —
ver el issue OPS-89 para el detalle completo.
