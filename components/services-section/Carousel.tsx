"use client";
import React, { useEffect, useRef, useState, createContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  autoScrollInterval?: number; // Time in milliseconds between scrolls
  enableAutoScroll?: boolean; // Toggle auto-scroll on/off
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  autoScrollInterval = 3000, // Default: 3 seconds
  enableAutoScroll = true, // Default: enabled
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(enableAutoScroll);

  // Initialize scroll position and check scrollability
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  // Check if scrolling is possible in either direction
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Scroll left manually
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setIsAutoScrolling(false); // Pause auto-scroll on manual interaction
    }
  };

  // Scroll right manually
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setIsAutoScrolling(false); // Pause auto-scroll on manual interaction
    }
  };

  // Handle card close (scroll to specific item)
  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setIsAutoScrolling(false); // Pause auto-scroll on card close
    }
  };

  const isMobile = () => window.innerWidth < 768;

  // Auto-scroll implementation with improved looping
  useEffect(() => {
    let autoScrollTimer: NodeJS.Timeout;

    if (isAutoScrolling && enableAutoScroll && items.length > 0) {
      autoScrollTimer = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          const cardWidth = isMobile() ? 230 : 384; // Width of each card
          const gap = isMobile() ? 4 : 8; // Gap between cards
          const totalCardWidth = items.length * cardWidth + (items.length - 1) * gap; // Total width of all cards + gaps

          if (scrollLeft + clientWidth >= totalCardWidth) {
            // Loop back to the start with a clean reset
            carouselRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          } else {
            // Scroll right by 300px (or adjust based on card width)
            carouselRef.current.scrollBy({
              left: 300,
              behavior: "smooth",
            });
          }
        }
      }, autoScrollInterval);
    }

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(autoScrollTimer);
  }, [isAutoScrolling, enableAutoScroll, autoScrollInterval, items.length]);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full px-8 overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
          onMouseEnter={() => setIsAutoScrolling(false)} // Pause on hover
          onMouseLeave={() => setIsAutoScrolling(enableAutoScroll)} // Resume on mouse leave
        >
          <div className="flex flex-row justify-start gap-4 pl-4 mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};