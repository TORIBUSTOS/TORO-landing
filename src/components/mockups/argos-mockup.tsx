import { WindowChrome } from "@/components/mockups/window-chrome"

const events = [
  { time: "09:42", label: "Evento crítico filtrado", tone: "primary" },
  { time: "09:41", label: "Agente asignó prioridad", tone: "muted" },
  { time: "09:39", label: "Señal duplicada descartada", tone: "muted" },
  { time: "09:37", label: "Evento crítico filtrado", tone: "primary" },
  { time: "09:35", label: "Monitoreo en tiempo real activo", tone: "emerald" },
] as const

export function ArgosMockup({ label }: { label: string }) {
  return (
    <WindowChrome label={label} title="argos.toro.app · feed de eventos">
      <div className="flex flex-col gap-2">
        {events.map((event, index) => (
          <div
            key={`${event.time}-${index}`}
            className="flex items-center gap-3 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 text-xs"
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              {event.time}
            </span>
            <span
              className={
                event.tone === "primary"
                  ? "size-1.5 shrink-0 rounded-full bg-primary"
                  : event.tone === "emerald"
                    ? "size-1.5 shrink-0 rounded-full bg-emerald-400/80"
                    : "size-1.5 shrink-0 rounded-full bg-white/30"
              }
            />
            <span className="truncate text-foreground/80">{event.label}</span>
          </div>
        ))}
      </div>
    </WindowChrome>
  )
}
