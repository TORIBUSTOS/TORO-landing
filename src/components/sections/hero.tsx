import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { Copy } from "@/content/es"

export function Hero({ copy }: { copy: Copy["hero"] }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-white/8 px-6 pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--color-primary),transparent_88%),transparent)]"
      />
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 text-left">
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {copy.eyebrow}
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {copy.heading}
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {copy.positioning}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href="#contacto">{copy.ctaPrimary}</Link>}
          />
          <Button
            variant="outline"
            size="lg"
            render={<Link href="#portfolio">{copy.ctaSecondary}</Link>}
          />
        </div>
      </div>
    </section>
  )
}
