"use client"

import { Code, Sparkles, Cpu, Layers, Lightbulb } from "lucide-react"
export function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies",
      icon: <Code className="h-6 w-6 dark:text-white"/>,
    },
    {
      title: "UI/UX Design",
      description: "Intuitive, user-centered designs that deliver exceptional experiences",
      icon: <Layers className="h-6 w-6 dark:text-white" />,
    },
    {
      title: "AI Solutions",
      description: "Custom AI integrations to power your business intelligence",
      icon: <Cpu className="h-6 w-6 dark:text-white" />,
    },
    {
      title: "Digital Innovation",
      description: "Transforming your ideas into cutting-edge digital products",
      icon: <Lightbulb className="h-6 w-6 dark:text-white" />,
    },
    {
      title: "Digital Transformation",
      description: "Comprehensive strategies to evolve your digital presence",
      icon: <Sparkles className="h-6 w-6 dark:text-white"/>,
    },
  ]

  return (
    <section id="services" className="w-full py-20 bg-neutral-50 dark:bg-neutral-900">
    
    </section>
  )
}

