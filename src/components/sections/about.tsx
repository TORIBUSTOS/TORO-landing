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
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {copy.purpose}
          </p>
        </div>

        <div className="self-start rounded-xl border border-white/8 bg-card/60 p-5">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.directoryHeading}
          </span>
          <dl className="mt-4 flex flex-col gap-4">
            {copy.directory.map((entry) => (
              <div key={entry.name}>
                <dt className="text-base font-medium text-foreground">{entry.name}</dt>
                <dd className="mt-0.5 text-sm text-muted-foreground">{entry.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
