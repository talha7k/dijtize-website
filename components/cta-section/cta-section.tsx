"use client";

import { useState } from "react";
import { ContactForm } from "./contact-form";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
      <div className="container relative z-10 mx-auto px-2">
        <div className="mx-auto w-full">
          <div className="relative inset-0 flex flex-col items-center justify-center p-2 text-center md:p-8">
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
                    <div className="mb-8 text-center md:mb-12">
                      <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-100 md:text-4xl lg:text-5xl">
                        Ready to transform your{" "}
                        <span className="text-primary">idea</span> into{" "}
                        <span className="text-primary">digital reality</span>?
                      </h2>

                      <p className="mb-6 text-lg text-gray-400 md:mb-8 md:text-xl">
                        Join the innovative companies that trust Dijitize to
                        deliver cutting-edge digital solutions.
                      </p>

                      <div className="flex flex-col items-center space-y-2 md:space-y-4">
                        <p className="flex items-center space-x-3 text-xl md:text-2xl">
                          <Image
                            src="/icons/whatsapp.svg"
                            alt="WhatsApp Icon"
                            width={24}
                            height={24}
                          />
                          <span className="text-neutral-200">
                            +1 (347) 479-2597
                          </span>
                        </p>

                        <p className="text-gray-400 md:text-lg">
                          Contact us today to discuss your project and how we
                          can help your business grow.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
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
