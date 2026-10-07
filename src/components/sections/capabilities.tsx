import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Copy } from "@/content/es"

export function Capabilities({ copy }: { copy: Copy["capabilities"] }) {
  return (
    <section
      id="capacidades"
      aria-labelledby="capacidades-heading"
      className="border-b border-white/8 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </span>
          <h2
            id="capacidades-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {copy.heading}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {copy.items.map((item) => (
            <Card
              key={item.title}
              className="border border-white/8 bg-card/60 ring-0 transition-colors hover:border-white/15"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
