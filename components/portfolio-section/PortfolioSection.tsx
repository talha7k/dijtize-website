"use client";
import React from "react";
import { Carousel } from "./PortfolioCarousel";
import { PortfolioCard } from "./PortfolioCard";
import portfolio from "@/app/data/portfolioData.json";

export function PortfolioSection() {
  // Map portfolio data to PortfolioCard components
  const portfolioItems = portfolio.portfolio.map((item, index) => (
    <PortfolioCard
      key={item.id}
      card={{
        src: item.image,
        title: item.title,
        category: item.category,
        content: item.content, // Included but not currently used in display
      }}
      index={index}
      service={{
        subservice: item.title, // Maps to modal title
        description: item.description, // Maps to modal description
        techStack: item.techStack, // Maps to modal tech stack
        image: item.image, // Maps to modal image
      }}
    />
  ));

  return (
    <section id="portfolio" className="bg-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-100 md:text-4xl">
            Sample Work
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            We take pride in crafting exceptional digital experiences.
          </p>
        </div>
      </div>

      <Carousel
        items={portfolioItems}
        enableAutoScroll={true}
        autoScrollInterval={5000}
      />
    </section>
  );
}
