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
    <section className="py-20 bg-background/10" id="portfolio">
      <h2 className="text-3xl font-bold text-center mb-10">Our Portfolio</h2>
      <Carousel
        items={portfolioItems}
        enableAutoScroll={true}
        autoScrollInterval={5000}
      />
    </section>
  );
}