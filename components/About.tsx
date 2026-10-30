"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Map, Camera, Megaphone } from "lucide-react";

export default function About() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    // Changed background to a softer, warmer tone (#F4F3EA) to reduce glare
    <section id="about" className="py-24 md:py-32 bg-[#F4F3EA] relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* About Main Section */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center mb-24">
          
          {/* Left Side: Dramatic Elephant Sunset */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden aspect-[4/3] lg:aspect-[3/4] shadow-2xl group"
          >
            <img 
              src="/about-sunset.jpg" 
              alt="Elephants Sunset" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </motion.div>

          {/* Right Side: Copywriting */}
          <div className="lg:col-span-7">
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="text-[#E6A26C] text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-px bg-[#E6A26C]" /> Our Vision & Mission
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#0F1611] leading-tight tracking-tight mb-8"
            >
              Leading digital platform for promoting Kenya's tourism, culture, and heritage to the world.
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-6 md:gap-8 text-[#0F1611]/70 font-light text-base leading-relaxed"
            >
              <p className="flex-1">
                Through our digital storytelling and creative campaigns, we use photography, videography, and curated cultural experiences to promote Kenya's breathtaking destinations and celebrate its vibrant heritage.
              </p>
              <p className="flex-1">
                We are committed to supporting local talent, boosting destination visibility, and partnering with tourism stakeholders to inspire sustainable exploration and pride in Kenyan identity.
              </p>
            </motion.div>
          </div>
          
        </div>

        {/* Services Bento Grid - Inverted to Dark Cards */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={item} className="bg-[#0F1611] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow group">
            <Globe className="w-8 h-8 text-[#E6A26C] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3">Digital Tourism</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Showcasing destinations, attractions, and travel experiences through immersive online content.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#0F1611] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow group">
            <Camera className="w-8 h-8 text-[#E6A26C] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3">Culture & Heritage</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Highlighting Kenyan traditions, arts, history, and cultural identity with visual storytelling.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#0F1611] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow group">
            <h3 className="font-serif text-xl text-[#FCFCFA] mb-3">Excursion Discovery</h3>
            <p className="text-[#FCFCFA]/60 text-sm font-light">Promoting places and experiences for individuals, families, and international visitors.</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-[#E6A26C] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow group">
            <Megaphone className="w-8 h-8 text-[#0F1611] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl text-[#0F1611] mb-3 font-bold">Digital Marketing</h3>
            <p className="text-[#0F1611]/80 text-sm font-medium">Creating promotional campaigns and destination features for tourism partners.</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}