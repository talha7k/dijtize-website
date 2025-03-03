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
          className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8"
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
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        ))}
      </div>
    </div>
  ),
}));

export function ProcessSection() {
  return (
    <section id="process" className="w-full py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We follow a structured approach to turn your ideas into reality. Here's how we bring your digital vision to life:
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}