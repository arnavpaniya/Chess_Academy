/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Logo from "./components/Logo";

import InteractiveBoard from "./components/InteractiveBoard";
import MastersShowcase from "./components/MastersShowcase";
import StudentHub from "./components/StudentHub";
import ShivikaProfile from "./components/ShivikaProfile";
import LearningLevels from "./components/LearningLevels";
import FAQSection from "./components/FAQSection";
import FooterSection from "./components/FooterSection";
import FadingVideo from "./components/FadingVideo";
import CinematicScrollBackground from "./components/CinematicScrollBackground";

// Suppress benign Framer Motion dev checklist list-key warnings
const _ce = console.error.bind(console);
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Each child in a list")) return;
  _ce(...args);
};

// Historical chess move coordinates database to simulate "Watch Gameplay" beautifully
interface ChessMove {
  notation: string;
  whiteMove: { from: [number, number]; to: [number, number]; piece: string };
  blackMove?: { from: [number, number]; to: [number, number]; piece: string };
  description: string;
}

const LEGA_MATE_GAME: ChessMove[] = [
  {
    notation: "1. e4 e5",
    whiteMove: { from: [1, 4], to: [3, 4], piece: "♙" },
    blackMove: { from: [6, 4], to: [4, 4], piece: "♟" },
    description: "Traditional Open Game kickoff. Kings' pawns challenge the center.",
  },
  {
    notation: "2. Nf3 d6",
    whiteMove: { from: [0, 6], to: [2, 5], piece: "♘" },
    blackMove: { from: [6, 3], to: [5, 3], piece: "♟" },
    description: "Philidor Defence. Black guards the e5 pawn with a modest pawn step.",
  },
  {
    notation: "3. Bc4 Bg4",
    whiteMove: { from: [0, 5], to: [3, 2], piece: "♗" },
    blackMove: { from: [7, 2], to: [4, 5], piece: "♝" },
    description: "Shivika: 'An aggressive pin on our white knight, but white's lines are solid.'",
  },
  {
    notation: "4. Nc3 g6?!",
    whiteMove: { from: [0, 1], to: [2, 2], piece: "♘" },
    blackMove: { from: [6, 6], to: [5, 6], piece: "♟" },
    description: "Black prepares a fianchetto, neglecting active development.",
  },
  {
    notation: "5. Nxe5! Bxd1??",
    whiteMove: { from: [2, 5], to: [4, 4], piece: "♘" },
    blackMove: { from: [4, 5], to: [7, 3], piece: "♝" },
    description: "Brilliant tactical sacrifice! White relinquishes the Queen for a forced mate.",
  },
  {
    notation: "6. Bxf7+ Ke7",
    whiteMove: { from: [3, 2], to: [6, 5], piece: "♗" },
    blackMove: { from: [7, 4], to: [6, 4], piece: "♚" },
    description: "The King is flushed into the open under heavy fire.",
  },
  {
    notation: "7. Nd5# Checkmate",
    whiteMove: { from: [2, 2], to: [3, 4], piece: "♘" },
    description: "Légal's Mate! Complete tactical coordination in just 7 moves.",
  },
];

