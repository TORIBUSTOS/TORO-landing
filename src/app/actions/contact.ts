"use server"

import { headers } from "next/headers"

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

async function dispatchContactMessage(input: Omit<ContactInput, "company_website">) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  const toEmail = process.env.CONTACT_TO_EMAIL

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

  if (toEmail) {
    // El destino real todavía no define un proveedor de email (ver README).
    // Se deja registrado en los logs del server para no perder el lead
    // mientras se conecta un proveedor (p. ej. Resend) detrás de esta misma
    // variable de entorno.
    console.info(
      `[contact] CONTACT_TO_EMAIL configurado (${toEmail}) sin proveedor de email conectado. Lead recibido:`,
      input
    )
    return
  }

  console.warn(
    "[contact] Ni CONTACT_WEBHOOK_URL ni CONTACT_TO_EMAIL están configuradas. Lead no despachado a ningún destino externo:",
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
