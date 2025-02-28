"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { IconCode, IconApps, IconX } from "@tabler/icons-react"; // Using generic tech icons for web and mobile
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CarouselContext } from "./Carousel";

interface Service {
  category: string;
  title: string;
  description: string;
  techStack: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
  layout?: boolean;
}

export const ServiceCard = ({ service, index, layout = false }: ServiceCardProps) => {
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

  // Choose icon based on category
  const getIcon = () => {
    switch (service.category) {
      case "Web Development":
        return <IconCode className="h-8 w-8 text-cyan-400" />;
      case "Mobile Apps":
        return <IconApps className="h-8 w-8 text-cyan-400" />;
      default:
        return <IconCode className="h-8 w-8 text-cyan-400" />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 mx-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              ref={containerRef}
              className="max-w-5xl mx-auto bg-neutral-900 h-fit z-[60] my-10 p-6 md:p-10 rounded-3xl font-sans relative overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <button
                className="sticky top-0 h-8 w-8 right-0 ml-auto bg-transparent hover:bg-neutral-800 rounded-full flex items-center justify-center text-white transition-colors"
                onClick={handleClose}
                aria-label="Close service details"
              >
                <IconX className="h-6 w-6" />
              </button>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.category}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">Tech Stack:</h4>
                  <ul className="list-disc list-inside text-neutral-200">
                    {service.techStack.map((tech, idx) => (
                      <li key={idx} className="text-base">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg transition-all shadow-lg hover:shadow-primary/50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${service.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-neutral-900 dark:bg-neutral-900 h-40 w-56 md:h-[25rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
        whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.9)" }} // Cyan shadow on hover
      >
        <div className="relative z-40 p-8 flex flex-col h-full justify-between">
          {getIcon()}
          <div>
            <motion.p
              layoutId={layout ? `category-${service.category}` : undefined}
              className="text-white text-sm md:text-base font-medium font-sans text-left mb-2"
            >
              {service.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${service.title}` : undefined}
              className="text-white text-xl md:text-2xl font-semibold text-left [text-wrap:balance] font-sans"
            >
              {service.title}
            </motion.p>
            <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>
      </motion.button>
    </>
  );
};