import Link from "next/link"
import { ArrowUpRight, Link2 } from "lucide-react"

import { Logo } from "@/components/logo"
import type { Copy } from "@/content/es"
import { siteConfig } from "@/lib/site-config"

export function Footer({ copy }: { copy: Copy["footer"] }) {
  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">{copy.tagline}</p>
          <Link
            href={siteConfig.foundationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {copy.foundationLinkLabel}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{siteConfig.location}</span>
            {siteConfig.linkedinUrl ? (
              <Link
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn de TORO"
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Link2 aria-hidden="true" className="size-4" />
              </Link>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {copy.rights(new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  )
}
