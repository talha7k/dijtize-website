"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button"; // Import the existing Button component

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  delay = 3000,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  delay?: number;
}) => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Store the interval ID

  // Function to start or restart the interval
  const startInterval = () => {
    if (autoplay) {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval
      intervalRef.current = setInterval(handleNext, delay); // Start new interval
    }
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
    startInterval(); // Reset interval on click
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startInterval(); // Reset interval on click
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Set up initial interval and clean up on unmount
  useEffect(() => {
    startInterval(); // Start interval on mount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clean up on unmount
    };
  }, [autoplay, delay]); // Re-run if autoplay or delay changes

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold">{testimonials[active].name}</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-gray-500 text-gray-600 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word} 
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex justify-end gap-4 pt-12 md:pt-0">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              className="h-8 w-8 rounded-lg"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-8 w-8 rounded-lg"
              onClick={handleNext}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
