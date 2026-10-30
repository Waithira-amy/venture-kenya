"use client";
import React, { useState, useEffect } from "react";
import { Clock, Bell, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "National Nominees Showcase",
    tag: "Stage 1 Preview",
    desc: "Discover the top creative talents and fashion models competing across Kenya.",
   
  },
  {
    id: 2,
    title: "Big Five Expedition",
    tag: "Stage 2 Preview",
    desc: "Contestants heading into the wild for immersive tourism shoots.",
    
  },
  {
    id: 3,
    title: "Grand Finale Editorial",
    tag: "Stage 3 Preview",
    desc: "The final showdown for the KSh 100,000 championship title.",
    
  },
];

export default function VotingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section id="voting" className="py-28 md:py-36 bg-[#F4F3EA] relative z-10 text-[#0F1611] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Contextually Matched Image Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-[#0F1611] shadow-2xl border border-[#0F1611]/15 group"
          >
            {/* Sliding Background Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-0"
              >
                <img 
                  
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611] via-[#0F1611]/40 to-black/30" />
              </motion.div>
            </AnimatePresence>

            {/* Top Bar */}
            <div className="relative z-10 p-8 pb-0 flex justify-between items-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCFCFA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6A26C] animate-pulse" />
                {slides[currentIndex].tag}
              </span>
              <Camera className="w-6 h-6 text-[#E6A26C] drop-shadow" />
            </div>

            {/* Sliding Text Overlay */}
            <div className="relative z-10 mt-auto p-8 pt-4 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <span className="text-[#E6A26C] text-[10px] font-bold uppercase tracking-[0.3em] block mb-1">Venture Kenya</span>
                  <p className="font-serif text-2xl md:text-3xl font-medium text-[#FCFCFA] tracking-tight mb-1 drop-shadow-md">
                    {slides[currentIndex].title}
                  </p>
                  <p className="text-[#FCFCFA]/80 text-xs font-light max-w-sm drop-shadow">
                    {slides[currentIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Controls & Indicators */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-4 mt-6">
                <div className="flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? "w-6 bg-[#E6A26C]" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={prevSlide}
                    className="w-8 h-8 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E6A26C] hover:text-[#0F1611] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-8 h-8 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E6A26C] hover:text-[#0F1611] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Side: Text & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="w-14 h-14 rounded-full bg-[#0F1611]/5 border border-[#0F1611]/10 flex items-center justify-center mb-8 shadow-sm"
            >
              <Clock className="w-7 h-7 text-[#E6A26C]" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
            >
              Voting Opens Soon
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#0F1611]/70 text-base md:text-lg font-light leading-relaxed mb-8"
            >
              The Kenya Culture Shoot Challenge selection phase is currently underway. Public voting for the Stage 1 National Nominees will be available on this platform shortly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                href="/register"
                className="inline-flex items-center gap-3 bg-[#0F1611] text-[#FCFCFA] hover:bg-[#E6A26C] hover:text-[#0F1611] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md"
              >
                <Bell className="w-4 h-4 text-[#E6A26C]" />
                Register Talent First
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}