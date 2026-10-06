import { ImageResponse } from "next/og"

import { copy } from "@/content/es"

export const alt = "TORO — Arquitectura digital y agentes inteligentes"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: "80px 96px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(60% 50% at 15% 0%, rgba(227,163,62,0.16), transparent)",
        }}
      >
        <span
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#e3a33e",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          TORO
        </span>
        <span
          style={{
            fontSize: 52,
            lineHeight: 1.2,
            color: "#f5f5f3",
            fontWeight: 600,
            maxWidth: 920,
          }}
        >
          {copy.hero.heading}
        </span>
        <span
          style={{
            fontSize: 26,
            lineHeight: 1.4,
            color: "#b7b7b2",
            maxWidth: 820,
          }}
        >
          Arquitectura digital y agentes inteligentes para operaciones críticas.
        </span>
      </div>
    ),
    { ...size }
  )
}
