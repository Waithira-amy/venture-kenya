"use client";
import React, { useState, useEffect } from "react";
import { Globe, Mail } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#FCFCFA] pt-10 pb-10 border-t border-[#0F1611]/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <div className="font-serif font-black text-2xl tracking-widest text-[#0F1611] uppercase flex flex-col items-center mb-8">
          Venture<span className="text-[#E6A26C] text-sm tracking-[0.3em]">Kenya</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-[#0F1611]/60 text-sm mb-12 font-light">
          <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> venturekenya.co.ke</span>
          <span className="hidden md:inline text-[#0F1611]/20">|</span>
          <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@venturekenya.co.ke</span>
        </div>
        <p className="text-[#0F1611]/40 text-xs font-bold uppercase tracking-widest">
          © {year || "2026"} Perfectors Creative Hub.
        </p>
      </div>
    </footer>
  );
}