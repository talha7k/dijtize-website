"use client";
import React from "react";
import { Carousel } from "./Carousel";
import { ServiceCard } from "./ServiceCard";
import servicesData from "@/app/data/services.json"; // Adjust the path as needed

export function ServicesSection() {
  // Split services into webDevelopment and mobileApps
  const webDevelopmentServices = servicesData.webDevelopment.map((item) => ({
    category: "Web Development",
    title: item.subservice,
    description: item.description,
    techStack: item.techStack,
  }));

  const mobileAppsServices = servicesData.mobileApps.map((item) => ({
    category: "Mobile Apps",
    title: item.subservice,
    description: item.description,
    techStack: item.techStack,
  }));

  // Map services to ServiceCard components for each carousel
  const webDevelopmentCards = webDevelopmentServices.map((service, index) => (
    <ServiceCard key={service.title} service={service} index={index} />
  ));

  const mobileAppsCards = mobileAppsServices.map((service, index) => (
    <ServiceCard key={service.title} service={service} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 ">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        {/* Web Development Box */}
        <div className="bg-neutral-900  py-10 bg-transparent/20 rounded-3xl p-6 shadow-lg hover:border-primary-500 transition-all duration-300 w-full">
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">Web Development</h3>
          <Carousel
            items={webDevelopmentCards}
            autoScrollInterval={5000}
            enableAutoScroll={true}
          />
        </div>

        {/* Mobile Apps Box */}
        <div className="bg-neutral-900  py-10 bg-transparent/20 rounded-3xl p-6 shadow-lg hover:border-primary-500 transition-all duration-300 w-full">
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">Mobile Apps</h3>
          <Carousel
            items={mobileAppsCards}
            autoScrollInterval={5000}
            enableAutoScroll={true}
          />
        </div>
      </div>
    </div>
  );
}