"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Trophy,
  Users,
  HeartHandshake,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Loader2,
  Search,
  Download,
} from "lucide-react";
import Link from "next/link";

interface NomineeProfile {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  baseVotes: number;
  verifiedVotes: number;
  totalVotes: number;
}

interface NomineeStanding {
  position: number;
  totalInCategory: number;
  leaderVotes: number;
  votesBehindLeader: number;
}

interface VoterRecord {
  id: string;
  receipt: string;
  method: "M-Pesa" | "Card";
  supporter: string;
  votes: number;
  amount: number;
  createdAt: string;
}

const STORAGE_KEY = "vk_nominee_portal_code";

export default function NomineePortalPage() {
  const [codeInput, setCodeInput] = useState("");
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [nominee, setNominee] = useState<NomineeProfile | null>(null);
  const [standing, setStanding] = useState<NomineeStanding | null>(null);
  const [voters, setVoters] = useState<VoterRecord[]>([]);
  const [voterSearch, setVoterSearch] = useState("");

  const fetchNomineeData = useCallback(async (codeToLoad: string) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `/api/nominee/portal?code=${encodeURIComponent(codeToLoad)}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Invalid participant code.");
        localStorage.removeItem(STORAGE_KEY);
        setActiveCode(null);
        setNominee(null);
        return;
      }

      setNominee(data.nominee);
      setStanding(data.standing);
      setVoters(data.voters || []);
      setActiveCode(data.nominee.code);
      localStorage.setItem(STORAGE_KEY, data.nominee.code);
    } catch (err) {
      console.error("Nominee portal error:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      fetchNomineeData(savedCode);
    } else {
      setIsLoading(false);
    }
  }, [fetchNomineeData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    await fetchNomineeData(codeInput);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveCode(null);
    setNominee(null);
    setStanding(null);
    setVoters([]);
    setCodeInput("");
    setErrorMsg("");
  };

  const filteredVoters = voters.filter((v) => {
    if (!voterSearch.trim()) return true;
    const q = voterSearch.toLowerCase();
    return (
      v.supporter.toLowerCase().includes(q) ||
      v.receipt.toLowerCase().includes(q) ||
      v.method.toLowerCase().includes(q)
    );
  });

  const handleExportVotersCsv = () => {
    if (!nominee) return;
    const headers = [
      "Receipt / Ref",
      "Payment Method",
      "Supporter",
      "Votes Cast",
      "Date & Time",
    ];
    const rows = filteredVoters.map((v) => [
      v.receipt,
      v.method,
      `"${v.supporter.replace(/"/g, '""')}"`,
      v.votes,
      new Date(v.createdAt).toISOString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${nominee.code}-supporters.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-[#E6A26C]" />
      </main>
    );
  }

  /* ======================================================================= */
  /* LOGIN VIEW: CENTERED CARD (JURON PORTAL LAYOUT)                         */
  /* ======================================================================= */
  if (!activeCode || !nominee || !standing) {
    return (
      <main className="min-h-screen bg-[#0F1611] flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/lions-bg.jpg')" }}
        >
          <img
            src="/lions-bg.jpg"
            alt="Venture Kenya Wildlife"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611]/90 via-transparent to-[#0F1611]/65" />
        </div>

        {/* Centered Nominee Portal Card */}
        <div className="relative z-10 w-full max-w-md bg-[#FAF6F0]/95 backdrop-blur-2xl border border-[#E6A26C]/45 ring-1 ring-inset ring-white/80 rounded-3xl p-8 sm:p-10 shadow-[0_24px_60px_rgba(15,22,17,0.55)] text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#E6A26C]/20 border border-[#E6A26C]/45 flex items-center justify-center text-[#7D491E] mx-auto mb-5 shadow-sm">
            <User className="w-5 h-5" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#0F1611] mb-2">
            Nominee Portal
          </h1>
          <p className="text-xs text-[#1E2720]/70 max-w-xs mx-auto mb-7 leading-relaxed">
            Enter your official code to view your live stats, category
            position, and supporters.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="E.G. VK-MA-061"
                required
                className="w-full bg-[#EFE8DC]/80 focus:bg-white border border-[#0F1611]/15 focus:border-[#E6A26C] rounded-xl px-4 py-3.5 text-center font-mono text-sm font-bold uppercase tracking-widest text-[#0F1611] placeholder:text-[#0F1611]/35 focus:outline-none transition-all"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#0F1611] hover:bg-[#1B261E] text-[#FCFCFA] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Checking Code...
                </>
              ) : (
                "ACCESS DASHBOARD"
              )}
            </button>
          </form>

          <div className="mt-6 pt-2">
            <Link
              href="/participants"
              className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1E2720]/55 hover:text-[#0F1611] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> BACK TO PARTICIPANTS
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ======================================================================= */
  /* AUTHENTICATED NOMINEE DASHBOARD                                         */
  /* ======================================================================= */
  return (
    <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Shared Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/lions-bg.jpg')" }}
      >
        <img
          src="/lions-bg.jpg"
          alt="Venture Kenya Wildlife"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1611] via-[#0F1611]/70 to-[#0F1611]/70" />
      </div>

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        {/* Top Profile Header */}
        <div className="bg-[#FAF6F0]/95 text-[#0F1611] backdrop-blur-2xl border border-[#E6A26C]/45 ring-1 ring-inset ring-white/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#E6A26C] overflow-hidden bg-[#0F1611] flex items-center justify-center shrink-0 shadow-md">
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
              <span className="hidden w-full h-full items-center justify-center font-serif text-xl font-bold text-[#E6A26C]">
                {nominee.name
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0F1611] text-[#E6A26C] font-mono text-xs font-bold">
                  #{nominee.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6A26C]/25 border border-[#E6A26C]/45 text-[10px] font-bold uppercase tracking-wider text-[#6E4019]">
                  {nominee.categoryLabel}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#0F1611]">
                {nominee.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchNomineeData(nominee.code)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F1611] hover:bg-[#1E2B22] text-[#FCFCFA] text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#E6A26C] ${
                  isSubmitting ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-rose-50 border border-[#0F1611]/15 text-rose-700 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* 3 Nominee KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Current Votes */}
          <div className="bg-[#FAF6F0]/95 text-[#0F1611] backdrop-blur-2xl border border-[#E6A26C]/40 ring-1 ring-inset ring-white/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between text-[#7D491E] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E2720]/60">
                Your Current Votes
              </span>
              <Users className="w-4 h-4" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#0F1611]">
              {nominee.totalVotes.toLocaleString()}
            </p>
            <p className="text-xs text-[#1E2720]/65 mt-1.5">
              {nominee.verifiedVotes.toLocaleString()} verified supporter votes
            </p>
          </div>

          {/* Card 2: Current Position in Category */}
          <div className="bg-[#0F1611]/95 text-[#FCFCFA] backdrop-blur-2xl border border-[#E6A26C]/45 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Category Position
              </span>
              <Trophy className="w-4 h-4" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#E6A26C]">
              #{standing.position}{" "}
              <span className="text-base font-sans font-normal text-white/55">
                of {standing.totalInCategory}
              </span>
            </p>
            <p className="text-xs text-white/65 mt-1.5">
              {standing.position === 1
                ? "Currently leading your category!"
                : `${standing.votesBehindLeader.toLocaleString()} votes behind #1`}
            </p>
          </div>

          {/* Card 3: Supporter Contributions */}
          <div className="bg-[#FAF6F0]/95 text-[#0F1611] backdrop-blur-2xl border border-[#E6A26C]/40 ring-1 ring-inset ring-white/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between text-[#7D491E] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E2720]/60">
                Supporter Boosts
              </span>
              <HeartHandshake className="w-4 h-4" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#0F1611]">
              {voters.length.toLocaleString()}
            </p>
            <p className="text-xs text-[#1E2720]/65 mt-1.5">
              Verified vote transactions
            </p>
          </div>
        </div>

        {/* Who Voted For You Table */}
        <div className="bg-[#FAF6F0]/95 text-[#0F1611] backdrop-blur-2xl border border-[#E6A26C]/40 ring-1 ring-inset ring-white/80 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-[#0F1611]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0F1611]">
                Supporters Who Voted For You
              </h2>
              <p className="text-xs text-[#1E2720]/65 mt-0.5">
                Verified M-Pesa and Card votes cast for #{nominee.code}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-[#7D491E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={voterSearch}
                  onChange={(e) => setVoterSearch(e.target.value)}
                  placeholder="Search phone or receipt..."
                  className="w-full bg-white border border-[#0F1611]/15 focus:border-[#E6A26C] rounded-full py-2 pl-9 pr-4 text-xs text-[#0F1611] placeholder:text-[#0F1611]/40 focus:outline-none"
                />
              </div>

              {voters.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportVotersCsv}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F1611] hover:bg-[#1E2B22] text-xs font-bold uppercase tracking-wider text-[#FCFCFA] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#E6A26C]" /> CSV
                </button>
              )}
            </div>
          </div>

          {filteredVoters.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm font-medium text-[#0F1611]/75 mb-1">
                {voters.length === 0
                  ? "No verified votes recorded for your code yet."
                  : `No supporters matched “${voterSearch}”.`}
              </p>
              <p className="text-xs text-[#1E2720]/55">
                Share your official participant poster from{" "}
                <Link
                  href="/participants"
                  className="text-[#7D491E] font-bold underline"
                >
                  venturekenya.co.ke/participants
                </Link>{" "}
                to mobilize votes.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#0F1611]/10 bg-[#EFE8DC]/70 text-[10px] font-bold uppercase tracking-widest text-[#1E2720]/65">
                    <th className="py-3.5 px-5">Supporter (Phone / Email)</th>
                    <th className="py-3.5 px-5">Method</th>
                    <th className="py-3.5 px-5">Receipt / Ref</th>
                    <th className="py-3.5 px-5 text-right">Votes Cast</th>
                    <th className="py-3.5 px-5 text-right">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F1611]/10 text-xs sm:text-sm">
                  {filteredVoters.map((voter) => (
                    <tr
                      key={voter.id}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#0F1611]">
                        {voter.supporter}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            voter.method === "M-Pesa"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-900 border border-amber-300"
                          }`}
                        >
                          {voter.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-xs font-bold text-[#7D491E]">
                        {voter.receipt}
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-emerald-700">
                        +{voter.votes.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-5 text-right text-xs text-[#1E2720]/60">
                        {new Date(voter.createdAt).toLocaleString("en-KE", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}