import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { Copy } from "@/content/es"
import { siteConfig } from "@/lib/site-config"

export function Framework({ copy }: { copy: Copy["framework"] }) {
  return (
    <section
      id="framework"
      aria-labelledby="framework-heading"
      className="border-b border-white/8 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {copy.eyebrow}
            </span>
            <h2
              id="framework-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {copy.heading}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">{copy.subheading}</p>
          </div>

          <Link
            href={siteConfig.foundationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {copy.foundationLinkLabel}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {copy.steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col gap-3 rounded-xl border border-white/8 bg-card/60 p-5"
            >
              <span className="font-mono text-sm text-primary">{step.number}</span>
              <span className="text-base font-medium text-foreground">{step.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
