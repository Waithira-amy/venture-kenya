"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
    
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 inset-x-0 w-full z-[100] flex justify-center px-6 pointer-events-none">
      <nav className="pointer-events-auto bg-[#0F1611]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl relative">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src="/vk-logo.png" alt="Venture Kenya Logo" className="h-8 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="font-serif font-black text-lg tracking-widest text-[#FCFCFA] uppercase flex flex-col leading-none">
            Venture<span className="text-[#E6A26C] text-[10px] tracking-[0.3em] mt-1">Kenya</span>
          </div>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[#FCFCFA]/80">
          <button onClick={() => scrollToSection('about')} className="hover:text-[#E6A26C] transition-colors">About</button>
          <button onClick={() => scrollToSection('culture-shoot')} className="hover:text-[#E6A26C] transition-colors">Programme</button>
          <button onClick={() => scrollToSection('voting')} className="hover:text-[#E6A26C] transition-colors">Voting</button>
          <Link 
            href="/register" 
            className="bg-[#FCFCFA] text-[#0F1611] hover:bg-[#E6A26C] hover:text-[#0F1611] px-6 py-2.5 rounded-full transition-all shadow-md"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-[#FCFCFA] p-2 hover:text-[#E6A26C] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[120%] left-0 w-full bg-[#0F1611]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl md:hidden origin-top"
            >
              <button onClick={() => scrollToSection('about')} className="text-[#FCFCFA] text-xs font-bold uppercase tracking-widest text-left hover:text-[#E6A26C] transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('culture-shoot')} className="text-[#FCFCFA] text-xs font-bold uppercase tracking-widest text-left hover:text-[#E6A26C] transition-colors">
                Programme
              </button>
              <button onClick={() => scrollToSection('voting')} className="text-[#FCFCFA] text-xs font-bold uppercase tracking-widest text-left hover:text-[#E6A26C] transition-colors">
                Voting
              </button>
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="bg-[#E6A26C] text-[#0F1611] text-center px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest mt-2"
              >
                Join Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </div>
  );
}