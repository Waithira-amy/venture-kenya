"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function Voting() {
  return (
    <section id="voting" className="relative py-40 bg-[#0F1611] text-[#FCFCFA] overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E6A26C]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-10"
        >
          <Clock className="w-10 h-10 text-[#E6A26C]" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Voting Opens Soon
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#FCFCFA]/60 text-lg md:text-xl font-light max-w-3xl"
        >
          The Kenya Culture Shoot Challenge 2026 selection phase is currently underway. Public voting for the Stage 1 National Nominees will be available on this platform shortly.
        </motion.p>
      </div>
    </section>
  );
}