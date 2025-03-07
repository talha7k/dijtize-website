"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CarouselContext } from "./PortfolioCarousel";
import { BlurImage } from "./BlurImage";
import { PortfolioModal } from "./PortfolioModal";
import type { Subservice } from "@/app/data/types";

interface CardProps {
  card: {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
  };
  index: number;
  layout?: boolean;
  service: Subservice | null;
}

export const PortfolioCard = ({
  card,
  index,
  layout = false,
  service,
}: CardProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <PortfolioModal isOpen={open} onClose={handleClose} service={service} />
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-60 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 transition-transform duration-300 hover:scale-95 dark:bg-neutral-900 md:h-[21rem] md:w-96"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="gray-100 text-shadow text-left font-sans text-sm font-medium md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="gray-100 text-shadow mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};
