"use client"

import { servicesData } from "@/app/data/servicesData"
import { ServiceCard } from "./ServiceCard"

export function ServicesSection() {
  return (
    <section       id="services"
    className="py-16 bg-background/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gray-100 mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="space-y-12">
          <ServiceCard
            title={servicesData.mobileApps.title}
            icon={servicesData.mobileApps.icon}
            subservices={servicesData.mobileApps.subservices}
          />

          <ServiceCard
            title={servicesData.marketingVideo.title}
            icon={servicesData.marketingVideo.icon}
            subservices={servicesData.marketingVideo.subservices}
          />

          <ServiceCard
            title={servicesData.brandingCreativeDesign.title}
            icon={servicesData.brandingCreativeDesign.icon}
            subservices={servicesData.brandingCreativeDesign.subservices}
          />
        </div>
      </div>
    </section>
  )
}

