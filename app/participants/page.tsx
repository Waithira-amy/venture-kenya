"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users,
  Scissors,
  Camera,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
  Search,
  Share2,
  Download,
  Check,
  Smartphone,
  CreditCard,
  X,
  Loader2,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CHALLENGE_CATEGORIES,
  NOMINEES,
  Nominee,
  CategorySlug,
} from "../../data/nominees";

const BOOST_PRICE_KES = 10;
const BOOST_BUNDLES = [1, 5, 10, 50];

const CATEGORY_ICONS: Record<CategorySlug, React.ReactNode> = {
  "models-actors": <Users className="w-5 h-5 text-[#E6A26C]" />,
  "fashion-designers": <Scissors className="w-5 h-5 text-[#E6A26C]" />,
  "photographers-videographers": <Camera className="w-5 h-5 text-[#E6A26C]" />,
  "makeup-artists": <Sparkles className="w-5 h-5 text-[#E6A26C]" />,
};

export default function ChallengeParticipantsPage() {
  const [selectedCategorySlug, setSelectedCategorySlug] =
    useState<CategorySlug | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Live Neon Database Vote Tallies (keyed by nominee.code)
  const [dbVotes, setDbVotes] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Stage 1 Mobilization Modal State
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [boostCount, setBoostCount] = useState<number>(10);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [votesBeforePayment, setVotesBeforePayment] = useState<number>(0);
  const [voteConfirmed, setVoteConfirmed] = useState(false);

  const fetchLiveVotes = useCallback(async () => {
    try {
      const res = await fetch("/api/votes", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.votes) {
        setDbVotes(data.votes);
      }
    } catch (err) {
      console.error("Failed to fetch live votes:", err);
    }
  }, []);

  useEffect(() => {
    fetchLiveVotes();

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, [fetchLiveVotes]);

  const activeCategory = useMemo(
    () =>
      CHALLENGE_CATEGORIES.find((c) => c.slug === selectedCategorySlug) || null,
    [selectedCategorySlug]
  );

  const categoryNominees = useMemo(() => {
    if (!activeCategory) return [];
    const list = NOMINEES.filter((n) => n.category === activeCategory.slug).map(
      (n) => ({
        ...n,
        votes: n.votes + (dbVotes[n.code] || 0),
      })
    );

    if (!searchQuery.trim()) return list;
    return list.filter(
      (n) =>
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery, dbVotes]);

  const liveSelectedNominee = useMemo(() => {
    if (!selectedNominee) return null;
    const base =
      NOMINEES.find((n) => n.code === selectedNominee.code) || selectedNominee;
    return {
      ...base,
      votes: base.votes + (dbVotes[base.code] || 0),
    };
  }, [selectedNominee, dbVotes]);

  // Poll Neon every 2.5 seconds after STK push until the confirmed vote arrives
  useEffect(() => {
    if (!supportSuccess || paymentMethod !== "mpesa" || voteConfirmed) return;
    const interval = setInterval(fetchLiveVotes, 2500);
    const timeout = setTimeout(() => clearInterval(interval), 60000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [supportSuccess, paymentMethod, voteConfirmed, fetchLiveVotes]);

  // Switch modal to Thank You message as soon as the database vote count increases
  useEffect(() => {
    if (
      supportSuccess &&
      paymentMethod === "mpesa" &&
      !voteConfirmed &&
      liveSelectedNominee &&
      liveSelectedNominee.votes > votesBeforePayment
    ) {
      setVoteConfirmed(true);
    }
  }, [
    supportSuccess,
    paymentMethod,
    voteConfirmed,
    liveSelectedNominee,
    votesBeforePayment,
  ]);

  const handleSelectCategory = (slug: CategorySlug) => {
    setSelectedCategorySlug(slug);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCategories = () => {
    setSelectedCategorySlug(null);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openNomineeModal = (nominee: Nominee) => {
    setSelectedNominee(nominee);
    setBoostCount(10);
    setPaymentMethod("mpesa");
    setSupportSuccess(false);
    setVoteConfirmed(false);
    setPhoneNumber("");
    setEmail("");
    setCopiedLink(false);
  };

  const closeNomineeModal = () => {
    fetchLiveVotes();
    setSelectedNominee(null);
    setSupportSuccess(false);
    setVoteConfirmed(false);
    setIsProcessing(false);
  };

  const handleCopyNomineeLink = async (nominee: Nominee) => {
    const shareUrl = `${window.location.origin}/participants`;
    const shareText = `Support ${nominee.name} (#${nominee.code}) in the Kenya Culture Shoot Challenge — ${nominee.categoryLabel}! ${shareUrl}`;
    await navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSavePoster = (nominee: Nominee) => {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 960;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0F1611";
    ctx.fillRect(0, 0, 720, 960);

    ctx.strokeStyle = "#E6A26C";
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, 664, 904);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(60, 65, 195, 44);
    ctx.fillStyle = "#FCFCFA";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`#${nominee.code}`, 78, 94);

    ctx.fillStyle = "#E6A26C";
    ctx.fillRect(495, 65, 165, 44);
    ctx.fillStyle = "#0F1611";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("VK 2026", 535, 94);

    const centerX = 360;
    const centerY = 390;
    const radius = 140;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
    ctx.fillStyle = "#E6A26C";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#1B261E";
    ctx.fill();

    const initials = nominee.name
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
    ctx.fillStyle = "#E6A26C";
    ctx.font = "bold 82px serif";
    ctx.textAlign = "center";
    ctx.fillText(initials, centerX, centerY + 28);

    ctx.fillStyle = "#E6A26C";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("OFFICIAL PARTICIPANT", centerX, 610);

    ctx.fillStyle = "#FCFCFA";
    ctx.font = "bold 46px serif";
    ctx.fillText(nominee.name, centerX, 675);

    ctx.fillStyle = "rgba(252,252,250,0.75)";
    ctx.font = "600 22px sans-serif";
    ctx.fillText(nominee.categoryLabel.toUpperCase(), centerX, 725);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(60, 790, 600, 95);
    ctx.fillStyle = "#FCFCFA";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("KENYA CULTURE SHOOT CHALLENGE", centerX, 830);
    ctx.fillStyle = "#E6A26C";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("SUPPORT AT VENTUREKENYA.CO.KE", centerX, 862);

    const link = document.createElement("a");
    link.download = `${nominee.code}-${nominee.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const totalCostKES = Math.max(1, boostCount) * BOOST_PRICE_KES;

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNominee) return;
    if (boostCount < 1) return alert("Please select at least 1 boost.");

    if (paymentMethod === "card") {
      if (!email) return alert("Please enter your email address for receipt.");
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        alert("Paystack Public Key is missing in your environment variables.");
        return;
      }

      try {
        const paystackRef = `VK-${selectedNominee.code}-${Date.now()}`;
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email,
          amount: totalCostKES * 100,
          currency: "KES",
          ref: paystackRef,
          callback: async function (response: any) {
            await fetch("/api/votes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: response?.reference || paystackRef,
                nomineeCode: selectedNominee.code,
                email,
                amount: totalCostKES,
                votesPurchased: boostCount,
              }),
            });
            await fetchLiveVotes();
            setVoteConfirmed(true);
            setSupportSuccess(true);
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
    setVotesBeforePayment(liveSelectedNominee?.votes ?? selectedNominee.votes);
    setVoteConfirmed(false);
    setIsProcessing(true);

    try {
      const response = await fetch("/api/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: totalCostKES,
          reference: selectedNominee.code,
          votes: boostCount,
          description: `Support for ${selectedNominee.name} (${boostCount} boosts)`,
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        setSupportSuccess(true);
      } else {
        alert(
          resData.error ||
            "M-Pesa prompt failed to initialize. Please try again."
        );
      }
    } catch (error) {
      console.error("Support error:", error);
      alert("Error connecting to M-Pesa. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen w-full relative z-10 text-[#FCFCFA] bg-[#0F1611] pt-36 md:pt-40 pb-24 px-6 overflow-x-hidden">
      {/* Shared Background Image (Matches Voting.tsx) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/lions-bg.jpg')" }}
      >
        <img
          src="/lions-bg.jpg"
          alt="Venture Kenya Wildlife"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611]/90 via-transparent to-[#0F1611]/60" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* =============================================================== */}
        {/* VIEW 1: FOUR CHALLENGE CATEGORIES                               */}
        {/* =============================================================== */}
        {!activeCategory ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-8">
              <Link
                href="/#voting"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0F1611]/75 hover:bg-[#E6A26C] text-[#FCFCFA] hover:text-[#0F1611] border border-[#E6A26C]/45 text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md shadow-lg hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
            </div>

            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2.5 mb-3">
                <span className="w-6 h-[1.5px] bg-[#E6A26C]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E6A26C] drop-shadow">
                  KENYA CULTURE SHOOT CHALLENGE
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.4rem] font-bold text-[#FCFCFA] leading-[1.1] mb-3.5 drop-shadow-lg">
                Challenge Participants
              </h1>
              <p className="text-sm sm:text-base text-[#FCFCFA]/90 font-light leading-relaxed drop-shadow">
                Select a creative category below to explore the official Stage 1
                participants and mobilize your support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CHALLENGE_CATEGORIES.map((category, index) => (
                <motion.button
                  key={category.slug}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  onClick={() => handleSelectCategory(category.slug)}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#FAF6F0]/92 via-[#F5EFE6]/88 to-[#EBE1D2]/84 hover:from-white/95 hover:to-[#F6EFE4]/92 text-[#0F1611] backdrop-blur-2xl border border-[#E6A26C]/40 hover:border-[#E6A26C] ring-1 ring-inset ring-white/75 rounded-3xl p-7 sm:p-8 text-left transition-all duration-300 shadow-[0_20px_50px_rgba(15,22,17,0.4)] hover:shadow-[0_26px_60px_rgba(230,162,108,0.28)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <span className="pointer-events-none select-none absolute top-4 right-7 font-serif text-6xl sm:text-7xl font-bold text-[#0F1611]/[0.05] group-hover:text-[#9E5E28]/15 transition-colors">
                    0{index + 1}
                  </span>

                  <div className="pointer-events-none absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#E6A26C]/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F1611] border border-[#E6A26C]/50 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-[#E6A26C] transition-all">
                        {CATEGORY_ICONS[category.slug]}
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#E6A26C]/20 border border-[#E6A26C]/45 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6E4019]">
                        Category 0{index + 1}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1611] group-hover:text-[#6E4019] transition-colors mb-2.5 tracking-tight">
                      {category.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#1E2720]/80 font-normal leading-relaxed mb-7">
                      {category.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#0F1611]/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0F1611] group-hover:text-[#7D491E] transition-colors">
                      View Participants
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#0F1611] group-hover:bg-[#E6A26C] text-[#E6A26C] group-hover:text-[#0F1611] flex items-center justify-center transition-all shadow-sm group-hover:rotate-12">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* =============================================================== */
          /* VIEW 2: PARTICIPANTS IN SELECTED CATEGORY                       */
          /* =============================================================== */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <button
                type="button"
                onClick={handleBackToCategories}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0F1611]/75 hover:bg-[#E6A26C] text-[#FCFCFA] hover:text-[#0F1611] border border-[#E6A26C]/45 text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md shadow-lg hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Categories
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-7 border-b border-white/15">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-[1.5px] bg-[#E6A26C]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E6A26C] drop-shadow">
                    OFFICIAL KENYA CULTURE SHOOT PORTAL
                  </p>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FCFCFA] leading-tight drop-shadow-lg">
                  {activeCategory.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#FCFCFA]/90 font-light mt-1.5 drop-shadow">
                  Select a participant below to view their official card and
                  show your support
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#7D491E] absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name or code..."
                  className="w-full bg-[#FAF6F0]/92 focus:bg-white border border-[#E6A26C]/45 focus:border-[#E6A26C] ring-1 ring-inset ring-white/75 rounded-full py-3.5 pl-11 pr-4 text-xs font-medium text-[#0F1611] placeholder:text-[#0F1611]/45 focus:outline-none backdrop-blur-xl shadow-lg transition-all"
                />
              </div>
            </div>

            {categoryNominees.length === 0 ? (
              <div className="bg-[#FAF6F0]/92 backdrop-blur-2xl border border-[#E6A26C]/40 ring-1 ring-inset ring-white/75 rounded-3xl p-12 text-center text-[#0F1611] shadow-xl">
                <p className="text-sm text-[#0F1611]/80 mb-3">
                  No participants matched “{searchQuery}” in{" "}
                  {activeCategory.title}.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold uppercase tracking-widest text-[#7D491E] underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryNominees.map((nominee) => {
                  const initials = nominee.name
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <button
                      key={nominee.id}
                      type="button"
                      onClick={() => openNomineeModal(nominee)}
                      className="group relative flex items-center justify-between gap-4 bg-gradient-to-r from-[#FAF6F0]/92 via-[#F5EFE6]/88 to-[#EDE3D5]/85 hover:from-white/95 hover:to-[#F6EFE4]/95 backdrop-blur-2xl border border-[#E6A26C]/35 hover:border-[#E6A26C] ring-1 ring-inset ring-white/75 rounded-2xl p-4 sm:px-6 sm:py-5 text-left transition-all duration-200 shadow-[0_12px_30px_rgba(15,22,17,0.32)] hover:shadow-[0_18px_40px_rgba(230,162,108,0.25)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#B5723B] via-[#E6A26C] to-[#F7D7B5] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-[#0F1611] flex items-center justify-center">
                            <img
                              src={nominee.image}
                              alt={nominee.name}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const fallback = e.currentTarget
                                  .nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = "flex";
                              }}
                            />
                            <span className="hidden w-full h-full items-center justify-center font-serif text-base font-bold text-[#E6A26C]">
                              {initials}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F1611] group-hover:text-[#6E4019] transition-colors truncate">
                            {nominee.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                            <span className="px-2 py-0.5 rounded-md bg-[#0F1611]/[0.07] font-mono text-[11px] font-bold text-[#6E4019]">
                              #{nominee.code}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#E6A26C]/25 font-mono text-[11px] font-bold text-[#6E4019]">
                              {nominee.votes.toLocaleString()} boosts
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest text-[#7D491E] opacity-0 group-hover:opacity-100 transition-opacity">
                          Select
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#0F1611]/[0.08] group-hover:bg-[#0F1611] flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4 text-[#0F1611] group-hover:text-[#E6A26C]" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ================================================================= */}
      {/* SPLIT PARTICIPANT POSTER & STAGE 1 MOBILIZATION MODAL             */}
      {/* ================================================================= */}
      <AnimatePresence>
        {liveSelectedNominee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1611]/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#F9F6F0] text-[#0F1611] rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-12 border border-[#E6A26C]/35"
            >
              <button
                type="button"
                onClick={closeNomineeModal}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white hover:bg-[#F4EDE2] border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0F1611] transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT COLUMN: Official Participant Poster Card + Copy Link & Save */}
              <div className="md:col-span-5 bg-[#EFE8DC] p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#0F1611]/10">
                <div className="bg-[#0F1611] text-[#FCFCFA] rounded-2xl p-5 flex flex-col items-center text-center shadow-xl border border-[#E6A26C]/30 relative overflow-hidden">
                  <div className="w-full flex items-center justify-between mb-5">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-[10px] font-mono font-bold text-[#FCFCFA]">
                      #{liveSelectedNominee.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#E6A26C] text-[10px] font-bold uppercase tracking-wider text-[#0F1611]">
                      {liveSelectedNominee.votes.toLocaleString()} BOOSTS
                    </span>
                  </div>

                  <div className="relative w-28 h-28 rounded-full border-2 border-[#E6A26C] p-1 mb-4 bg-[#17211A]">
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#1c2820]">
                      <img
                        src={liveSelectedNominee.image}
                        alt={liveSelectedNominee.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <span className="hidden w-full h-full items-center justify-center font-serif text-2xl font-bold text-[#E6A26C]">
                        {liveSelectedNominee.name
                          .split(" ")
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E6A26C] mb-1">
                    OFFICIAL PARTICIPANT
                  </p>
                  <h4 className="font-serif text-xl font-bold text-[#FCFCFA] leading-snug mb-5">
                    {liveSelectedNominee.name}
                  </h4>

                  <div className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-2.5 px-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#FCFCFA]">
                      {liveSelectedNominee.categoryLabel}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#E6A26C] mt-0.5">
                      SUPPORT AT VENTUREKENYA.CO.KE
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => handleCopyNomineeLink(liveSelectedNominee)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/90 hover:bg-white border border-[#0F1611]/10 text-[10px] font-bold uppercase tracking-widest text-[#0F1611] transition-colors shadow-sm"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />{" "}
                        Copied
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#0F1611]" /> Copy
                        Link
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSavePoster(liveSelectedNominee)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/90 hover:bg-white border border-[#0F1611]/10 text-[10px] font-bold uppercase tracking-widest text-[#7D491E] transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Stage 1 Mobilization Payment Form */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                {supportSuccess ? (
                  <div className="text-center py-8">
                    {paymentMethod === "mpesa" && !voteConfirmed ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-amber-50 border border-[#E6A26C]/40 flex items-center justify-center mx-auto mb-4">
                          <Loader2 className="w-8 h-8 text-[#7D491E] animate-spin" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0F1611] mb-2">
                          Enter Your M-Pesa PIN
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto mb-6 leading-relaxed">
                          An M-Pesa prompt for KES{" "}
                          {totalCostKES.toLocaleString()} was sent to your
                          phone. Enter your PIN to confirm your vote for{" "}
                          <span className="font-semibold text-[#0F1611]">
                            {liveSelectedNominee.name}
                          </span>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={closeNomineeModal}
                          className="px-8 py-3 rounded-full bg-[#0F1611] text-[#FCFCFA] text-xs font-bold uppercase tracking-widest"
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0F1611] mb-2">
                          Thank You for Voting!
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto mb-6 leading-relaxed">
                          Thank you for voting for{" "}
                          <span className="font-semibold text-[#0F1611]">
                            {liveSelectedNominee.name}
                          </span>{" "}
                          for Venture Kenya! Your {boostCount}{" "}
                          {boostCount === 1 ? "vote has" : "votes have"} been
                          recorded.
                        </p>
                        <button
                          type="button"
                          onClick={closeNomineeModal}
                          className="px-8 py-3 rounded-full bg-[#0F1611] text-[#FCFCFA] text-xs font-bold uppercase tracking-widest"
                        >
                          Done
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1611]">
                        Stage 1 Mobilization
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Securely support {liveSelectedNominee.name}. (1 Boost =
                        KES {BOOST_PRICE_KES})
                      </p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Select Payment Method:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mpesa")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all ${
                            paymentMethod === "mpesa"
                              ? "border-emerald-500 bg-emerald-50/70 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          <Smartphone className="w-4 h-4" /> M-Pesa
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all ${
                            paymentMethod === "card"
                              ? "border-[#0F1611] bg-[#0F1611] text-[#FCFCFA]"
                              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" /> Card
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Select Support Bundle:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {BOOST_BUNDLES.map((bundle) => (
                          <button
                            key={bundle}
                            type="button"
                            onClick={() => setBoostCount(bundle)}
                            className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                              boostCount === bundle
                                ? "border-[#E6A26C] bg-[#E6A26C] text-[#0F1611] shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            +{bundle}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-[#EFE8DC]/70 border border-[#0F1611]/10 rounded-xl px-4 py-2.5">
                      <span className="text-xs font-medium text-slate-700">
                        Custom Amount:
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setBoostCount((prev) => Math.max(1, prev - 1))
                          }
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={boostCount}
                          onChange={(e) =>
                            setBoostCount(
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          className="w-14 text-center bg-transparent font-mono font-bold text-sm text-[#0F1611] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setBoostCount((prev) => prev + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {paymentMethod === "mpesa" ? (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          M-Pesa Phone Number:
                        </label>
                        <div className="relative">
                          <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            placeholder="0712345678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-10 pr-4 text-sm text-[#0F1611] focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Email Address for Receipt:
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-[#0F1611] rounded-xl py-3 px-4 text-sm text-[#0F1611] focus:outline-none"
                          required
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-xs font-medium text-slate-500">
                        Total Cost:
                      </span>
                      <span className="font-serif text-xl font-bold text-[#7D491E]">
                        KES {totalCostKES.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                        paymentMethod === "mpesa"
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                          : "bg-[#0F1611] hover:bg-slate-800 text-[#FCFCFA]"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending
                          M-Pesa Prompt...
                        </>
                      ) : paymentMethod === "mpesa" ? (
                        <>
                          <Smartphone className="w-4 h-4" /> PAY KES{" "}
                          {totalCostKES.toLocaleString()} VIA M-PESA
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" /> PAY KES{" "}
                          {totalCostKES.toLocaleString()} VIA CARD
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