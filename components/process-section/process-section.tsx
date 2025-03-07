import { Timeline } from "@/components/process-section/timeline";
import Image from "next/image";
import React from "react";
import processData from "@/app/data/processData.json"; // Adjust path as needed

// Define the shape of the JSON data
interface ProcessContent {
  text: string[];
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

interface ProcessEntry {
  title: string;
  content: ProcessContent;
}

// Transform JSON data into TimelineEntry format
const timelineData = processData.timeline.map((entry: ProcessEntry) => ({
  title: entry.title,
  content: (
    <div>
      {entry.content.text.map((paragraph, index) => (
        <p
          key={index}
          className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm"
        >
          {paragraph}
        </p>
      ))}
      <div className="grid grid-cols-2 gap-4">
        {entry.content.images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-20 w-full md:h-44 lg:h-60"
          />
        ))}
      </div>
    </div>
  ),
}));

export function ProcessSection() {
  return (
    <section id="process" className="w-full bg-white/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center md:mb-1">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Our Process</h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            We follow a structured approach to turn your ideas into reality.
            Here's how we bring your digital vision to life:
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
