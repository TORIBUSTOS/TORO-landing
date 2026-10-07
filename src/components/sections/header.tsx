import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import type { Copy } from "@/content/es"

export function Header({ copy }: { copy: Copy["nav"] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="#inicio"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo />
          <span className="sr-only">{copy.logoLabel} — inicio</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {copy.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="sm"
          className="shrink-0"
          render={
            <Link href="#contacto">
              <span className="sm:hidden">{copy.ctaShort}</span>
              <span className="hidden sm:inline">{copy.cta}</span>
            </Link>
          }
        />
      </div>
    </header>
  )
}
