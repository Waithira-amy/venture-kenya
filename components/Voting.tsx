"use client";
import React from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VotingSection() {
  return (
    <section id="voting" className="py-32 md:py-48 relative z-10 text-[#FCFCFA] overflow-hidden bg-[#0F1611] flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lions-bg.jpg" 
          alt="Venture Kenya Wildlife"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611] via-transparent to-[#0F1611]/60" />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-[#FCFCFA] drop-shadow-lg"
        >
          Voting Opens Soon
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#FCFCFA]/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl drop-shadow-md"
        >
          The Kenya Culture Shoot Challenge selection phase is currently underway. Public voting for the Stage 1 National Nominees will be available on this platform shortly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            href="/register"
            className="inline-flex items-center gap-3 bg-[#E6A26C] text-[#0F1611] hover:bg-white hover:text-[#0F1611] px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <Bell className="w-5 h-5 text-[#0F1611]" />
            Register Talent First
          </Link>
        </motion.div>

      </div>
    </section>
  );
}