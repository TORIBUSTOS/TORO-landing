import type { ReactNode } from "react"

import { ArgosMockup } from "@/components/mockups/argos-mockup"
import { FinanceEngineMockup } from "@/components/mockups/finance-engine-mockup"
import { MinosMockup } from "@/components/mockups/minos-mockup"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Copy, PortfolioCase } from "@/content/es"

const mockupById: Record<PortfolioCase["id"], (label: string) => ReactNode> = {
  "finance-engine": (label) => <FinanceEngineMockup label={label} />,
  minos: (label) => <MinosMockup label={label} />,
  argos: (label) => <ArgosMockup label={label} />,
}

export function Portfolio({ copy }: { copy: Copy["portfolio"] }) {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="border-b border-white/8 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </span>
          <h2
            id="portfolio-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {copy.heading}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{copy.subheading}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {copy.cases.map((item) => (
            <Card
              key={item.id}
              className="border border-white/8 bg-card/60 ring-0 transition-colors hover:border-white/15"
            >
              <CardHeader className="px-5 pt-5">
                {mockupById[item.id](`Mockup ilustrativo del dashboard de ${item.name}`)}
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-5 pb-5">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {item.vertical}
                </span>
                <h3 className="text-lg font-medium text-foreground">{item.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {item.result}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{copy.disclaimer}</p>
      </div>
    </section>
  )
}
