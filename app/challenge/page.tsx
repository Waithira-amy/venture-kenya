"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Scissors,
  Camera,
  Sparkles,
  ArrowUpRight,
  Search,
  Trophy,
  Vote,
} from "lucide-react";
import { CHALLENGE_CATEGORIES, NOMINEES, CategorySlug } from "@/data/nominees";

const CATEGORY_ICONS: Record<CategorySlug, React.ReactNode> = {
  "model-actor": <Users className="w-6 h-6 text-[#E6A26C]" />,
  "fashion-designer": <Scissors className="w-6 h-6 text-[#E6A26C]" />,
  "photographer-videographer": <Camera className="w-6 h-6 text-[#E6A26C]" />,
  "makeup-artist": <Sparkles className="w-6 h-6 text-[#E6A26C]" />,
};

export default function ChallengeHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const matchingNominees = searchQuery.trim()
    ? NOMINEES.filter(
        (n) =>
          n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.code.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#E6A26C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#E6A26C]/30 text-[#E6A26C] text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
            <Trophy className="w-3.5 h-3.5" /> Stage 1 National Voting
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
            Kenya Culture Shoot{" "}
            <span className="text-[#E6A26C] italic font-light">Challenge</span>
          </h1>

          <p className="text-sm sm:text-base text-[#FCFCFA]/75 font-light leading-relaxed mb-8">
            Select one of the four official creative categories below to view
            registered nominees and cast your public votes. Every vote powers
            Kenyan cultural talent.
          </p>

          {/* Quick Global Nominee Finder */}
          <div className="relative max-w-xl mx-auto text-left">
            <div className="relative">
              <Search className="w-4 h-4 text-[#E6A26C] absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick find any nominee by name or code (e.g. VK-MA-001)..."
                className="w-full bg-white/5 border border-white/15 focus:border-[#E6A26C] rounded-full py-3.5 pl-12 pr-5 text-sm text-[#FCFCFA] placeholder:text-white/40 focus:outline-none backdrop-blur-md transition-all"
              />
            </div>

            {matchingNominees.length > 0 && (
              <div className="mt-2 bg-[#161F18] border border-white/15 rounded-2xl overflow-hidden shadow-2xl divide-y divide-white/10">
                {matchingNominees.map((nominee) => (
                  <Link
                    key={nominee.id}
                    href={`/challenge/${nominee.category}?q=${encodeURIComponent(
                      nominee.name
                    )}`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {nominee.name}
                      </p>
                      <p className="text-[11px] text-[#E6A26C] uppercase tracking-wider">
                        {nominee.categoryLabel} • {nominee.code}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                      Vote <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-14">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6A26C]">
              {NOMINEES.length}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1">
              Nominees
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-white">
              4
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1">
              Categories
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6A26C]">
              KES 10
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1">
              Per Vote
            </p>
          </div>
        </div>

        {/* 4 Registered Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHALLENGE_CATEGORIES.map((category, idx) => {
            const count = NOMINEES.filter(
              (n) => n.category === category.slug
            ).length;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  href={`/challenge/${category.slug}`}
                  className="group block h-full bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:from-[#E6A26C]/15 hover:to-white/[0.05] border border-white/15 hover:border-[#E6A26C]/60 rounded-3xl p-7 sm:p-8 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F1611] border border-[#E6A26C]/30 flex items-center justify-center">
                      {CATEGORY_ICONS[category.slug]}
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#E6A26C]/15 border border-[#E6A26C]/30 text-[#E6A26C] text-[10px] font-bold uppercase tracking-[0.18em]">
                      {count} {count === 1 ? "Nominee" : "Nominees"}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#E6A26C] transition-colors mb-3">
                    {category.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-7">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-white/10">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E6A26C]">
                      <Vote className="w-4 h-4" /> Open Category Voting
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#E6A26C] text-white group-hover:text-[#0F1611] flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}