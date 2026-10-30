"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToSection = (id: string) => {
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
      <nav className="pointer-events-auto bg-[#0F1611]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/vk-logo.png" alt="Venture Kenya Logo" className="h-8 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="font-serif font-black text-lg tracking-widest text-[#FCFCFA] uppercase flex flex-col leading-none">
            Venture<span className="text-[#E6A26C] text-[10px] tracking-[0.3em] mt-1">Kenya</span>
          </div>
        </Link>

        {/* Links */}
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
      </nav>
    </div>
  );
}