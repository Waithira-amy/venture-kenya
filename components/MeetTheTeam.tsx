"use client";
import React from "react";
import { User, Mail } from "lucide-react";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Mr. Ken Auma",
    role: "Co-founder & Chief Brand Ambassador (Local Affairs) Director",
    image: "/team/ken.jpg", 
  },
  {
    id: 2,
    name: "Mr. Michael (Mzungu Kanairo)",
    role: "Co-founder & Chief Brand Ambassador (International Affairs) Director",
    image: "/team/michael.jpg",
  },
  {
    id: 3,
    name: "Masco",
    role: "Lead Coordinator",
    image: "/team/masco.jpg",
  },
  {
    id: 4,
    name: "Miss Njoki M. Muchiri",
    role: "Secretary & Assistant Coordinator (KCSC)",
    image: "/team/njoki.jpg",
  },
  {
    id: 5,
    name: "Mr. Peejay",
    role: "Lead Choreographer (KCSC)",
    image: "/team/peejay.jpg",
  }
];

export default function MeetTheTeam() {
  return (
    <section className="py-24 relative bg-[#121212] px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block text-[#df9a74] text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-[#df9a74]/10 border border-[#df9a74]/20 px-4 py-1.5 rounded-full">
            The Visionaries
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-tight">
            Meet The <span className="text-[#df9a74]">Team</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            The passionate minds driving Venture Kenya. Dedicated to showcasing Kenya's cultural diversity, historical landmarks, and creative talent to the world.
          </p>
        </div>

        {/* Flex Layout for perfectly centered wrapping */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-12">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="flex flex-col items-center group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)] max-w-[320px]">
              
              {/* Avatar Box */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden border-2 border-[#df9a74]/20 bg-[#1a1a1a] shadow-lg group-hover:border-[#df9a74]/60 transition-colors duration-500">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 w-full h-full items-center justify-center bg-[#1a1a1a]">
                  <User className="w-16 h-16 text-slate-600" strokeWidth={1} />
                </div>
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#df9a74] hover:text-black text-white flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Details */}
              <div className="text-center px-4 w-full">
                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#df9a74] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#df9a74] font-semibold mb-2 leading-relaxed">
                  {member.role}
                </p>
                <div className="w-8 h-px bg-slate-700 mx-auto mt-4 group-hover:bg-[#df9a74]/50 transition-colors" />
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}