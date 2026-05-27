import React from "react";
import { motion } from "motion/react";
import FadingVideo from "./FadingVideo";
import BlurText from "./BlurText";
import { ArrowUpRight } from "./Navbar";

// Standard Inline Icons for Stats as requested
function TrophyIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-gold`}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a5 5 0 0 0-5 5v5c0 2.21 1.79 4 4 4s4-1.79 4-4V7a5 5 0 0 0-5-5z" />
    </svg>
  );
}

function KnightIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-white`}
    >
      {/* Handcrafted precise chess knight SVG path */}
      <path d="M19 22H5v-2h14v2M13 2c-1.1 0-2 .9-2 2v1.26A8 8 0 0 0 12 20h4a8 8 0 0 0-3-15.74V4c0-1.1-.9-2-2-2Z" />
    </svg>
  );
}

function PlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <polygon points="6,4 20,12 6,20 6,4" />
    </svg>
  );
}

interface HeroSectionProps {
  onStartTraining: () => void;
  onWatchGameplay: () => void;
}

export default function HeroSection({ onStartTraining, onWatchGameplay }: HeroSectionProps) {
  // Motion container helpers for coordinated stagger entrances
  const revealVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 30 },
    visible: (delay: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        delay,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-between"
    >
      {/* Atmospheric multi-layered cosmic flow */}
      <div className="atmosphere z-[2] opacity-70" />

      {/* Grid overlay dot system */}
      <div className="dot-pattern z-[3]" />

      {/* Floating dust overlay layer to blend video and frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-[4]" />

      {/* Hero Central Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-4 text-center max-w-5xl mx-auto">
        
        {/* Badge Indicator */}
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="liquid-glass rounded-full px-1.5 py-1 flex items-center gap-2 border border-white/5 shadow-200"
        >
          <span className="bg-white text-black text-[10px] md:text-xs font-bold font-body px-3 py-1 rounded-full uppercase tracking-wider">
            FIDE Rated
          </span>
          <span className="text-xs md:text-sm text-white/80 pr-3 font-body font-medium">
            India's Premier Chess Training Academy
          </span>
        </motion.div>

        {/* Calligraphic Headline (Word-by-word blur-in text) */}
        <div className="mt-8">
          <BlurText
            text="Master the Game. Command the Board."
            className="text-5xl md:text-7xl lg:text-8xl font-heading italic text-white leading-[0.95] max-w-3xl tracking-[-3px] drop-shadow-lg"
          />
        </div>

        {/* Subheading */}
        <motion.p
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="mt-6 text-sm md:text-base text-white/70 max-w-2xl font-body font-light leading-relaxed mx-auto"
        >
          Train under Shivika Rohilla — FIDE-rated champion and India's foremost chess coach.
          From first move to tournament podium, every lesson is engineered for strategic mastery.
        </motion.p>

        {/* Action Controls */}
        <motion.div
          custom={1.1}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 w-full"
        >
          <button
            onClick={onStartTraining}
            className="w-full sm:w-auto liquid-glass-strong hover:bg-white hover:text-black rounded-full px-7 py-3 text-sm font-semibold text-white/90 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl shadow-black/40 border border-white/10"
          >
            Start Training
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          
          <button
            onClick={onWatchGameplay}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm text-white/80 font-body font-medium hover:text-white hover:underline decoration-gold/80 underline-offset-4 transition-colors cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all">
              <PlayIcon className="w-3 h-3 text-gold" />
            </span>
            Watch Gameplay
          </button>
        </motion.div>

        {/* Dual Statistical Panels */}
        <motion.div
          custom={1.3}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="flex flex-wrap items-stretch justify-center gap-4 mt-12 w-full max-w-lg mx-auto"
        >
          {/* Stat Box 1 */}
          <div className="flex-1 min-w-[180px] liquid-glass rounded-[1.25rem] p-5 flex flex-col items-center justify-between border border-white/5 text-center hover:border-gold/25 cursor-default transition-colors group">
            <div className="w-12 h-12 rounded-full bg-white/2 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrophyIcon className="w-6 h-6 text-gold" />
            </div>
            <div className="mt-4">
              <span className="font-heading italic font-semibold text-white text-4xl tracking-[-1px] leading-none block">
                1,200+
              </span>
              <span className="text-[11px] text-white/50 font-body font-light mt-1.5 uppercase tracking-wider block">
                Students Nationwide
              </span>
            </div>
          </div>

          {/* Stat Box 2 */}
          <div className="flex-1 min-w-[180px] liquid-glass rounded-[1.25rem] p-5 flex flex-col items-center justify-between border border-white/5 text-center hover:border-gold/25 cursor-default transition-colors group">
            <div className="w-12 h-12 rounded-full bg-white/2 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <KnightIcon className="w-6 h-6 text-white" />
            </div>
            <div className="mt-4">
              <span className="font-heading italic font-semibold text-white text-4xl tracking-[-1px] leading-none block">
                94%
              </span>
              <span className="text-[11px] text-white/50 font-body font-light mt-1.5 uppercase tracking-wider block">
                Tournament Win Rate
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Educational Affiliate Ribbon (Bottom block) */}
      <motion.div
        custom={1.4}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        className="relative z-20 flex flex-col items-center gap-4 py-8 mt-auto w-full border-t border-white/5 backdrop-blur-sm bg-black/20"
      >
        <div className="liquid-glass rounded-full px-4 py-1 text-[10px] md:text-xs font-semibold text-white/70 font-body uppercase tracking-widest border border-white/5">
          Affiliated with Premier Chess Federations
        </div>
        
        {/* Flowing Grid of partners */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-white/40 font-heading italic text-xl md:text-2xl mt-1 tracking-wider">
          <span className="hover:text-white hover:opacity-100 transition-colors cursor-default">FIDE</span>
          <span className="text-gold/40 hover:text-gold transition-colors cursor-default select-none">·</span>
          <span className="hover:text-white hover:opacity-100 transition-colors cursor-default">AICF</span>
          <span className="text-gold/40 hover:text-gold transition-colors cursor-default select-none">·</span>
          <span className="hover:text-white hover:opacity-100 transition-colors cursor-default">Chess.com</span>
          <span className="text-gold/40 hover:text-gold transition-colors cursor-default select-none">·</span>
          <span className="hover:text-white hover:opacity-100 transition-colors cursor-default">Lichess</span>
          <span className="text-gold/40 hover:text-gold transition-colors cursor-default select-none">·</span>
          <span className="hover:text-white hover:opacity-100 transition-colors cursor-default">Olympiad</span>
        </div>
      </motion.div>
    </section>
  );
}
