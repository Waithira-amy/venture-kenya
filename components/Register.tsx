"use client";
import React from "react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  return (
    <section id="register" className="relative pt-4 pb-20 bg-[#FCFCFA] z-10 px-6">
      {/* Changed to max-w-4xl and added mx-auto to center the narrower box */}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="bg-[#0F1611] rounded-[2rem] p-10 md:p-16 text-[#FCFCFA] shadow-2xl w-full"
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Text */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Join The<br />Movement
              </h2>
              <p className="text-[#FCFCFA]/70 font-light text-sm md:text-base max-w-sm">
                Register your talent for the Kenya Culture Shoot and help showcase our heritage to the world.
              </p>
            </div>

            {/* Right Column: Form Inputs */}
            <form className="flex flex-col gap-5">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#E6A26C] transition-colors text-white placeholder-white/40"
              />
              <div className="grid grid-cols-2 gap-5">
                <input 
                  type="number" 
                  placeholder="Age" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#E6A26C] transition-colors text-white placeholder-white/40"
                />
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#E6A26C] transition-colors text-white placeholder-white/40"
                />
              </div>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#E6A26C] transition-colors text-white/40 appearance-none">
                <option value="" disabled selected>Select Category</option>
                <option value="model" className="text-black">Model / Actor</option>
                <option value="makeup" className="text-black">Makeup Artist</option>
                <option value="fashion" className="text-black">Fashion Designer</option>
                <option value="photo_video" className="text-black">Photographer / Videographer</option>
              </select>
              <button 
                type="button" 
                className="w-full bg-[#E6A26C] text-[#0F1611] font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors mt-2"
              >
                Submit Application
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </section>
  );
}