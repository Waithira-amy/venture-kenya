"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Vote,
  Share2,
  Check,
  Smartphone,
  CreditCard,
  X,
  Loader2,
  CheckCircle2,
  Trophy,
  SlidersHorizontal,
} from "lucide-react";
import {
  CHALLENGE_CATEGORIES,
  NOMINEES,
  Nominee,
  CategorySlug,
} from "@/data/nominees";

const VOTE_PRICE_KES = 10;
const VOTE_PRESETS = [1, 5, 10, 25, 50, 100];

export default function CategoryVotingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = (params?.category as CategorySlug) || "model-actor";

  const activeCategory =
    CHALLENGE_CATEGORIES.find((c) => c.slug === categorySlug) ||
    CHALLENGE_CATEGORIES[0];

  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");
  const [sortBy, setSortBy] = useState<"code" | "votes">("code");
  const [voteOverrides, setVoteOverrides] = useState<Record<string, number>>(
    {}
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voting Modal State
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [voteCount, setVoteCount] = useState<number>(5);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  // Load saved votes from localStorage & Paystack script
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vk_challenge_votes");
      if (saved) setVoteOverrides(JSON.parse(saved));
    } catch {
      // Ignore storage errors
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const categoryNominees = useMemo(() => {
    const list = NOMINEES.filter((n) => n.category === activeCategory.slug).map(
      (n) => ({
        ...n,
        votes: n.votes + (voteOverrides[n.id] || 0),
      })
    );

    const filtered = searchQuery.trim()
      ? list.filter(
          (n) =>
            n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : list;

    if (sortBy === "votes") {
      return [...filtered].sort((a, b) => b.votes - a.votes);
    }
    return filtered;
  }, [activeCategory.slug, searchQuery, sortBy, voteOverrides]);

  const recordLocalVotes = (nomineeId: string, addedVotes: number) => {
    setVoteOverrides((prev) => {
      const updated = {
        ...prev,
        [nomineeId]: (prev[nomineeId] || 0) + addedVotes,
      };
      try {
        localStorage.setItem("vk_challenge_votes", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  const handleShareNominee = async (nominee: Nominee) => {
    const shareUrl = `${window.location.origin}/challenge/${
      nominee.category
    }?q=${encodeURIComponent(nominee.name)}`;
    const shareText = `Vote for ${nominee.name} (${nominee.code}) in the Venture Kenya Culture Shoot Challenge — ${nominee.categoryLabel}!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Vote ${nominee.name} | Venture Kenya`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopiedId(nominee.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const openVoteModal = (nominee: Nominee) => {
    setSelectedNominee(nominee);
    setVoteCount(5);
    setVoteSuccess(false);
    setPhoneNumber("");
    setEmail("");
  };

  const closeVoteModal = () => {
    setSelectedNominee(null);
    setVoteSuccess(false);
    setIsProcessing(false);
  };

  const totalKES = Math.max(1, voteCount) * VOTE_PRICE_KES;

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNominee) return;
    if (voteCount < 1) return alert("Please select at least 1 vote.");

    if (paymentMethod === "card") {
      if (!email) return alert("Please enter your email address for receipt.");
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        alert("Paystack Public Key is missing in your environment variables.");
        return;
      }

      try {
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email,
          amount: totalKES * 100,
          currency: "KES",
          ref: `VK-${selectedNominee.code}-${Date.now()}`,
          callback: function () {
            recordLocalVotes(selectedNominee.id, voteCount);
            setVoteSuccess(true);
          },
        });
        handler.openIframe();
      } catch (err) {
        console.error("Paystack error:", err);
        alert("Could not initialize card payment. Please try again.");
      }
      return;
    }

    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number.");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: totalKES,
          reference: selectedNominee.code,
          description: `Vote for ${selectedNominee.name} (${voteCount} votes)`,
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        recordLocalVotes(selectedNominee.id, voteCount);
        setVoteSuccess(true);
      } else {
        alert("M-Pesa prompt failed to initialize. Please try again.");
      }
    } catch (error) {
      console.error("Vote error:", error);
      alert("Error connecting to M-Pesa. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Back Link */}
        <Link
          href="/challenge"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E6A26C] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Challenge Categories
        </Link>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/15 mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6A26C]">
              Kenya Culture Shoot Challenge
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              {activeCategory.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/70 font-light mt-2 max-w-2xl">
              {activeCategory.description}
            </p>
          </div>

          <div className="shrink-0 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-right">
            <span className="text-2xl font-serif font-bold text-[#E6A26C]">
              {categoryNominees.length}
            </span>
            <p className="text-[10px] uppercase tracking-widest text-white/60">
              Showing Nominees
            </p>
          </div>
        </div>

        {/* 4-Category Switcher Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {CHALLENGE_CATEGORIES.map((cat) => {
            const isActive = cat.slug === activeCategory.slug;
            const totalInCat = NOMINEES.filter(
              (n) => n.category === cat.slug
            ).length;

            return (
              <Link
                key={cat.slug}
                href={`/challenge/${cat.slug}`}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-[#E6A26C] text-[#0F1611] shadow-lg"
                    : "bg-white/5 text-white/75 hover:bg-white/10 border border-white/10"
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#0F1611]/15 text-[#0F1611]"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {totalInCat}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#E6A26C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeCategory.title} by name or code...`}
              className="w-full bg-white/5 border border-white/15 focus:border-[#E6A26C] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={() =>
              setSortBy((prev) => (prev === "code" ? "votes" : "code"))
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-white transition-all shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E6A26C]" />
            Sort: {sortBy === "code" ? "Contestant #" : "Highest Votes"}
          </button>
        </div>

        {/* Nominees Grid */}
        {categoryNominees.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.03] border border-white/10 rounded-3xl">
            <p className="text-white/70 text-sm mb-4">
              No nominees matched “{searchQuery}” in{" "}
              {activeCategory.title}.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold uppercase tracking-widest text-[#E6A26C] underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryNominees.map((nominee) => {
              const initials = nominee.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <motion.div
                  key={nominee.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-[#161F18] border border-white/10 hover:border-[#E6A26C]/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Nominee Photo + Monogram Fallback */}
                    <div className="relative h-64 w-full bg-gradient-to-br from-[#1f2b22] to-[#0F1611] overflow-hidden">
                      <img
                        src={nominee.image}
                        alt={nominee.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="hidden absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-[#1c261f] via-[#131b15] to-[#0F1611] p-4">
                        <div className="w-20 h-20 rounded-full border border-[#E6A26C]/40 bg-[#E6A26C]/10 flex items-center justify-center mb-3">
                          <span className="font-serif text-2xl font-bold text-[#E6A26C]">
                            {initials}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                          Official Nominee
                        </span>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-[#0F1611]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-[#E6A26C]">
                          {nominee.code}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#0F1611]/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-[#E6A26C]" />
                          {nominee.votes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Nominee Info */}
                    <div className="p-5 pb-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6A26C] mb-1">
                        {nominee.categoryLabel}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-white leading-snug line-clamp-1">
                        {nominee.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-2 flex items-center gap-2.5">
                    <button
                      onClick={() => openVoteModal(nominee)}
                      className="flex-1 bg-[#E6A26C] hover:bg-white text-[#0F1611] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Vote className="w-4 h-4" /> Vote Now
                    </button>

                    <button
                      onClick={() => handleShareNominee(nominee)}
                      title="Share voting link"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
                    >
                      {copiedId === nominee.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Voting Modal (M-Pesa STK Push & Paystack Card) */}
      <AnimatePresence>
        {selectedNominee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1611]/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#FCFCFA] text-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={closeVoteModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="bg-[#0F1611] text-[#FCFCFA] p-7">
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6A26C] bg-[#E6A26C]/15 border border-[#E6A26C]/30 px-3 py-1 rounded-full mb-3">
                  {selectedNominee.code} • {selectedNominee.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Vote for {selectedNominee.name}
                </h3>
                <p className="text-xs text-white/65 mt-1">
                  1 Vote = KES {VOTE_PRICE_KES} • Instant tally update
                </p>
              </div>

              <div className="p-7">
                {voteSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                      Vote Recorded!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-xs mx-auto mb-6">
                      {paymentMethod === "mpesa"
                        ? `An M-Pesa STK prompt for KES ${totalKES.toLocaleString()} has been sent to your phone for ${selectedNominee.name}.`
                        : `Thank you! Your ${voteCount} votes for ${selectedNominee.name} have been processed.`}
                    </p>
                    <button
                      onClick={closeVoteModal}
                      className="px-8 py-3 rounded-full bg-[#0F1611] text-white text-xs font-bold uppercase tracking-widest"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVoteSubmit} className="space-y-5">
                    {/* Quick Vote Packages */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Select Number of Votes
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {VOTE_PRESETS.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setVoteCount(preset)}
                            className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                              voteCount === preset
                                ? "border-[#0F1611] bg-[#0F1611] text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            {preset} {preset === 1 ? "Vote" : "Votes"}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={voteCount}
                        onChange={(e) =>
                          setVoteCount(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-full bg-white border border-slate-200 focus:border-[#E6A26C] rounded-xl py-3 px-4 text-sm font-mono font-bold text-slate-900 focus:outline-none"
                        placeholder="Custom vote count"
                        required
                      />
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mpesa")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                            paymentMethod === "mpesa"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <Smartphone className="w-4 h-4" /> M-Pesa
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                            paymentMethod === "card"
                              ? "border-[#0F1611] bg-[#0F1611] text-white"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" /> Card
                        </button>
                      </div>
                    </div>

                    {/* Phone or Email */}
                    {paymentMethod === "mpesa" ? (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          M-Pesa Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="0712345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-3.5 px-4 text-sm text-slate-900 focus:outline-none"
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Email for Receipt
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-[#0F1611] rounded-xl py-3.5 px-4 text-sm text-slate-900 focus:outline-none"
                          required
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                        paymentMethod === "mpesa"
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                          : "bg-[#E6A26C] hover:bg-[#d89159] text-[#0F1611]"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending
                          Prompt...
                        </>
                      ) : (
                        <>
                          Confirm {voteCount}{" "}
                          {voteCount === 1 ? "Vote" : "Votes"} (KES{" "}
                          {totalKES.toLocaleString()})
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}