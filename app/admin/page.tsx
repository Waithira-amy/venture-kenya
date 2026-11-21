"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  RefreshCw,
  Search,
  Download,
  Trophy,
  Banknote,
  Receipt,
  Users,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  CHALLENGE_CATEGORIES,
  NOMINEES,
  CategorySlug,
} from "../../data/nominees";

interface TransactionRow {
  id: string;
  mpesa_receipt_number: string;
  checkout_request_id: string | null;
  nominee_code: string;
  phone_number: string;
  amount: number;
  votes_purchased: number;
  created_at: string;
}

interface DashboardSummary {
  totalRevenue: number;
  totalPaidVotes: number;
  totalTransactions: number;
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [voteMap, setVoteMap] = useState<
    Record<string, { votes: number; updatedAt: string }>
  >({});
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalRevenue: 0,
    totalPaidVotes: 0,
    totalTransactions: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setVoteMap(data.voteMap || {});
        setTransactions(data.transactions || []);
        setSummary(
          data.summary || {
            totalRevenue: 0,
            totalPaidVotes: 0,
            totalTransactions: 0,
          }
        );
      }
    } catch (err) {
      console.error("Error loading admin dashboard:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const leaderboard = useMemo(() => {
    return NOMINEES.map((nominee) => {
      const dbEntry = voteMap[nominee.code];
      const verifiedVotes = dbEntry?.votes || 0;
      const totalVotes = nominee.votes + verifiedVotes;

      return {
        ...nominee,
        baseVotes: nominee.votes,
        verifiedVotes,
        totalVotes,
        updatedAt: dbEntry?.updatedAt || null,
      };
    })
      .filter((n) =>
        selectedCategory === "all" ? true : n.category === selectedCategory
      )
      .filter((n) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          n.name.toLowerCase().includes(q) ||
          n.code.toLowerCase().includes(q) ||
          n.categoryLabel.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.totalVotes - a.totalVotes);
  }, [voteMap, selectedCategory, searchQuery]);

  const overallTotalVotes = useMemo(() => {
    return NOMINEES.reduce(
      (acc, n) => acc + n.votes + (voteMap[n.code]?.votes || 0),
      0
    );
  }, [voteMap]);

  const leader = leaderboard[0] || null;

  const handleExportCsv = () => {
    const headers = [
      "Rank",
      "Code",
      "Nominee Name",
      "Category",
      "Base Votes",
      "Verified DB Votes",
      "Total Votes",
      "Last Vote At",
    ];
    const rows = leaderboard.map((n, idx) => [
      idx + 1,
      n.code,
      `"${n.name.replace(/"/g, '""')}"`,
      `"${n.categoryLabel}"`,
      n.baseVotes,
      n.verifiedVotes,
      n.totalVotes,
      n.updatedAt ? new Date(n.updatedAt).toISOString() : "—",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `kcsc-leaderboard-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-[#E6A26C]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0F1611] text-[#FCFCFA] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <Link
              href="/participants"
              className="inline-flex items-center gap-1.5 text-xs text-[#E6A26C] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Participants Portal
            </Link>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E6A26C] mb-1">
              KENYA CULTURE SHOOT CHALLENGE
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FCFCFA]">
              Admin Vote Leaderboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={loadDashboard}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FCFCFA] transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E6A26C] hover:bg-amber-200 text-[#0F1611] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Total Votes
              </span>
              <Users className="w-4 h-4" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">
              {overallTotalVotes.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1">
              Includes {summary.totalPaidVotes.toLocaleString()} verified DB votes
            </p>
          </div>

          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Verified Revenue
              </span>
              <Banknote className="w-4 h-4" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#E6A26C]">
              KES {summary.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1">
              KSh 10 per verified boost
            </p>
          </div>

          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Confirmed Receipts
              </span>
              <Receipt className="w-4 h-4" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">
              {summary.totalTransactions.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1">
              M-Pesa & Paystack transactions
            </p>
          </div>

          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Current Leader
              </span>
              <Trophy className="w-4 h-4" />
            </div>
            <p className="font-serif text-xl font-bold text-white truncate">
              {leader ? leader.name : "—"}
            </p>
            <p className="text-xs text-[#E6A26C] mt-1">
              {leader
                ? `#${leader.code} • ${leader.totalVotes.toLocaleString()} votes`
                : "No votes recorded"}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#E6A26C] text-[#0F1611]"
                  : "bg-white/5 text-white/75 hover:bg-white/10 border border-white/10"
              }`}
            >
              All ({NOMINEES.length})
            </button>
            {CHALLENGE_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-[#E6A26C] text-[#0F1611]"
                    : "bg-white/5 text-white/75 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name or code..."
              className="w-full bg-[#161F18] border border-white/15 focus:border-[#E6A26C] rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Nominee Votes Table */}
        <div className="bg-[#161F18] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/20 text-[10px] font-bold uppercase tracking-widest text-white/60">
                  <th className="py-4 px-5">Rank</th>
                  <th className="py-4 px-5">Participant</th>
                  <th className="py-4 px-5">Code</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5 text-right">Verified Votes</th>
                  <th className="py-4 px-5 text-right">Total Votes</th>
                  <th className="py-4 px-5 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {leaderboard.map((nominee, idx) => (
                  <tr
                    key={nominee.id}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-3.5 px-5 font-mono font-bold text-[#E6A26C]">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-white">
                      {nominee.name}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-xs text-white/75">
                      {nominee.code}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-white/70">
                      {nominee.categoryLabel}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono text-emerald-400 font-semibold">
                      +{nominee.verifiedVotes.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono font-bold text-white">
                      {nominee.totalVotes.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-right text-xs text-white/50">
                      {nominee.updatedAt
                        ? new Date(nominee.updatedAt).toLocaleString("en-KE", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Verified Transactions */}
        <div className="bg-[#161F18] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-white">
              Recent Verified Transactions (Latest 50)
            </h2>
          </div>

          {transactions.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/50">
              No verified payments recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/20 text-[10px] font-bold uppercase tracking-widest text-white/60">
                    <th className="py-3.5 px-5">Receipt / Ref</th>
                    <th className="py-3.5 px-5">Nominee</th>
                    <th className="py-3.5 px-5">Supporter</th>
                    <th className="py-3.5 px-5 text-right">Votes</th>
                    <th className="py-3.5 px-5 text-right">Amount</th>
                    <th className="py-3.5 px-5 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.03]">
                      <td className="py-3 px-5 font-mono font-semibold text-[#E6A26C]">
                        {tx.mpesa_receipt_number}
                      </td>
                      <td className="py-3 px-5 font-mono text-white">
                        {tx.nominee_code}
                      </td>
                      <td className="py-3 px-5 text-white/75">
                        {tx.phone_number}
                      </td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-emerald-400">
                        +{tx.votes_purchased}
                      </td>
                      <td className="py-3 px-5 text-right font-mono text-white">
                        KES {tx.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-5 text-right text-white/50">
                        {new Date(tx.created_at).toLocaleString("en-KE", {
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