import type { ReactNode } from "react"

/**
 * Chrome de ventana reutilizado por los 3 mockups del portfolio. Es
 * decorativo: el texto informativo real vive en la copy de cada caso,
 * `label` solo describe la ilustración para lectores de pantalla.
 */
export function WindowChrome({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
    >
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-3 py-2">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate text-[11px] font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
