"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

export function HeroSection() {
  return (
    <section>
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br align-middle mt-15 from-slate-300 py-1 to-slate-500  bg-clip-text text-center font-medium tracking-tight text-transparent "
      >
         <p className="text-8xl bg-gradient-to-b from-primary to-white bg-clip-text text-transparent">
         Dijitize.com</p>  <p className="text-4xl  md:text-5xl  text-gray-300">Transforming your ideas into digital reality.</p>

      </motion.h1>
    </LampContainer>
    </section>
  );
}
