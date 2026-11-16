"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function VotingSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Targets November 22, 2026 at 12:00 AM EAT (Nairobi time)
    const targetDate = new Date("2026-11-22T00:00:00+03:00").getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timerUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section id="voting" className="py-28 md:py-40 relative z-10 text-[#FCFCFA] overflow-hidden bg-[#0F1611] flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lions-bg.jpg" 
          alt="Venture Kenya Wildlife"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611] via-transparent to-[#0F1611]/60" />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight text-[#FCFCFA] drop-shadow-lg"
        >
          {isLive ? "Voting Is Now Live" : "Challenge Starts Soon"}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[#FCFCFA]/90 text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl drop-shadow-md"
        >
          The Kenya Culture Shoot Challenge selection phase is currently underway. Public voting for the Stage 1 National Nominees opens on{" "}
          <span className="text-[#E6A26C] font-medium">22nd November</span>.
        </motion.p>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mb-10"
        >
          {timerUnits.map((unit) => (
            <div
              key={unit.label}
              className="bg-[#0F1611]/70 backdrop-blur-md border border-white/15 rounded-2xl py-3.5 sm:py-5 px-2 flex flex-col items-center justify-center shadow-xl"
            >
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#E6A26C] tabular-nums leading-none">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCFCFA]/70 mt-2">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Link 
            href="/register"
            className="inline-flex items-center gap-3 bg-[#E6A26C] text-[#0F1611] hover:bg-white hover:text-[#0F1611] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <Bell className="w-4 h-4 text-[#0F1611]" />
            Register Talent First
          </Link>
        </motion.div>

      </div>
    </section>
  );
}