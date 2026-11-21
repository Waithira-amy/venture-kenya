import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documents | Venture Kenya",
  description:
    "Download official Kenya Culture Shoot Challenge (KCSC) rules, concept notes, affiliate agreements, and judging rubrics.",
};

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  fileType: string;
  pages: string;
  fileUrl: string;
  downloadName: string;
}

const DOCUMENTS: DocumentItem[] = [
  {
    id: 1,
    title: "KCSC Multi-Category Series Blueprint & Judging Rubrics",
    description:
      "Complete framework covering the four competitive creative tracks (Models & Actors, Photographers & Videographers, MUAs, Fashion Designers), 20% affiliate commissions, and 100-point track rubrics.",
    fileType: "PDF",
    pages: "6 Pages",
    fileUrl: "/documents/KCSC_Multi_Category_Blueprint_and_Rubrics.pdf",
    downloadName: "KCSC-Multi-Category-Blueprint-and-Rubrics.pdf",
  },
  {
    id: 2,
    title: "Official Contestant Rules & Terms of Participation",
    description:
      "Effective November 2026 rules governing eligibility (18+), Stage 1 to Top 22, Stage 2 Big Five Adventure to Top 8 Finalists, Wildcard & Golden Tickets, KSh 100,000 grant terms, and ODPC compliance.",
    fileType: "PDF",
    pages: "3 Pages",
    fileUrl: "/documents/KCSC_Official_Contestant_Rules_and_Terms.pdf",
    downloadName: "KCSC-Official-Contestant-Rules-and-Terms.pdf",
  },
  {
    id: 3,
    title: "Creator Affiliate Agreement & Creative Judging Rubric",
    description:
      "Creator Affiliate & Challenge Participation Agreement detailing 20% referral commissions on Digital Art Packs and Finale Tickets, KRA withholding tax rules, and the Blind Scoring Protocol.",
    fileType: "PDF",
    pages: "3 Pages",
    fileUrl: "/documents/Kenya_Culture_Shoot_Challenge_Agreement_and_Rubric.pdf",
    downloadName: "Kenya-Culture-Shoot-Challenge-Agreement-and-Rubric.pdf",
  },
  {
    id: 4,
    title: "Kenya Culture Shoot Challenge Concept Note",
    description:
      "Program overview outlining the four creative disciplines, Stage 1–3 progression, Big Five team identities, Unified Creative Teams, and the KSh 100,000 championship prize.",
    fileType: "PDF",
    pages: "2 Pages",
    fileUrl: "/documents/Kenya_Culture_Shoot_Challenge_2026_Concept_Note.pdf",
    downloadName: "Kenya-Culture-Shoot-Challenge-Concept-Note.pdf",
  },
];

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E5B88B] hover:text-amber-200 transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="w-10 h-0.5 bg-[#E5B88B] mb-5" />
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Official <span className="italic text-[#E5B88B]">Documents.</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            View and download official Kenya Culture Shoot Challenge (KCSC) rules,
            concept notes, creator affiliate agreements, and judging rubrics.
          </p>
        </div>

        {/* 4 Downloadable Document Cards */}
        <div className="space-y-4">
          {DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-2xl bg-[#161813]/90 border border-white/10 hover:border-[#E5B88B]/40 p-5 sm:p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                {/* Document Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#E5B88B]/10 border border-[#E5B88B]/25 flex items-center justify-center shrink-0 text-[#E5B88B]">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h4" />
                  </svg>
                </div>

                {/* Title & Meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-[#E5B88B] transition-colors">
                      {doc.title}
                    </h2>
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10">
                      {doc.fileType} • {doc.pages}
                    </span>
                  </div>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider border border-white/15 text-stone-200 hover:bg-white/10 transition-colors"
                >
                  View
                </a>
                <a
                  href={doc.fileUrl}
                  download={doc.downloadName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E5B88B] text-stone-950 hover:bg-amber-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}