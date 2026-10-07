"use server"

import { headers } from "next/headers"
import { Resend } from "resend"

import {
  contactSchema,
  type ContactActionState,
  type ContactInput,
} from "@/lib/contact-schema"

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 3

// Rate limit en memoria del proceso: suficiente para v1 de un solo formulario
// de bajo tráfico. Si el runtime escala a múltiples instancias, mover a un
// store compartido (Redis/Upstash) antes de v2.
const submissionsByIp = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )
  recent.push(now)
  submissionsByIp.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX_REQUESTS
}

/**
 * Orden de precedencia (ver issue OPS-89 — "Entrega del formulario"), para
 * que el build y el deploy nunca dependan de que exista una credencial:
 *
 * 1. `RESEND_API_KEY` + `CONTACT_TO_EMAIL` → envía por Resend.
 * 2. `CONTACT_WEBHOOK_URL` → POST del payload a ese webhook.
 * 3. Ninguna configurada → loguea server-side y degrada a éxito sin
 *    exponer el detalle al usuario.
 */
async function dispatchContactMessage(input: Omit<ContactInput, "company_website">) {
  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL

  if (resendApiKey && toEmail) {
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: "TORO Landing <onboarding@resend.dev>",
      to: toEmail,
      replyTo: input.email,
      subject: `Nuevo contacto — ${input.company}`,
      text: `Nombre: ${input.name}\nEmpresa: ${input.company}\nEmail: ${input.email}\n\n${input.message}`,
    })
    if (error) {
      throw new Error(`Resend respondió con error: ${error.message}`)
    }
    return
  }

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: "toro-landing" }),
    })
    if (!response.ok) {
      throw new Error(`El webhook de contacto respondió ${response.status}`)
    }
    return
  }

  // Ninguna credencial configurada todavía (RESEND_API_KEY pendiente de
  // Rodrigo — ver README). El formulario sigue funcionando de punta a
  // punta para quien lo completa; el lead queda solo en los logs.
  console.warn(
    "[contact] Ninguna variable de entrega configurada (RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_WEBHOOK_URL). Lead no despachado a ningún destino externo:",
    input
  )
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company_website: String(formData.get("company_website") ?? ""),
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: NonNullable<ContactActionState["fieldErrors"]> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof raw
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return {
      status: "error",
      message: "Revisá los campos marcados.",
      fieldErrors,
    }
  }

  // Honeypot: si un bot completó este campo oculto, respondemos éxito sin
  // enviar nada a ningún destino ni revelar que fue detectado.
  if (parsed.data.company_website) {
    return { status: "success" }
  }

  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Demasiados intentos. Esperá unos minutos y volvé a intentar.",
    }
  }

  try {
    await dispatchContactMessage({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      message: parsed.data.message,
    })
    return { status: "success" }
  } catch (error) {
    console.error("[contact] error enviando mensaje", error)
    return {
      status: "error",
      message: "No pudimos enviar tu mensaje. Intentá nuevamente.",
    }
  }
}
