"use client";
import React, { useEffect, useRef, useState, createContext } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Import the existing Button component

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  autoScrollInterval?: number;
  enableAutoScroll?: boolean;
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
  autoScrollInterval = 3000,
  enableAutoScroll = true,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(enableAutoScroll);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setIsAutoScrolling(false);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setIsAutoScrolling(false);
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // Card width from PortfolioCard
      const gap = isMobile() ? 4 : 8; // Gap from carousel styling
      const scrollPosition = (cardWidth + gap) * index; // Fixed calculation
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setIsAutoScrolling(false);
    }
  };

  const isMobile = () => window.innerWidth < 768;

  useEffect(() => {
    let autoScrollTimer: NodeJS.Timeout;

    if (isAutoScrolling && enableAutoScroll) {
      autoScrollTimer = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth) {
            carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }
        }
      }, autoScrollInterval);
    }

    return () => clearInterval(autoScrollTimer);
  }, [isAutoScrolling, enableAutoScroll, autoScrollInterval]);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-2 [scrollbar-width:none] md:py-3"
          ref={carouselRef}
          onScroll={checkScrollability}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(enableAutoScroll)}
        >
          <div className="mx-auto flex flex-row justify-start gap-4 px-4">
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
        <div className="mr-10 mt-5 flex justify-end gap-4">
          <Button
            variant="outline" // Use outline for a subtle border effect, similar to your ring-2
            size="lg" // Use lg for a larger size, approximating "xl" (h-11 px-8)
            onClick={scrollLeft}
            className="h-8 w-8 rounded-lg"
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollRight}
            className="h-8 w-8 rounded-lg"
            disabled={!canScrollRight}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};
