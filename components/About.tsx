"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Camera, Megaphone } from "lucide-react";

export default function About() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="about" className="py-24 md:py-36 relative z-10 overflow-hidden bg-[#0F1611]">
      
      {/* Full-bleed Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/elephants-bg.jpg"
          alt="Kenyan Wildlife Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layered Vignette & Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1611]/95 via-[#0F1611]/85 to-[#0F1611]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611] via-transparent to-[#0F1611]/70" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Mission & Vision Section */}
        <div className="max-w-3xl mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="text-[#E6A26C] text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-[#E6A26C]" /> Our Vision & Mission
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-[#FCFCFA] leading-tight tracking-tight mb-8 drop-shadow-md"
          >
            Leading digital platform for promoting Kenya's tourism, culture, and heritage to the world.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 md:gap-8 text-[#FCFCFA]/80 font-light text-base leading-relaxed"
          >
            <p className="flex-1">
              Through our digital storytelling and creative campaigns, we use photography, videography, and curated cultural experiences to promote Kenya's breathtaking destinations and celebrate its vibrant heritage.
            </p>
            <p className="flex-1">
              We are committed to supporting local talent, boosting destination visibility, and partnering with tourism stakeholders to inspire sustainable exploration and pride in Kenyan identity.
            </p>
          </motion.div>
        </div>

        {/* Services Bento Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={item} className="bg-[#0F1611]/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#E6A26C]/40 transition-all group">
            <Globe className="w-8 h-8 text-[#E6A26C] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3">Digital Tourism</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Showcasing destinations, attractions, and travel experiences through immersive online content.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#0F1611]/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#E6A26C]/40 transition-all group">
            <Camera className="w-8 h-8 text-[#E6A26C] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3">Culture & Heritage</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Highlighting Kenyan traditions, arts, history, and cultural identity with visual storytelling.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#0F1611]/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#E6A26C]/40 transition-all group">
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3 mt-14">Excursion Discovery</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Promoting places and experiences for individuals, families, and international visitors.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#E6A26C] p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group">
            <Megaphone className="w-8 h-8 text-[#0F1611] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#0F1611] mb-3 font-bold">Digital Marketing</h3>
            <p className="text-[#0F1611]/80 text-sm font-medium">Creating promotional campaigns and destination features for tourism partners.</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}