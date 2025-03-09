"use client";

import { useState, useEffect, useRef } from "react";
import type { Subservice } from "@/app/data/types";
import { SubserviceCard } from "./SubserviceCard";
import { ServiceModal } from "./ServiceModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ServiceCarouselProps {
  subservices: Subservice[];
  autoScrollInterval?: number;
  enableAutoScroll?: boolean;
}

export function ServiceCarousel({
  subservices,
  autoScrollInterval = 4000,
  enableAutoScroll = true,
}: ServiceCarouselProps) {
  const [selectedService, setSelectedService] = useState<Subservice | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(enableAutoScroll);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (service: Subservice) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let autoScrollTimer: NodeJS.Timeout;

    if (isAutoScrolling && enableAutoScroll) {
      autoScrollTimer = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth) {
            carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }
        }
      }, autoScrollInterval);
    }

    return () => clearInterval(autoScrollTimer);
  }, [isAutoScrolling, enableAutoScroll, autoScrollInterval]);

  return (
    <div className="w-full py-6" ref={carouselRef}>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(enableAutoScroll)}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {subservices.map((service, index) => (
            <CarouselItem
              key={index}
              className="basis-full pl-4 md:basis-1/2 md:pl-6"
            >
              <div className="h-full">
                <SubserviceCard
                  subservice={service}
                  onClick={() => handleServiceClick(service)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
}
