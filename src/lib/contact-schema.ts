import { z } from "zod"

/**
 * Esquema compartido entre validación client-side (react-hook-form) y
 * server-side (Server Action), para que ambos lados nunca diverjan.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre completo.").max(120),
  company: z.string().trim().min(1, "Ingresá el nombre de tu empresa.").max(160),
  email: z.string().trim().email("Ingresá un email válido.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poco más (mínimo 10 caracteres).")
    .max(4000),
  // Honeypot anti-spam: debe llegar vacío. Lo completa un bot, no una persona.
  company_website: z.string().max(0).optional().or(z.literal("")),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactActionState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<keyof ContactInput, string>>
}

export const initialContactActionState: ContactActionState = {
  status: "idle",
}
