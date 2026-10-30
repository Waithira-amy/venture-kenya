"use client";
import React from "react";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col justify-center pt-32 pb-20 bg-[#0F1611] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/viva-americana-_pfAO4mz-RY-unsplash.jpg" 
          alt="Venture Kenya Sunset" 
          className="w-full h-full object-cover object-center mix-blend-screen opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1611]/40 via-[#0F1611]/70 to-[#0F1611]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-fit inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md mb-8 mx-auto md:mx-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#E6A26C] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCFCFA]">Creative Tourism Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#FCFCFA] leading-[1.05] tracking-tight mb-8 text-center md:text-left"
        >
          Discover Kenya.<br />
          <span className="text-[#E6A26C] italic font-light drop-shadow-lg">Experience</span> Heritage.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 border-t border-white/20 pt-8 md:pt-10 mt-6 md:mt-10 items-center md:items-start"
        >
          <p className="text-base md:text-lg text-[#FCFCFA]/90 max-w-xl font-light leading-relaxed drop-shadow-md text-center md:text-left">
            A digital platform dedicated to showcasing Kenya's cultural diversity, historical landmarks, and creative talent to the world.
          </p>

          <Link 
            href="/register"
            className="group flex items-center justify-between gap-6 bg-[#E6A26C] hover:bg-[#FCFCFA] text-[#0F1611] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(230,162,108,0.4)] w-full md:w-fit justify-center md:justify-between mt-4 md:mt-0"
          >
            Register Talent
            <div className="bg-[#0F1611]/10 p-2 rounded-full group-hover:-rotate-45 transition-transform duration-300 ease-out ml-4 md:ml-0">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}