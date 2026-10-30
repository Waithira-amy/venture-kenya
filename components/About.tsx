"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Map, Camera, Megaphone } from "lucide-react";

export default function About() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="about" className="py-32 bg-[#FCFCFA] relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#E6A26C] text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-[#E6A26C]" /> Our Vision & Mission
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#0F1611] leading-tight tracking-tight mb-6">
              Leading digital platform for promoting Kenya's tourism to the world.
            </h2>
            <p className="text-[#0F1611]/60 font-light text-lg leading-relaxed">
              We connect people with Kenya's destinations and cultural experiences through digital innovation, creative talent, and strategic partnerships. We use photography, videography, and storytelling to inspire exploration.
            </p>
          </motion.div>
        </div>

        {/* Services Bento Grid */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-[#0F1611]/5 shadow-sm hover:shadow-xl transition-shadow">
            <Globe className="w-8 h-8 text-[#445EB2] mb-6" />
            <h3 className="font-serif text-xl text-[#0F1611] mb-3">Digital Tourism</h3>
            <p className="text-[#0F1611]/60 text-sm font-light">Showcasing destinations, attractions, and travel experiences through immersive online content.</p>
          </motion.div>
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-[#0F1611]/5 shadow-sm hover:shadow-xl transition-shadow">
            <Camera className="w-8 h-8 text-[#E6A26C] mb-6" />
            <h3 className="font-serif text-xl text-[#0F1611] mb-3">Culture & Heritage</h3>
            <p className="text-[#0F1611]/60 text-sm font-light">Highlighting Kenyan traditions, arts, history, and cultural identity with visual storytelling.</p>
          </motion.div>
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-[#0F1611]/5 shadow-sm hover:shadow-xl transition-shadow">
            <h3 className="font-serif text-xl text-[#0F1611] mb-3">Excursion Discovery</h3>
            <p className="text-[#0F1611]/60 text-sm font-light">Promoting places and experiences for individuals, families, and international visitors.</p>
          </motion.div>
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-[#0F1611]/5 shadow-sm hover:shadow-xl transition-shadow">
            <Megaphone className="w-8 h-8 text-[#0F1611] mb-6" />
            <h3 className="font-serif text-xl text-[#0F1611] mb-3">Digital Marketing</h3>
            <p className="text-[#0F1611]/60 text-sm font-light">Creating promotional campaigns and destination features for tourism partners.</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}