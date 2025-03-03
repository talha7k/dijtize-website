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

export const PortfolioCard = ({ card, index, layout = false, service }: CardProps) => {
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
        className="transition-transform duration-300 hover:scale-95 rounded-3xl bg-gray-100 dark:bg-neutral-900 h-40 w-56 md:h-[25rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8 ">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="gray-100 text-sm md:text-base font-medium font-sans text-left text-shadow"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="gray-100 text-xl md:text-3xl font-semibold max-w-xs text-left text-shadow [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0 "
        />
      </motion.button>
    </>
  );
};