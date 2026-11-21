"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  RefreshCw,
  Search,
  Download,
  Trophy,
  Banknote,
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

interface DashboardSummary {
  totalRevenue: number;
  totalPaidVotes: number;
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [voteMap, setVoteMap] = useState<
    Record<string, { votes: number; updatedAt: string }>
  >({});
  const [summary, setSummary] = useState<DashboardSummary>({
    totalRevenue: 0,
    totalPaidVotes: 0,
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
        setSummary(
          data.summary || {
            totalRevenue: 0,
            totalPaidVotes: 0,
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

  // Build independent ranked leaderboards for each of the 4 categories
  const categorizedLeaderboards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CHALLENGE_CATEGORIES.filter((cat) =>
      selectedCategory === "all" ? true : cat.slug === selectedCategory
    ).map((category) => {
      const rankedAll = NOMINEES.filter((n) => n.category === category.slug)
        .map((nominee) => {
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
        .sort((a, b) => b.totalVotes - a.totalVotes)
        .map((nominee, idx) => ({
          ...nominee,
          categoryRank: idx + 1,
        }));

      const filteredNominees = q
        ? rankedAll.filter(
            (n) =>
              n.name.toLowerCase().includes(q) ||
              n.code.toLowerCase().includes(q)
          )
        : rankedAll;

      const categoryTotalVotes = rankedAll.reduce(
        (sum, n) => sum + n.totalVotes,
        0
      );

      return {
        category,
        leader: rankedAll[0] || null,
        categoryTotalVotes,
        totalCount: rankedAll.length,
        nominees: filteredNominees,
      };
    });
  }, [voteMap, selectedCategory, searchQuery]);

  const currentVotes = useMemo(() => {
    return NOMINEES.reduce(
      (acc, n) => acc + n.votes + (voteMap[n.code]?.votes || 0),
      0
    );
  }, [voteMap]);

  const handleExportCsv = () => {
    const headers = [
      "Category",
      "Category Rank",
      "Code",
      "Nominee Name",
      "Verified DB Votes",
      "Total Votes",
      "Last Updated",
    ];

    const rows = categorizedLeaderboards.flatMap((group) =>
      group.nominees.map((n) => [
        `"${group.category.title}"`,
        n.categoryRank,
        n.code,
        `"${n.name.replace(/"/g, '""')}"`,
        n.verifiedVotes,
        n.totalVotes,
        n.updatedAt ? new Date(n.updatedAt).toISOString() : "—",
      ])
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `kcsc-category-leaderboards-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
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

        {/* Top 2 KPI Summary Cards: Current Votes & Current Revenue Generated */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                Current Votes
              </span>
              <Users className="w-5 h-5" />
            </div>
            <p className="font-serif text-4xl font-bold text-white">
              {currentVotes.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1.5">
              Across all 4 challenge categories ({summary.totalPaidVotes.toLocaleString()} verified DB votes)
            </p>
          </div>

          <div className="bg-[#161F18] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between text-[#E6A26C] mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                Current Revenue Generated
              </span>
              <Banknote className="w-5 h-5" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#E6A26C]">
              KES {summary.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1.5">
              KSh 10 per verified vote
            </p>
          </div>
        </div>

        {/* Category Filter Tabs & Search Bar */}
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
              All 4 Categories
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

        {/* Four Separate Category Leaderboards */}
        <div className="space-y-8">
          {categorizedLeaderboards.map(
            ({ category, leader, categoryTotalVotes, totalCount, nominees }) => (
              <section
                key={category.slug}
                className="bg-[#161F18] border border-white/10 rounded-3xl overflow-hidden shadow-xl"
              >
                {/* Category Section Header */}
                <div className="px-6 py-5 border-b border-white/10 bg-black/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-serif text-2xl font-bold text-[#FCFCFA]">
                        {category.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-white/75">
                        {totalCount} Nominees
                      </span>
                    </div>
                    <p className="text-xs text-white/55 mt-0.5">
                      Category Total: {categoryTotalVotes.toLocaleString()} votes
                    </p>
                  </div>

                  {leader && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#E6A26C]/15 border border-[#E6A26C]/35 text-xs">
                      <Trophy className="w-4 h-4 text-[#E6A26C] shrink-0" />
                      <span className="text-white/75">Leader:</span>
                      <span className="font-bold text-[#FCFCFA]">
                        {leader.name}
                      </span>
                      <span className="font-mono text-[#E6A26C] font-bold">
                        ({leader.totalVotes.toLocaleString()})
                      </span>
                    </div>
                  )}
                </div>

                {/* Category Table */}
                {nominees.length === 0 ? (
                  <div className="p-8 text-center text-xs text-white/50">
                    No participants matched “{searchQuery}” in {category.title}.
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 z-10 bg-[#111813]">
                        <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
                          <th className="py-3.5 px-5">Rank</th>
                          <th className="py-3.5 px-5">Participant</th>
                          <th className="py-3.5 px-5">Code</th>
                          <th className="py-3.5 px-5 text-right">
                            Verified Votes
                          </th>
                          <th className="py-3.5 px-5 text-right">Total Votes</th>
                          <th className="py-3.5 px-5 text-right">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {nominees.map((nominee) => (
                          <tr
                            key={nominee.id}
                            className="hover:bg-white/[0.03] transition-colors"
                          >
                            <td className="py-3.5 px-5 font-mono font-bold text-[#E6A26C]">
                              #{nominee.categoryRank}
                            </td>
                            <td className="py-3.5 px-5 font-medium text-white">
                              {nominee.name}
                            </td>
                            <td className="py-3.5 px-5 font-mono text-xs text-white/75">
                              {nominee.code}
                            </td>
                            <td className="py-3.5 px-5 text-right font-mono text-emerald-400 font-semibold">
                              +{nominee.verifiedVotes.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-5 text-right font-mono font-bold text-white">
                              {nominee.totalVotes.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-5 text-right text-xs text-white/50">
                              {nominee.updatedAt
                                ? new Date(nominee.updatedAt).toLocaleString(
                                    "en-KE",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )
          )}
        </div>
      </div>
    </main>
  );
}