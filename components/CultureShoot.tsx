"use client";
import React from "react";
import { Map, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function CultureShoot() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="culture-shoot" className="relative py-28 md:py-36 overflow-hidden z-10">
      
      {/* Background Image with a much lighter, atmospheric gradient so the sunset glows through */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/culture-sunset.jpg" 
          alt="Giraffe Sunset Background" 
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Lighter overlay: lets the vibrant orange sunset shine while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1611]/70 via-[#0F1611]/50 to-[#0F1611]/80 backdrop-brightness-90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header & Overview */}
        <div className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#E6A26C] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCFCFA]">Kenya Culture Shoot Challenge 2026</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl font-bold text-[#FCFCFA] mb-6 leading-[1.1] tracking-tight drop-shadow-md"
          >
            Explore Kenya. <br />
            <span className="text-[#E6A26C] italic font-light">Express Culture.</span> Create Together.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#FCFCFA]/90 text-base md:text-lg font-light leading-relaxed drop-shadow"
          >
            A national creative talent and tourism competition uniting models, makeup artists, fashion designers, and photographers/videographers. Compete through public voting and destination adventures for a KSh 100,000 championship prize. Registration closes 20 November 2026.
          </motion.p>
        </div>

        {/* 3 Stages Premium Glassmorphism Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          <motion.div variants={item} className="bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/15 hover:border-[#E6A26C]/50 transition-all shadow-2xl flex flex-col justify-between group">
            <Users className="w-8 h-8 text-[#E6A26C] mb-6 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-[#E6A26C] text-[10px] font-bold uppercase tracking-widest block mb-2">Stage 1</span>
              <h3 className="font-serif text-2xl text-[#FCFCFA] mb-3">National Voting</h3>
              <p className="text-[#FCFCFA]/70 font-light text-sm leading-relaxed">Up to 250 contestants compete via KSh 10 public votes. The Top 22 advance, with sponsors able to purchase direct Wildcard Tickets.</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/15 hover:border-[#E6A26C]/50 transition-all shadow-2xl flex flex-col justify-between group">
            <div>
              <span className="text-[#E6A26C] text-[10px] font-bold uppercase tracking-widest block mb-2">Stage 2</span>
              <h3 className="font-serif text-2xl text-[#FCFCFA] mb-3">Big Five Adventure</h3>
              <p className="text-[#FCFCFA]/70 font-light text-sm leading-relaxed">The Top 22 travel to a tourism destination, forming Big Five-inspired teams. Following a second KSh 10-per-vote round, the Top 8 advance.</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-[#E6A26C] p-8 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-all flex flex-col justify-between group">
            <Trophy className="w-8 h-8 text-[#0F1611] mb-6 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-[#0F1611]/80 text-[10px] font-bold uppercase tracking-widest block mb-2">Stage 3</span>
              <h3 className="font-serif text-2xl text-[#0F1611] mb-3 font-bold">Grand Finale</h3>
              <p className="text-[#0F1611]/85 font-medium text-sm leading-relaxed">The 8 finalists undertake a final challenge at a Kenyan tourism destination. Participants can form Unified Creative Teams to win the KSh 100,000 prize.</p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}