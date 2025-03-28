import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section/ServicesSection"
import { ProcessSection } from "@/components/process-section/process-section"
import { PortfolioSection } from "@/components/portfolio-section/PortfolioSection"
import { TestimonialsSection } from "@/components/testimonial-section/testimonials-section"
import { CTASection } from "@/components/cta-section/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

