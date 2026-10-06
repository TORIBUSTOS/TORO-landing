import type { Copy } from "@/content/es"

export function About({ copy }: { copy: Copy["about"] }) {
  return (
    <section
      id="sobre-toro"
      aria-labelledby="sobre-toro-heading"
      className="border-b border-white/8 px-6 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="max-w-xl">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </span>
          <h2
            id="sobre-toro-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {copy.heading}
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <dl className="grid gap-5 self-start sm:grid-cols-1">
          {copy.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-white/8 bg-card/60 p-5"
            >
              <dt className="text-sm font-medium text-foreground">{pillar.title}</dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">
                {pillar.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
