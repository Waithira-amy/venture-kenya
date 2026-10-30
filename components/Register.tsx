"use client";
import React, { useState } from "react";
import { ChevronDown, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({ fullName: "", age: "", phone: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Models (Actors)", "Fashion Designers", "Make Up Artist", "Videographers (Photographers)"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/venture-register", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) { setSuccess(true); setFormData({ fullName: "", age: "", phone: "", category: "" }); } 
      else setError(result.error || "Failed to submit.");
    } catch { setError("Network error."); } finally { setLoading(false); }
  };

  return (
    <section id="register" className="relative pt-4 pb-20 bg-[#FCFCFA] z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-[#0F1611] rounded-[3rem] p-10 md:p-16 text-[#FCFCFA] shadow-2xl"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">Register Here</h2>
            <p className="text-[#FCFCFA]/60 text-base font-light mb-8">
              Register your talent for the Kenya Culture Shoot and help showcase our heritage to the world.
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/50">01</div>
               <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/50">02</div>
               <div className="w-10 h-10 rounded-full bg-[#E6A26C] text-[#0F1611] flex items-center justify-center font-bold text-xs">03</div>
            </div>
          </div>

          <div>
            {error && (
              <div className="mb-6 p-4 bg-red-900/50 rounded-2xl flex items-center gap-3 text-red-200 text-sm font-bold">
                <AlertTriangle className="w-5 h-5" /> {error}
              </div>
            )}

            {success ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-[#E6A26C] mx-auto mb-6" />
                <h3 className="font-serif text-3xl font-bold mb-2">Application Sent</h3>
                <p className="text-[#FCFCFA]/60 mb-6 font-light">Our team will review your profile shortly.</p>
                <button onClick={() => setSuccess(false)} className="text-[#E6A26C] font-bold uppercase tracking-widest text-xs">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-[#FCFCFA] placeholder:text-white/30 focus:ring-2 focus:ring-[#E6A26C] focus:border-transparent transition-all outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number" name="age" required min="16" value={formData.age} onChange={handleInputChange} placeholder="Age"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-[#FCFCFA] placeholder:text-white/30 focus:ring-2 focus:ring-[#E6A26C] focus:border-transparent transition-all outline-none"
                  />
                  <input
                    type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="Phone"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-[#FCFCFA] placeholder:text-white/30 focus:ring-2 focus:ring-[#E6A26C] focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div className="relative">
                  <select
                    name="category" required value={formData.category} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white/80 focus:ring-2 focus:ring-[#E6A26C] focus:border-transparent transition-all appearance-none outline-none"
                  >
                    <option value="" disabled className="text-gray-500">Select Category</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full mt-4 bg-[#E6A26C] text-[#0F1611] py-4 rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors flex justify-center items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}