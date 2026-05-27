import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldAlert, Award, Star, Zap, Gauge } from "lucide-react";

interface LevelItem {
  id: number;
  title: string;
  desc: string;
  badge: string;
  icon: string;
  perks: string[];
}

export default function LearningLevels() {
  const levels: LevelItem[] = [
    {
      id: 1,
      title: "Freshers",
      desc: "Laying the groundwork for a bright future!",
      badge: "Focus: Chess Fundamentals",
      icon: "♙", // Pawn
      perks: ["Board setup & coordinates", "Basic piece movements", "Fundamental rules (Castling, En Passant)"],
    },
    {
      id: 2,
      title: "Beginners",
      desc: "Building confidence with every step forward!",
      badge: "Focus: Basic Tactics",
      icon: "♘", // Knight
      perks: ["Elementary checkmate patterns", "Introduction to forks & skewers", "Simple endgame conversions"],
    },
    {
      id: 3,
      title: "Advanced Beginners",
      desc: "Refining skills and enhancing strategies!",
      badge: "Focus: Combinations & Openings",
      icon: "♗", // Bishop
      perks: ["Dynamic opening principles", "Double attacks & sacrifices", "Defensive response training"],
    },
    {
      id: 4,
      title: "Intermediate",
      desc: "Honing expertise for consistent growth!",
      badge: "Focus: Positional Play",
      icon: "♖", // Rook
      perks: ["Pawn structure analysis", "Rook endgames & minor piece battles", "Positional planning & prophylaxis"],
    },
    {
      id: 5,
      title: "Advanced",
      desc: "Pushing boundaries to achieve excellence!",
      badge: "Focus: Master Strategy & FIDE",
      icon: "♕", // Queen
      perks: ["Deep line calculations", "Tournament preparation & psychology", "Advanced endgame mastery with FIDE coaches"],
    },
  ];

  const handleStartJourney = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSe5fcFC-x55EoULoYVaz39GYwpcJ-IYfuPqZSr0uEb9qUJceg/viewform", "_blank");
  };

  return (
    <section id="learning-levels" className="relative py-24 px-6 md:px-16 lg:px-20 z-10 border-b border-white/5 bg-transparent">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header content matching the uploaded UI */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block">
            STEPS TOWARDS BECOMING A PROFESSIONAL
          </span>
          <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[0.95] tracking-[-2px]">
            Chess Learning Level
          </h2>
          <p className="font-body font-light text-sm md:text-base text-white/70 leading-relaxed">
            Start with the basics, advance through strategy and tactics, and refine endgame skills. 
            Focus on tournament preparation and consistent practice to reach professional level.
          </p>
        </div>

        {/* 5-Column Grid featuring the 5 levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 select-none">
          {levels.map((lvl) => (
            <motion.div
              key={lvl.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative liquid-glass border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all text-left bg-gradient-to-br from-white/[0.02] to-transparent min-h-[360px]"
            >
              <div>
                {/* Large semi-transparent tier number in background */}
                <div className="absolute top-3 right-6 text-7xl font-heading italic font-bold text-white/[0.03] group-hover:text-gold/[0.08] transition-colors">
                  {lvl.id}
                </div>

                {/* Level Piece Character & Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-2xl">
                    {lvl.icon}
                  </div>
                  <span className="text-lg font-heading italic font-semibold text-gold font-mono">
                    0{lvl.id}
                  </span>
                </div>

                {/* Level Title */}
                <h3 className="text-xl md:text-2xl font-heading italic text-white font-semibold tracking-tight">
                  {lvl.title}
                </h3>

                {/* Badge details */}
                <span className="block text-[10px] text-gold uppercase tracking-[0.1em] font-semibold mt-1 mb-4">
                  {lvl.badge}
                </span>

                {/* Level Description */}
                <p className="text-xs md:text-sm text-white/70 font-body font-light leading-snug mb-6">
                  {lvl.desc}
                </p>
              </div>

              {/* List of perks/curriculum inside */}
              <div className="space-y-2.5 border-t border-white/5 pt-4">
                {lvl.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold/60 mt-1.5 shrink-0" />
                    <span className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors leading-tight">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Start Your Journey CTA Section */}
        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartJourney}
            className="group px-8 py-4 bg-gold hover:bg-gold/90 text-black font-body font-bold rounded-full shadow-2xl flex items-center gap-3 transition-all cursor-pointer text-sm tracking-wide"
          >
            <span>JOIN THE ACADEMY & START YOUR JOURNEY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
