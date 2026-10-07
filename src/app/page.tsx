import { About } from "@/components/sections/about"
import { Capabilities } from "@/components/sections/capabilities"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { Framework } from "@/components/sections/framework"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Portfolio } from "@/components/sections/portfolio"
import { copy } from "@/content/es"

export default function Home() {
  return (
    <>
      <Header copy={copy.nav} />
      <main id="contenido-principal">
        <Hero copy={copy.hero} />
        <Capabilities copy={copy.capabilities} />
        <Framework copy={copy.framework} />
        <Portfolio copy={copy.portfolio} />
        <About copy={copy.about} />
        <Contact copy={copy.contact} />
      </main>
      <Footer copy={copy.footer} />
    </>
  )
}
