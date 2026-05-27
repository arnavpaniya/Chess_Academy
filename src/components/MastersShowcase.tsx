import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MasterProfile {
  id: string;
  name: string;
  role: string;
  credentials: string;
  avatarIcon: string; // large luxurious unicode piece
  avatarColor: string; // gold or silver theme
  bio: string;
  achievements: string[];
  peakElo: string;
}

const MASTER_COACHES: MasterProfile[] = [
  {
    id: "shivika",
    name: "Shivika Rohilla",
    role: "Chief Mentor & Founder",
    credentials: "FIDE Rated Champion",
    avatarIcon: "♕",
    avatarColor: "from-gold/30 to-gold/5",
    bio: "A FIDE-rated champion and a leading force in modern chess pedagogy. Shivika designed the Academy's core strategic syllabus, molding multiple tournament winners and state prodigies.",
    achievements: [
      "FIDE Rated Championship Pedigree",
      "10+ Years of Masterclasses",
      "Guided 1,200+ students from 15+ countries",
      "Trained 5+ State Junior Champions"
    ],
    peakElo: "2150"
  },
  {
    id: "vikram",
    name: "GM Vikramaditya",
    role: "Senior Tactical Consultant",
    credentials: "International Grandmaster",
    avatarIcon: "♔",
    avatarColor: "from-white/20 to-white/2",
    bio: "Endgame veteran and Commonwealth Medalist. Vikramaditya structures our masterclass seminars, focusing on deep tactical calculation, positional squeeze, and high-stakes performance.",
    achievements: [
      "Peak FIDE Elo Rating: 2580",
      "Sivakasi Chess Open Silver Medalist",
      "Successfully coached 3 active FIDE IMs",
      "Commonwealth Chess Championship Alum"
    ],
    peakElo: "2580"
  },
  {
    id: "devendra",
    name: "FM Devendra Kumaar",
    role: "Head of Opening Theory",
    credentials: "FIDE Master & Theorist",
    avatarIcon: "♘",
    avatarColor: "from-gold/30 to-white/5",
    bio: "Index extraordinaire of positional theory. Devendra has cataloged over 1,500 grandmaster lines, assisting advanced players in engineering an unbreakable opening repertoire.",
    achievements: [
      "FIDE Master Title (Granted 2014)",
      "Former National Under-19 Champion",
      "Spars regularly with International GMs",
      "Published author on Catalyst Openings"
    ],
    peakElo: "2340"
  }
];

export default function MastersShowcase() {
  const [activeTab, setActiveTab] = useState<string>("shivika");

  const currentMaster = MASTER_COACHES.find((m) => m.id === activeTab) || MASTER_COACHES[0];

  return (
    <section id="coaches" className="relative py-28 px-6 md:px-16 lg:px-20 bg-transparent text-white overflow-hidden">
      {/* Background Decorative atmosphere layer */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-transparent pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div>
            <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block mb-4">
              // Elite Grandmasters
            </span>
            <h2 className="font-heading italic text-white text-5xl md:text-7xl leading-[0.9] tracking-[-3px]">
              Masters
              <br />
              Showcase
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-sm font-body font-light leading-relaxed">
            Every session is direct. You learn alongside highly ranked active competitors, FIDE rated veterans, and certified theoreticians.
          </p>
        </div>

        {/* Master's Selector Grid with Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Nav Selection Rail (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {MASTER_COACHES.map((master) => {
              const isActive = master.id === activeTab;
              return (
                <button
                  key={master.id}
                  onClick={() => setActiveTab(master.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "liquid-glass border-gold/45 shadow-lg shadow-gold/5"
                      : "bg-white/1 border-white/5 hover:bg-white/3 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Tiny initial icon circle */}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${master.avatarColor} border border-white/10 flex items-center justify-center text-xl text-white`}
                    >
                      {master.avatarIcon}
                    </div>
                    <div>
                      <h4 className="font-heading italic text-xl text-white leading-none group-hover:text-gold transition-colors">
                        {master.name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1 font-body">
                        {master.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Small pointer ELO Tag */}
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold bg-white/5 group-hover:bg-gold/10 px-2.5 py-1 rounded-md text-gold ring-1 ring-gold/25">
                      {master.peakElo} ELO
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Extra assurance banner */}
            <div className="liquid-glass rounded-2xl p-5 border border-white/5 text-left mt-4">
              <span className="text-xs text-gold font-semibold uppercase tracking-wider block mb-1">
                Guaranteed Quality
              </span>
              <p className="text-xs text-white/50 font-body font-light leading-snug">
                We believe in genuine ratings. Our coaches hold authentic FIDE profiles available for public lookup.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Animated Showcase Card (col-span-8) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMaster.id}
                initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="liquid-glass-strong rounded-[2rem] p-8 md:p-10 h-full border border-white/10 flex flex-col md:grid md:grid-cols-12 gap-8 relative overflow-hidden text-left"
              >
                {/* Back decorative watermarked piece */}
                <span className="absolute -bottom-8 -right-8 text-[12rem] font-light text-white/[0.02] font-heading select-none pointer-events-none">
                  {currentMaster.avatarIcon}
                </span>

                {/* Subcolumn 1: Big Visual Shield (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-black to-white/5 border border-white/10 flex items-center justify-center text-8xl text-white relative shadow-inner group">
                    <div className="absolute inset-0 rounded-full bg-radial-gradient from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Animated shine element */}
                    <div className="absolute inset-0 rounded-full border border-gold/20 opacity-40 animate-pulse" />
                    <span className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] text-gold select-none">
                      {currentMaster.avatarIcon}
                    </span>
                  </div>
                  
                  {/* Rating display under shield */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block">
                      Peak FIDE Rating
                    </span>
                    <span className="text-3xl font-heading italic text-white block mt-1 tracking-wider">
                      {currentMaster.peakElo} ELO
                    </span>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold font-body uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" /> Certified
                    </div>
                  </div>
                </div>

                {/* Subcolumn 2: Bio & Key Achievements (md:col-span-7) */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Role Tag & Title */}
                    <span className="text-xs font-semibold text-gold tracking-widest uppercase font-body">
                      {currentMaster.credentials}
                    </span>
                    <h3 className="font-heading italic text-white text-4xl mt-1 tracking-tight">
                      {currentMaster.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-white/40 mt-1 block mb-6 font-body">
                      {currentMaster.role}
                    </p>

                    {/* Bio Description */}
                    <p className="text-sm text-white/85 leading-relaxed font-body font-light mb-8">
                      {currentMaster.bio}
                    </p>
                  </div>

                  {/* Bullet Achievements */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-white/50 block mb-3 font-body">
                      Verified Accomplishments
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {currentMaster.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80 font-body font-light">
                          <span className="text-gold mt-1">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
