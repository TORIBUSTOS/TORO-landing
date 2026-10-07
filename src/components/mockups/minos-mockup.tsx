import { WindowChrome } from "@/components/mockups/window-chrome"

const linePoints = "0,38 15,30 30,34 45,18 60,24 75,8 90,14 100,4"
const areaPoints = `${linePoints} 100,50 0,50`

export function MinosMockup({ label }: { label: string }) {
  return (
    <WindowChrome label={label} title="minos.toro.app · activos en vivo">
      <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
        <div className="rounded-lg border border-white/8 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Señal consolidada
            </span>
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              +4.2%
            </span>
          </div>
          <svg viewBox="0 0 100 50" className="h-24 w-full" preserveAspectRatio="none">
            <polygon points={areaPoints} fill="var(--color-primary)" opacity="0.12" />
            <polyline
              points={linePoints}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-white/8 p-3">
          <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Alertas activas
          </span>
          {[
            { label: "Volatilidad", tone: "amber" },
            { label: "Liquidez", tone: "emerald" },
            { label: "Exposición", tone: "amber" },
          ].map((alert) => (
            <div
              key={alert.label}
              className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5 text-xs"
            >
              <span className="text-foreground/80">{alert.label}</span>
              <span
                className={
                  alert.tone === "emerald"
                    ? "size-1.5 rounded-full bg-emerald-400/80"
                    : "size-1.5 rounded-full bg-amber-400/80"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  )
}
