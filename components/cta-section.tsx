"use client"

import { useState } from "react"
import { Spotlight } from "@/components/ui/spotlight"
import { EvervaultCard } from "@/components/ui/evervault-card"
import { SignUpFormDemo } from "@/components/ui/signup-form"

export function CTASection() {
  const [showForm, setShowForm] = useState(false)

  return (
    <section id="contact" className="relative w-full flex items-center justify-center overflow-hidden">
      <Spotlight className="hidden sm:block" fill="cyan" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto">
          <EvervaultCard text="Get Started Today" className="w-full">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              {!showForm ? (
                <>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Ready to transform your <span className="text-primary-400">idea</span> into{" "}
                    <span className="text-primary-400">digital reality</span>?
                  </h2>
                  <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl">
                    Join the innovative companies that trust Dijitize to deliver cutting-edge digital solutions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-8 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-black font-medium text-lg transition-all shadow-lg hover:shadow-primary-500/50"
                    >
                      Start Your Project
                    </button>
                    <button className="px-8 py-3 rounded-full bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10 font-medium text-lg transition-all">
                      Schedule Consultation
                    </button>
                  </div>
                </>
              ) : (
                <SignUpFormDemo />
              )}
            </div>
          </EvervaultCard>
        </div>
      </div>
    </section>
  )
}

