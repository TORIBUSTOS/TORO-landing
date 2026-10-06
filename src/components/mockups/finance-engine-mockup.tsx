import { WindowChrome } from "@/components/mockups/window-chrome"

const rows = [
  { bank: "Banco 01", amount: "$ 1.284.500", status: "ok" },
  { bank: "Banco 02", amount: "$ 842.900", status: "ok" },
  { bank: "Banco 03", amount: "$ 231.120", status: "pending" },
  { bank: "Banco 04", amount: "$ 1.903.400", status: "ok" },
] as const

const bars = [62, 88, 40, 95, 71]

export function FinanceEngineMockup({ label }: { label: string }) {
  return (
    <WindowChrome label={label} title="conciliacion.toro.app">
      <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-white/8">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-white/8 bg-white/[0.02] px-3 py-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            <span>Cuenta</span>
            <span>Monto</span>
            <span>Estado</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.bank}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-white/5 px-3 py-2 text-xs last:border-b-0"
            >
              <span className="text-foreground/90">{row.bank}</span>
              <span className="font-mono text-foreground/70">{row.amount}</span>
              <span
                className={
                  row.status === "ok"
                    ? "inline-flex size-2 rounded-full bg-emerald-400/80 justify-self-end"
                    : "inline-flex size-2 rounded-full bg-amber-400/80 justify-self-end"
                }
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-lg border border-white/8 p-3">
          <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Trazabilidad mensual
          </span>
          <div className="flex h-20 items-end gap-1.5">
            {bars.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className="w-full rounded-t-sm bg-primary/70"
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            Cierre al 100% de trazabilidad
          </span>
        </div>
      </div>
    </WindowChrome>
  )
}
