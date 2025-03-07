"use client";

import { useState } from "react";
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
      className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden bg-white/10 py-14"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative inset-0 flex flex-col items-center justify-center p-6 text-center md:p-8">
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
                    <h2 className="gray-100 mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                      Ready to transform your{" "}
                      <span className="text-primary">idea</span> into{" "}
                      <span className="text-primary">digital reality</span>?
                    </h2>
                    <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
                      Join the innovative companies that trust Dijitize to
                      deliver cutting-edge digital solutions.
                    </p>
                    <button
                      onClick={() => {
                        console.log("Button clicked, setting showForm to true");
                        setShowForm(true);
                      }}
                      className="rounded-xl bg-white px-8 py-3 text-lg font-medium text-black shadow-lg transition-all hover:bg-primary"
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
