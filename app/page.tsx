import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MeetTheTeam from "@/components/MeetTheTeam";
import CultureShoot from "@/components/CultureShoot";
import Voting from "@/components/Voting";
import Footer from "@/components/Footer";

export default function VentureKenyaPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFCFA] font-sans text-[#0F1611] overflow-x-hidden selection:bg-[#E6A26C]/30">
      <Navbar />
      <Hero />
      <About />
      
      {/* Wrapped in an ID so the Navbar can smoothly scroll here */}
      <div id="team">
        <MeetTheTeam />
      </div>
      
      <CultureShoot />
      <Voting />
      <Footer />
    </main>
  );
}