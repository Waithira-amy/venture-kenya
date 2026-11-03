"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function RegisterForm() {
  return (
    <section id="register" className="relative pt-4 pb-20 bg-[#FCFCFA] z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="bg-[#0F1611] rounded-[2rem] p-10 md:p-16 text-[#FCFCFA] shadow-2xl w-full"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Register<br />Here
              </h2>
              <p className="text-[#FCFCFA]/70 font-light text-sm md:text-base max-w-sm leading-relaxed">
                Register your talent for the Kenya Culture Shoot and help showcase our heritage to the world. Complete your details and portfolio uploads securely below.
              </p>
            </div>

            {/* Right Column: Google Form Action Portal */}
            <div className="flex flex-col gap-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                <h3 className="font-serif text-xl font-medium text-white mb-2">Official Application Portal</h3>
                <p className="text-xs text-[#FCFCFA]/60 mb-8 leading-relaxed max-w-xs">
                  Click below to open the registration form where you can submit your personal credentials, category, and photo/portfolio uploads.
                </p>

                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdRLWcQG1wMr5oPaoHtl7CYPyS1CR4uaeVUpYKRC9eS_y_2ug/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#E6A26C] text-[#0F1611] font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Register Here <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}