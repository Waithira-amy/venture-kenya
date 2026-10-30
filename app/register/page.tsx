"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/Register"; 

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFCFA] font-sans text-[#0F1611] selection:bg-[#E6A26C]/30">
      <Navbar />
      
      {/* Reduced this spacer from pt-32 to pt-28 */}
      <div className="pt-28" /> 
      
      {/* Reduced bottom margin from mb-10 to mb-4 */}
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <a href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F1611]/50 hover:text-[#E6A26C] transition-colors">
          ← Back to Home
        </a>
      </div>

      <RegisterForm />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}