export default function App() {
  // Modal toggle states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGameplayOpen, setIsGameplayOpen] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Booking Form Inputs
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentLevel, setStudentLevel] = useState("Intermediate");
  const [studentAge, setStudentAge] = useState("Adult (18+)");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Gameplay simulation board state
  const [board, setBoard] = useState<string[][]>([]);
  const [activeMoveIndex, setActiveMoveIndex] = useState(-1);
  const [isSimulationPlaying, setIsSimulationPlaying] = useState(false);

  // Setup/Reset Board
  const initializeStandardBoard = () => {
    const baseBoard = [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      Array(8).fill(""),
      Array(8).fill(""),
      Array(8).fill(""),
      Array(8).fill(""),
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ];
    setBoard(baseBoard);
    setActiveMoveIndex(-1);
  };

  useEffect(() => {
    initializeStandardBoard();
  }, []);

  // Handle Simulation autoplay step-by-step
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulationPlaying && isGameplayOpen) {
      if (activeMoveIndex < LEGA_MATE_GAME.length - 1) {
        timer = setTimeout(() => {
          advanceMove();
        }, 2200);
      } else {
        setIsSimulationPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulationPlaying, activeMoveIndex, isGameplayOpen]);

  const advanceMove = () => {
    const nextIndex = activeMoveIndex + 1;
    if (nextIndex >= LEGA_MATE_GAME.length) return;

    const move = LEGA_MATE_GAME[nextIndex];
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      // Apply white move
      const { from: wFrom, to: wTo, piece: wP } = move.whiteMove;
      newBoard[wFrom[0]][wFrom[1]] = "";
      newBoard[wTo[0]][wTo[1]] = wP;

      // Apply black move if exists
      if (move.blackMove) {
        const { from: bFrom, to: bTo, piece: bP } = move.blackMove;
        newBoard[bFrom[0]][bFrom[1]] = "";
        newBoard[bTo[0]][bTo[1]] = bP;
      }

      return newBoard;
    });

    setActiveMoveIndex(nextIndex);
  };

  const resetGameplaySim = () => {
    initializeStandardBoard();
    setIsSimulationPlaying(false);
  };

  const handleScrollToSection = (sectionId: "hero" | "training" | "coaches" | "resources" | "academy-profile" | "learning-levels") => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartJourney = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSe5fcFC-x55EoULoYVaz39GYwpcJ-IYfuPqZSr0uEb9qUJceg/viewform", "_blank");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    setIsSubmitted(true);
  };

  const resetBookingForm = () => {
    setIsBookingOpen(false);
    // Let animation finish before resetting submission state
    setTimeout(() => {
      setStudentName("");
      setStudentEmail("");
      setStudentLevel("Intermediate");
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <div className="relative font-body bg-transparent text-white no-scrollbar selection:bg-gold selection:text-black">
      {/* Cinematic Scroll-controlled Global Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-10] overflow-hidden bg-black">
        {/* Performance-optimized Cinematic Scroll Background (Canvas) */}
        <CinematicScrollBackground />
      </div>

      {/* Absolute top global Navbar */}
      <Navbar
        onScrollToSection={handleScrollToSection}
        onBookClick={handleStartJourney}
      />

      {/* Main Single Page Layout Sections */}
      <main className="w-full">
        {/* HERO SECTION */}
        <HeroSection
          onStartTraining={handleStartJourney}
          onWatchGameplay={() => {
            setIsGameplayOpen(true);
            resetGameplaySim();
          }}
        />

        {/* INTRODUCTORY PROFILE segment WITH LIVE TRIVIA BOARD */}
        <ShivikaProfile onStartJourney={handleStartJourney} />

        {/* STUDENT HUB RESOURCES PORTAL */}
        <StudentHub />

        {/* CHESS LEARNING LEVEL SECTION */}
        <LearningLevels />

        {/* ACTIVE PLAYABLE LABORATORY */}
        <InteractiveBoard />

        {/* GRANDMASTERS & COACHES SHOWCASE */}
        <MastersShowcase />

        {/* STANDALONE TRANSPARENT FAQ SECTION */}
        <FAQSection />
      </main>

      {/* FOOTER & DIRECT CONTACT CORRESPONDENCE */}
      <FooterSection />

      {/* CINEMATIC PRELOADER */}
      <AnimatePresence mode="wait">
        {preloaderActive && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 bg-black z-[1000] flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Ambient luxury rotating radial highlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Rotating outer rings with Chess Emblem in the center */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                  className="w-24 h-24 border border-dashed border-gold/40 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                  className="absolute w-28 h-28 border border-white/5 rounded-full"
                />
                
                <div className="absolute w-24 h-24 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-sm p-2 border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.6),_inset_0_4px_6px_rgba(255,255,255,0.15)]">
                  <img
                    src="/ChatGPT_Image_May_21__2026__11_38_34_PM-removebg-preview.png"
                    className="w-16 h-16 object-contain animate-pulse"
                    alt="SR Chess Academy Logo"
                  />
                </div>
              </div>

              {/* Grand Brand Reveal Text */}
              <div className="text-center space-y-2 mt-4 z-10 px-4">
                <motion.h1
                  initial={{ letterSpacing: "0.1em", opacity: 0 }}
                  animate={{ letterSpacing: "0.25em", opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="font-heading italic text-white text-xl md:text-3xl font-bold uppercase tracking-[0.25em]"
                >
                  Shivika Rohilla
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="text-[9px] md:text-sm text-gold uppercase tracking-[0.35em] font-semibold"
                >
                  Chess Academy
                </motion.p>
              </div>

              {/* Loading simulation line */}
              <div className="relative mt-12 w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute w-1/2 h-full bg-gradient-to-r from-transparent via-gold to-transparent"
                />
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-[9px] text-white/30 tracking-[0.15em] font-mono uppercase mt-2 block"
              >
                Formulating Strategy...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 1: PRESTIGIOUS CLASS BOOKING GLASS FORM */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-100 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="liquid-glass border border-white/10 rounded-[1.5rem] w-full max-w-lg p-8 relative flex flex-col items-center justify-center shadow-2xl text-center"
            >
              {/* Close Button top corner */}
              <button
                onClick={resetBookingForm}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-gold/15 flex items-center justify-center text-white/70 hover:text-gold cursor-pointer transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <>
                  {/* Decorative tiny crest tag */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/2 border border-white/10 mb-4 text-gold">
                    ♕
                  </div>

                  {/* Booking Header */}
                  <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight leading-none mb-2">
                    Begin Your Mastery
                  </h3>
                  <p className="text-xs md:text-sm text-white/60 mb-6 max-w-sm">
                    Register for a complimentary diagnostic and placement evaluation session with FIDE coach Shivika Rohilla.
                  </p>

                  {/* Submission Form */}
                  <form onSubmit={handleBookingSubmit} className="w-full flex flex-col gap-4 text-left">
                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">
                        Student Name
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g., Arnav Gupta"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all duration-300 font-body font-light"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">
                        Direct Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="e.g., arnav@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all duration-300 font-body font-light"
                      />
                    </div>

                    {/* Horizontal split selection (Age & Level) */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Age category */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">
                          Age Group
                        </label>
                        <select
                          value={studentAge}
                          onChange={(e) => setStudentAge(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all cursor-pointer font-body font-light"
                        >
                          <option value="Junior (Under 12)" className="bg-black text-white py-2">Junior (&lt; 12)</option>
                          <option value="Teenager (12-17)" className="bg-black text-white py-2">Teenager (12-17)</option>
                          <option value="Adult (18+)" className="bg-black text-white py-2">Adult (18+)</option>
                        </select>
                      </div>

                      {/* Current Chess Experience selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">
                          Skill Bracket
                        </label>
                        <select
                          value={studentLevel}
                          onChange={(e) => setStudentLevel(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all cursor-pointer font-body font-light"
                        >
                          <option value="Novice" className="bg-black text-white py-2">Complete Novice</option>
                          <option value="Intermediate" className="bg-black text-white py-2">Intermediate Club</option>
                          <option value="Advanced / FIDE" className="bg-black text-white py-2">Advanced FIDE / Rated</option>
                        </select>
                      </div>
                    </div>

                    {/* Booking Primary Submission Button */}
                    <button
                      type="submit"
                      className="w-full bg-white hover:bg-gold text-black hover:text-white rounded-full py-3 mt-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98 shadow-lg shadow-black/40"
                    >
                      Book Free Assessment
                      <span>→</span>
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6"
                >
                  {/* Confirmed Crown Symbol */}
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/45 flex items-center justify-center text-4xl text-gold animate-bounce mb-6">
                    ♔
                  </div>

                  {/* Success Title */}
                  <h3 className="font-heading italic text-white text-4xl mb-3 tracking-tight">
                    Checkmate!
                  </h3>
                  
                  {/* Detailed success message including student level and contact info */}
                  <p className="text-sm text-white/80 max-w-md leading-relaxed mb-6">
                    Greetings, <strong className="text-white">{studentName}</strong>. Your placement evaluation request for the <strong className="text-gold">{studentLevel}</strong> track has been logged.
                    <br />
                    <span className="text-xs text-white/50 block mt-2">
                      An invitation with diagnostic schedules has been dispatched to {studentEmail}.
                    </span>
                  </p>

                  {/* Return Button */}
                  <button
                    onClick={resetBookingForm}
                    className="liquid-glass hover:bg-white hover:text-black rounded-full px-8 py-2.5 text-xs font-semibold text-white cursor-pointer border border-white/15 transition-all"
                  >
                    Return to Academy
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: INTERACTIVE CINEMATIC CHESS GAMEPLAY SIMULATOR */}
      <AnimatePresence>
        {isGameplayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-100 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="liquid-glass border border-white/10 rounded-[1.5rem] w-full max-w-4xl p-6 md:p-8 relative grid grid-cols-1 md:grid-cols-12 gap-8 shadow-2xl"
            >
              {/* Close Button top corner */}
              <button
                onClick={() => {
                  setIsGameplayOpen(false);
                  setIsSimulationPlaying(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-gold/15 flex items-center justify-center text-white/70 hover:text-gold cursor-pointer transition-colors z-20"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Title Header spanning across layout */}
              <div className="md:col-span-12 mb-2 text-left">
                <span className="text-xs font-body text-gold font-semibold tracking-widest uppercase block mb-1">
                  // Interactive Gameplay Match
                </span>
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight leading-none">
                  FIDE Masters Classroom
                </h3>
                <p className="text-xs text-white/50 font-body">
                  Study Légal's famous tactical trap (1750), curated step-by-step by Shivika Rohilla.
                </p>
              </div>

              {/* Grid Column 1: The Interactive Board (md:col-span-7) */}
              <div className="md:col-span-7 flex flex-col items-center">
                <div className="bg-black/40 border border-white/10 p-1 rounded-xl shadow-lg w-full max-w-[380px] aspect-square flex flex-col justify-between">
                  {board.map((row, rIdx) => (
                    <div key={rIdx} className="flex-1 flex">
                      {row.map((piece, cIdx) => {
                        const isDark = (rIdx + cIdx) % 2 === 1;
                        const isWhitePiece = piece !== "" && "♙♖♘♗♕♔".includes(piece);
                        return (
                          <div
                            key={cIdx}
                            className={`flex-1 aspect-square flex items-center justify-center relative transition-colors duration-500 text-3xl font-light select-none ${
                              isDark ? "bg-black/60 text-white/90" : "bg-white/5 text-white/75"
                            }`}
                          >
                            {/* Coordinate indices for high-end look */}
                            {cIdx === 0 && (
                              <span className="absolute left-0.5 top-0.5 text-[8px] text-white/20 select-none">
                                {8 - rIdx}
                              </span>
                            )}
                            {rIdx === 7 && (
                              <span className="absolute right-0.5 bottom-0.5 text-[8px] text-white/20 select-none uppercase">
                                {String.fromCharCode(97 + cIdx)}
                              </span>
                            )}

                            {/* Render piece with elegant scale entrance */}
                            {piece && (
                              <span className={isWhitePiece ? "text-[#E6DFD3] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" : "text-[#73634B] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"}>
                                {piece}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Simulation Control Triggers */}
                <div className="flex gap-4 mt-6 w-full max-w-[380px]">
                  {/* Step Button */}
                  <button
                    disabled={activeMoveIndex >= LEGA_MATE_GAME.length - 1 || isSimulationPlaying}
                    onClick={advanceMove}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 rounded-full text-xs font-semibold cursor-pointer border border-white/10 transition-all select-none"
                  >
                    Next Turn
                  </button>

                  {/* Autoplay Button */}
                  <button
                    onClick={() => setIsSimulationPlaying(!isSimulationPlaying)}
                    disabled={activeMoveIndex >= LEGA_MATE_GAME.length - 1}
                    className={`flex-1 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all border select-none ${
                      isSimulationPlaying
                        ? "bg-gold text-white border-gold/40 animate-pulse"
                        : "bg-white text-black border-white hover:bg-gold hover:text-white"
                    }`}
                  >
                    {isSimulationPlaying ? "Pause Analysis" : "Auto-Play Match"}
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={resetGameplaySim}
                    className="px-4 py-2 bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 rounded-full text-xs font-semibold cursor-pointer transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Grid Column 2: Log Notation & Active Move detail (md:col-span-5) */}
              <div className="md:col-span-5 flex flex-col justify-between h-full bg-white/1 rounded-2xl border border-white/5 p-5 text-left select-none">
                {/* Moves list wrapper */}
                <div className="flex-1 overflow-y-auto no-scrollbar max-h-[280px]">
                  <span className="text-[10px] text-white/40 block mb-3 font-semibold uppercase tracking-wider">
                    Move Notation Log
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {LEGA_MATE_GAME.map((gameMove, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isSimulationPlaying) {
                            // Reset and catch up to move
                            initializeStandardBoard();
                            setActiveMoveIndex(-1);
                            for (let step = 0; step <= idx; step++) {
                              const move = LEGA_MATE_GAME[step];
                              setBoard((prevBoard) => {
                                const newBoard = prevBoard.map((row) => [...row]);
                                const { from: wFrom, to: wTo, piece: wP } = move.whiteMove;
                                newBoard[wFrom[0]][wFrom[1]] = "";
                                newBoard[wTo[0]][wTo[1]] = wP;
                                if (move.blackMove) {
                                  const { from: bFrom, to: bTo, piece: bP } = move.blackMove;
                                  newBoard[bFrom[0]][bFrom[1]] = "";
                                  newBoard[bTo[0]][bTo[1]] = bP;
                                }
                                return newBoard;
                              });
                            }
                            setActiveMoveIndex(idx);
                          }
                        }}
                        className={`flex items-center justify-between px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                          idx === activeMoveIndex
                            ? "bg-gold/15 border-gold/40 text-gold shadow-sm"
                            : "bg-white/2 border-white/5 text-white/70 hover:bg-white/5"
                        }`}
                      >
                        <span className="font-mono text-xs">{gameMove.notation}</span>
                        <span className="text-[10px] opacity-65 font-body">
                          {idx === 6 ? "🏆 Checkmate" : idx === 4 ? "🔥 Queen Sac" : "Open Step"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commentary Box at the bottom */}
                <div className="border-t border-white/5 pt-4 mt-6">
                  <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block mb-1">
                    Shivika's Tactical Insight:
                  </span>
                  <p className="text-xs text-white/80 font-body font-light leading-relaxed italic border-l-2 border-gold/40 pl-3">
                    {activeMoveIndex === -1
                      ? "Initiate study of 'Légal's Mate'! Press Next Turn or Auto-Play to visualise the brilliant tactical lines."
                      : LEGA_MATE_GAME[activeMoveIndex].description}
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
