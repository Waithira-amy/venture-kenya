"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/Register"; // Reusing your form component

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFCFA] font-sans text-[#0F1611] selection:bg-[#E6A26C]/30">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-32" /> 
      
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <a href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F1611]/50 hover:text-[#E6A26C] transition-colors">
          ← Back to Home
        </a>
      </div>

      <RegisterForm />
      <Footer />
    </main>
  );
}