"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { submitContactForm } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Copy } from "@/content/es"
import { contactSchema, initialContactActionState } from "@/lib/contact-schema"

const clientSchema = contactSchema.omit({ company_website: true })
type ClientFormValues = z.infer<typeof clientSchema>

export function ContactForm({ copy }: { copy: Copy["contact"]["form"] }) {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState(initialContactActionState)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    mode: "onBlur",
  })

  const onValid = (data: ClientFormValues, event?: React.BaseSyntheticEvent) => {
    const formEl = event?.target as HTMLFormElement | undefined
    const honeypot = formEl ? new FormData(formEl).get("company_website") : ""

    const formData = new FormData()
    formData.set("name", data.name)
    formData.set("company", data.company)
    formData.set("email", data.email)
    formData.set("message", data.message)
    formData.set("company_website", String(honeypot ?? ""))

    startTransition(async () => {
      const result = await submitContactForm(initialContactActionState, formData)
      setState(result)

      if (result.status === "success") {
        reset()
        formEl?.reset()
      }

      if (result.status === "error" && result.fieldErrors) {
        for (const [field, fieldMessage] of Object.entries(result.fieldErrors)) {
          if (field === "company_website" || !fieldMessage) continue
          setError(field as keyof ClientFormValues, { message: fieldMessage })
        }
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">{copy.nameLabel}</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-sm text-destructive">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-company">{copy.companyLabel}</Label>
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder={copy.companyPlaceholder}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            {...register("company")}
          />
          {errors.company ? (
            <p id="contact-company-error" className="text-sm text-destructive">
              {errors.company.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">{copy.emailLabel}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">{copy.messageLabel}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot anti-spam — invisible y fuera del tab order para personas reales. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company-website">{copy.honeypotLabel}</label>
        <input
          id="contact-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="w-fit">
        {isPending ? copy.submitPendingLabel : copy.submitLabel}
      </Button>

      <div role="status" aria-live="polite" className="min-h-6">
        {state.status === "success" ? (
          <p className="text-sm font-medium text-emerald-400">
            {copy.successTitle} — {copy.successMessage}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-sm font-medium text-destructive">
            {state.message ?? copy.errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}
