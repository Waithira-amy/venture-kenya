"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownRight, Heart, Smartphone, CreditCard, X, Loader2, CheckCircle2, Globe, MapPin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"funds" | "in-kind">("funds");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("card");
  
  // Donation State
  const [cardCurrency, setCardCurrency] = useState<"USD" | "KES">("USD");
  const [amount, setAmount] = useState<number | string>(50);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load Paystack Script dynamically on client side
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const safeAmount = typeof amount === 'number' ? amount : (parseInt(amount) || 0);
  const exchangeRate = 130;
  
  const finalAmountKES = paymentMethod === "mpesa" 
    ? safeAmount 
    : (cardCurrency === "USD" ? safeAmount * exchangeRate : safeAmount);

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!email) return alert("Please enter your email address for the receipt.");
      if (safeAmount <= 0) return alert("Please enter a valid amount.");
      
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        alert("Paystack Public Key is missing in your environment variables.");
        return;
      }

      try {
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: finalAmountKES * 100,
          currency: "KES",
          ref: '' + Math.floor((Math.random() * 1000000000) + 1),
          callback: function () {
            setPaymentSuccess(true);
            setTimeout(() => {
              setPaymentSuccess(false);
              closeModal();
            }, 4000);
          },
          onClose: function () {
            // Window closed
          }
        });
        handler.openIframe();
      } catch (err) {
        console.error("Paystack error:", err);
        alert("Could not initialize card payment. Please try again.");
      }
      return;
    }

    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number");
    setIsProcessing(true);

    try {
      const response = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: finalAmountKES,
          reference: "FriendsOfKenya",
          description: "Donation to Venture Kenya"
        })
      });

      const resData = await response.json();

      if (resData.success) {
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          closeModal();
        }, 6000); 
      } else {
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("Something went wrong connecting to M-Pesa. Please check your internet connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentSuccess(false);
    setPhoneNumber("");
    setEmail("");
    setAmount(50);
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col justify-center pt-40 md:pt-32 pb-20 bg-[#0F1611] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/viva-americana-_pfAO4mz-RY-unsplash.jpg" 
          alt="Venture Kenya Sunset" 
          className="w-full h-full object-cover object-center mix-blend-screen opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1611]/40 via-[#0F1611]/70 to-[#0F1611]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col justify-center h-full pb-32 md:pb-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-fit inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#E6A26C] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCFCFA]">Creative Tourism Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#FCFCFA] leading-[1.05] tracking-tight mb-8"
        >
          Discover Kenya.<br />
          <span className="text-[#E6A26C] italic font-light drop-shadow-lg">Experience</span> Heritage.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-t-0 md:border-t md:border-white/20 pt-4 md:pt-10 mt-8 md:mt-10"
        >
          <p className="text-base md:text-lg text-[#FCFCFA]/90 max-w-xl font-light leading-relaxed drop-shadow-md">
            A digital platform dedicated to showcasing Kenya's cultural diversity, historical landmarks, and creative talent to the world.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent border border-white/30 hover:bg-white/10 text-[#FCFCFA] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-out backdrop-blur-sm"
            >
              <Heart className="w-4 h-4 text-[#E6A26C] group-hover:scale-110 transition-transform" />
              Friends of Kenya
            </button>
            
            <Link 
              href="/register"
              className="group w-full sm:w-auto flex items-center justify-between gap-6 bg-[#E6A26C] hover:bg-[#FCFCFA] text-[#0F1611] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(230,162,108,0.4)]"
            >
              Register Talent
              <div className="bg-[#0F1611]/10 p-2 rounded-full group-hover:-rotate-45 transition-transform duration-300 ease-out">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Friends of Kenya Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1611]/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#FCFCFA] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-900 bg-white/90 p-2 rounded-full border border-slate-200 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Info Panel */}
              <div className="w-full md:w-5/12 bg-[#0F1611] p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center relative overflow-hidden text-[#FCFCFA]">
                <div className="absolute top-0 left-0 w-48 h-48 bg-[#E6A26C]/20 rounded-full blur-[80px]" />
                <Heart className="w-10 h-10 text-[#E6A26C] mb-6 relative z-10" />
                <h3 className="font-serif text-3xl font-bold mb-4 leading-tight relative z-10">
                  Friends of <br />Kenya
                </h3>
                <p className="text-sm text-white/70 mb-8 font-light relative z-10">
                  Your support funds cultural preservation, local excursions, and the Kenya Culture Shoot initiative.
                </p>
                
                <div className="space-y-5 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-white/5 shrink-0">
                      <Globe className="w-4 h-4 text-[#E6A26C]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Global Impact</h4>
                      <p className="text-xs text-white/50 mt-1">Accepting donations worldwide via Card & M-Pesa.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-white/5 shrink-0">
                      <MapPin className="w-4 h-4 text-[#E6A26C]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Local Growth</h4>
                      <p className="text-xs text-white/50 mt-1">Directly empowering Kenyan tourism & talent.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Payment Form */}
              <div className="w-full md:w-7/12 p-8 md:p-10 relative bg-[#FCFCFA]">
                {paymentSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Thank You!</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                      {paymentMethod === "mpesa" 
                        ? "An M-Pesa prompt has been sent to your phone to complete the donation." 
                        : "Your donation has been successfully processed."}
                    </p>
                    <button onClick={closeModal} className="mt-8 text-xs font-bold uppercase tracking-widest text-[#E6A26C] hover:text-[#0F1611] transition-colors">
                      Close Window
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex bg-slate-200/50 p-1 rounded-xl mb-8 border border-slate-200">
                      <button
                        onClick={() => setActiveTab("funds")}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                          activeTab === "funds" ? "bg-white text-[#0F1611] shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Fund Support
                      </button>
                      <button
                        onClick={() => setActiveTab("in-kind")}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                          activeTab === "in-kind" ? "bg-white text-[#0F1611] shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        In-Kind
                      </button>
                    </div>

                    {activeTab === "in-kind" ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                        <div className="w-16 h-16 bg-[#E6A26C]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                          <Heart className="w-8 h-8 text-[#E6A26C]" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Donate Equipment or Services</h4>
                        <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                          We welcome camera gear, event spaces, logistics support, and professional services to elevate our initiatives.
                        </p>
                        <a href="mailto:support@venturekenya.co.ke" className="inline-flex items-center justify-center gap-2 bg-[#0F1611] hover:bg-slate-800 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md">
                          <Mail className="w-4 h-4" /> Email Us
                        </a>
                      </motion.div>
                    ) : (
                      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleDonateSubmit} className="space-y-6">
                        
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                            Payment Method
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => { setPaymentMethod("card"); setCardCurrency("USD"); setAmount(50); }}
                              className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                                paymentMethod === "card"
                                  ? "border-[#0F1611] bg-[#0F1611] text-white shadow-md"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              <CreditCard className="w-4 h-4" /> Card
                            </button>
                            <button
                              type="button"
                              onClick={() => { setPaymentMethod("mpesa"); setAmount(1000); }}
                              className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                                paymentMethod === "mpesa"
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              <Smartphone className="w-4 h-4" /> M-Pesa
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                Amount
                              </label>
                              {paymentMethod === "card" && (
                                <div className="flex gap-1">
                                  <button type="button" onClick={() => { setCardCurrency("USD"); setAmount(50); }} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cardCurrency === "USD" ? "bg-slate-200 text-slate-900" : "text-slate-400"}`}>USD</button>
                                  <button type="button" onClick={() => { setCardCurrency("KES"); setAmount(5000); }} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cardCurrency === "KES" ? "bg-slate-200 text-slate-900" : "text-slate-400"}`}>KES</button>
                                </div>
                              )}
                            </div>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                {paymentMethod === "mpesa" ? "KES" : (cardCurrency === "USD" ? "$" : "KES")}
                              </span>
                              <input 
                                type="number" 
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-[#E6A26C] focus:ring-2 focus:ring-[#E6A26C]/20 rounded-xl py-3.5 pl-14 pr-4 text-sm font-mono font-bold text-slate-900 shadow-sm focus:outline-none transition-all"
                                required
                              />
                            </div>
                          </div>

                          {paymentMethod === "mpesa" ? (
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                Phone Number
                              </label>
                              <input 
                                type="tel" 
                                placeholder="0712345678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-3.5 px-4 text-sm text-slate-900 shadow-sm focus:outline-none transition-all"
                                required
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                Email Address
                              </label>
                              <input
                                type="email"
                                placeholder="Email for receipt"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-[#0F1611] focus:ring-2 focus:ring-[#0F1611]/10 rounded-xl py-3.5 px-4 text-sm text-slate-900 shadow-sm focus:outline-none transition-all"
                                required
                              />
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg mt-2 flex items-center justify-center gap-2 ${
                            paymentMethod === "mpesa" 
                              ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                              : "bg-[#E6A26C] hover:bg-[#d9915a] shadow-[#E6A26C]/20 text-[#0F1611]"
                          }`}
                        >
                          {isProcessing ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                          ) : paymentMethod === "mpesa" ? (
                            <><Smartphone className="w-4 h-4" /> Donate KES {safeAmount.toLocaleString()}</>
                          ) : (
                            <><CreditCard className="w-4 h-4" /> Donate {cardCurrency === "USD" ? `$${safeAmount.toLocaleString()}` : `KES ${safeAmount.toLocaleString()}`}</>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}