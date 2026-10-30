"use client";
import React from "react";
import { Map, Users, Trophy, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function CultureShoot() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="culture-shoot" className="py-24 bg-[#FCFCFA]">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-[#E6A26C] text-xs font-bold uppercase tracking-[0.2em] mb-4">Kenya Culture Shoot Challenge 2026</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F1611] mb-4">Explore Kenya. Express Culture.</h2>
          <p className="text-[#0F1611]/60 text-lg font-light max-w-3xl">
            A national creative talent and tourism competition uniting models, makeup artists, fashion designers, and photographers/videographers. Compete through public voting and destination adventures for a KSh 100,000 championship prize. Registration closes 20 November 2026.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-[#0F1611]/5 flex flex-col justify-between hover:shadow-lg transition-all">
            <Users className="w-8 h-8 text-[#445EB2]" />
            <div>
              <h3 className="text-xl font-serif text-[#0F1611] mb-2">Stage 1: National Voting</h3>
              <p className="text-[#0F1611]/60 font-light text-sm">Up to 250 contestants compete via KSh 10 public votes. The Top 22 advance, with sponsors able to purchase direct Wildcard Tickets bypassing this stage.</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-[#0F1611]/5 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <h3 className="text-xl font-serif text-[#0F1611] mb-2">Stage 2: Big Five Adventure</h3>
              <p className="text-[#0F1611]/60 font-light text-sm">The Top 22 travel to a tourism destination, forming Big Five-inspired teams (Simba, Chui, Ndovu, Kifaru, Nyati). Following a second KSh 10-per-vote round, the Top 8 advance.</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="md:col-span-2 lg:col-span-1 bg-[#0F1611] rounded-3xl p-8 flex flex-col justify-between text-white hover:shadow-lg transition-all">
            <Trophy className="w-8 h-8 text-[#E6A26C]" />
            <div>
              <h3 className="text-xl font-serif mb-2">Stage 3: Grand Finale</h3>
              <p className="text-white/70 font-light text-sm">The 8 finalists undertake a final challenge at a Kenyan tourism destination. Participants can form Unified Creative Teams. The highest verified votes win KSh 100,000.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}