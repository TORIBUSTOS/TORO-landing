import { cn } from "cn"

/**
 * Wordmark placeholder. Aislado a propósito: cuando llegue el SVG final del
 * logo, reemplazar el contenido de este componente sin tocar quien lo usa.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading text-lg font-semibold tracking-[0.2em] text-foreground uppercase",
        className
      )}
    >
      TORO
    </span>
  )
}
