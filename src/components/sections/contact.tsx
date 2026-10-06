import { MapPin } from "lucide-react"

import { ContactForm } from "@/components/sections/contact-form"
import type { Copy } from "@/content/es"

export function Contact({ copy }: { copy: Copy["contact"] }) {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="border-b border-white/8 px-6 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="max-w-md">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </span>
          <h2
            id="contacto-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {copy.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {copy.subheading}
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="size-4" />
            <span>{copy.location}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-card/60 p-6 sm:p-8">
          <ContactForm copy={copy.form} />
        </div>
      </div>
    </section>
  )
}
