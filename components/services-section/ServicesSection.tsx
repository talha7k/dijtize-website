"use client"

import { ServiceCard } from "./ServiceCard"
import servicesData from "@/app/data/servicesData.json"
import type { ServicesData, ServiceCategory } from "@/app/data/types"

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-background/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="space-y-12">
          {Object.values(servicesData).map((category: ServiceCategory) => (
            <ServiceCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              subservices={category.subservices}
            />
          ))}
        </div>
      </div>
    </section>
  )
}