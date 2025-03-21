"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlurImage } from "./BlurImage";

interface CardProps {
  card: {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
  };
  index: number;
  layout?: boolean;
  onOpen: () => void;
}

export const PortfolioCard = ({
  card,
  index,
  layout = false,
  onOpen,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 flex h-64 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 transition-transform duration-300 hover:scale-95 dark:bg-neutral-900 md:h-[21rem] md:w-96"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 p-8">
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="text-shadow text-left font-sans text-sm font-medium text-gray-100 md:text-base"
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="text-shadow mt-2 max-w-xs text-left font-sans text-xl font-semibold text-gray-100 [text-wrap:balance] md:text-3xl"
        >
          {card.title}
        </motion.p>
      </div>
      <div className="absolute inset-0 z-10 overflow-hidden">
        <BlurImage
          src={card.src || "/placeholder.svg"}
          alt={card.title}
          className="object-cover"
        />
      </div>
    </motion.button>
  );
};
