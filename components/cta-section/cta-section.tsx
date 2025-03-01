"use client";

import { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { ContactForm } from "./contact-form";
import { motion, AnimatePresence } from "framer-motion";

export function CTASection() {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-background/90"
    >
      <Spotlight className="hidden sm:block" fill="primary" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="cta-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gray-100 leading-tight">
                      Ready to transform your{" "}
                      <span className="text-primary">idea</span> into{" "}
                      <span className="text-primary">digital reality</span>?
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 mb-8 max-w-3xl leading-relaxed">
                      Join the innovative companies that trust Dijitize to deliver cutting-edge digital solutions.
                    </p>
                    <button
                      onClick={() => {
                        console.log("Button clicked, setting showForm to true");
                        setShowForm(true);
                      }}
                      className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-black font-medium text-lg transition-all shadow-lg"
                    >
                      Schedule Consultation
                    </button>
                  </>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactForm onClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}