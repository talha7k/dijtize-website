"use client"

import { useState } from "react"
import type { Subservice } from "@/app/data/servicesData"
import { SubserviceCard } from "./SubserviceCard"
import { ServiceModal } from "./ServiceModal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ServiceCarouselProps {
  subservices: Subservice[]
}

export function ServiceCarousel({ subservices }: ServiceCarouselProps) {
  const [selectedService, setSelectedService] = useState<Subservice | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleServiceClick = (service: Subservice) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="w-full py-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {subservices.map((service, index) => (
            <CarouselItem key={index} className="pl-4 md:pl-6 basis-full md:basis-1/2">
              <div className="h-full">
                <SubserviceCard subservice={service} onClick={() => handleServiceClick(service)} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6 gap-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>

      <ServiceModal isOpen={isModalOpen} onClose={handleCloseModal} service={selectedService} />
    </div>
  )
}

