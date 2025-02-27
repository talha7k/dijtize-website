"use client"

import { CardHoverEffect } from "@/components/ui/card-hover-effect"
import { Code, Sparkles, Cpu, Layers, Lightbulb } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies",
      icon: <Code className="size-8 text-primary-500" />,
    },
    {
      title: "UI/UX Design",
      description: "Intuitive, user-centered designs that deliver exceptional experiences",
      icon: <Layers className="size-8 text-primary-500" />,
    },
    {
      title: "AI Solutions",
      description: "Custom AI integrations to power your business intelligence",
      icon: <Cpu className="size-8 text-primary-500" />,
    },
    {
      title: "Digital Innovation",
      description: "Transforming your ideas into cutting-edge digital products",
      icon: <Lightbulb className="size-8 text-primary-500" />,
    },
    {
      title: "Digital Transformation",
      description: "Comprehensive strategies to evolve your digital presence",
      icon: <Sparkles className="size-8 text-primary-500" />,
    },
  ]

  return (
    <section id="services" className="w-full py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We transform your ideas into digital reality with our comprehensive range of services
          </p>
        </div>

        <CardHoverEffect
          items={services.map((service) => ({
            title: service.title,
            description: service.description,
            icon: service.icon,
          }))}
          className="max-w-5xl mx-auto"
        />
      </div>
    </section>
  )
}

