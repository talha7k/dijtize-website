"use client";
import React from "react";
import Image from "next/image";

export function DummyContent({ description, techStack }: { description: string; techStack: string[] }) {
  return (
    <div className="bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {description}
      </p>
      <div className="mt-6">
        <h3 className="text-white text-lg font-semibold mb-2">Tech Stack:</h3>
        <ul className="list-disc list-inside text-neutral-300 text-base md:text-lg">
          {techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      <Image
        src="https://assets.aceternity.com/macbook.png" // Replace with a relevant image or remove if not needed
        alt="Tech mockup from Dijitize"
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8"
      />
    </div>
  );
}