import Navbar from "@/components/Navbar";
import Voting from "@/components/Voting";
import Footer from "@/components/Footer";

export default function VotingPage() {
  return (
    <main className="relative min-h-screen bg-[#0F1611] font-sans text-[#FCFCFA] overflow-hidden selection:bg-[#E6A26C]/30 flex flex-col">
      <Navbar />
      <Voting />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}