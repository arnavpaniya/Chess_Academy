import React, { useState } from "react";
import Logo from "./Logo";
import { ChevronDown, Award, Image, Calendar, ExternalLink, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ArrowUpRight inline icon matching style rules
export function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

interface NavbarProps {
  onScrollToSection: (sectionId: "hero" | "training" | "coaches" | "resources" | "academy-profile" | "learning-levels") => void;
  onBookClick: () => void;
}

export default function Navbar({ onScrollToSection, onBookClick }: NavbarProps) {
  const [imgErr, setImgErr] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 px-4 z-50 flex justify-center">
      <nav id="centered-navbar" className="w-full max-w-5xl liquid-glass rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between gap-4 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
        {/* Left: Logo image with Academy Name beside it */}
        <button
          onClick={() => onScrollToSection("hero")}
          className="flex items-center gap-3 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer text-left"
          aria-label="SR Chess Academy Home"
        >
          {!imgErr ? (
            <img
              src="/ChatGPT_Image_May_21__2026__11_38_34_PM-removebg-preview.png"
              className="w-10 h-10 object-contain"
              onError={() => setImgErr(true)}
              alt="SR Chess Academy"
            />
          ) : (
            <Logo size={40} />
          )}
          <div className="flex flex-col pr-1">
            <span className="font-heading italic text-white text-xs md:text-sm font-bold tracking-tight leading-none uppercase">
              Shivika Rohilla
            </span>
            <span className="text-[8px] md:text-[9px] text-gold tracking-[0.12em] font-semibold uppercase leading-none mt-1">
              Chess Academy
            </span>
          </div>
        </button>

        {/* Center (Desktop only): Holding text links + Enroll Button */}
        <div className="hidden xl:flex items-center gap-4">
          <div className="flex items-center gap-1 font-sans">
            <button
              onClick={() => onScrollToSection("hero")}
              className="px-2.5 py-1.5 text-xs font-semibold text-white/90 font-body hover:text-gold transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onScrollToSection("academy-profile")}
              className="px-2.5 py-1.5 text-xs font-semibold text-white/70 font-body hover:text-gold transition-colors cursor-pointer"
            >
              Story
            </button>
            <button
              onClick={() => onScrollToSection("learning-levels")}
              className="px-2.5 py-1.5 text-xs font-semibold text-white/70 font-body hover:text-gold transition-colors cursor-pointer"
            >
              Levels
            </button>
            <button
              onClick={() => onScrollToSection("training")}
              className="px-2.5 py-1.5 text-xs font-semibold text-white/70 font-body hover:text-gold transition-colors cursor-pointer"
            >
              Tactics
            </button>
            <button
              onClick={() => onScrollToSection("coaches")}
              className="px-2.5 py-1.5 text-xs font-semibold text-white/70 font-body hover:text-gold transition-colors cursor-pointer"
            >
              Coaches
            </button>
          </div>

          {/* Highlighted Call-To-Action inside the centered navbar */}
          <button
            onClick={onBookClick}
            className="bg-white text-black hover:bg-gold hover:text-white rounded-full px-4 py-2 text-sm font-semibold font-body whitespace-nowrap flex items-center gap-1.5 hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
          >
            Book a Class
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Right side controls for mobile/tablet devices */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Mobile CTA Button */}
          <button
            onClick={onBookClick}
            className="flex items-center bg-white/5 border border-white/10 hover:border-gold hover:text-gold px-4 py-2 rounded-full text-xs font-semibold text-white cursor-pointer transition-colors"
          >
            Book Class <ArrowUpRight className="w-3 h-3 ml-1" />
          </button>

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-gold hover:border-gold transition-colors cursor-pointer select-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>


      {/* Sliding Mobile Sidebar Navigation Menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] xl:hidden"
            />

            {/* Slide-out Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-[#090909]/95 border-l border-white/10 p-6 z-[1001] xl:hidden flex flex-col justify-between shadow-2xl backdrop-blur-md"
            >
              <div className="space-y-8 text-left">
                {/* Header of Sidebar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Logo size={42} />
                    <div className="flex flex-col">
                      <span className="font-heading italic text-white text-[10px] font-bold tracking-tight uppercase leading-none">
                        Shivika Rohilla
                      </span>
                      <span className="text-[7px] text-gold tracking-widest font-semibold uppercase leading-none mt-1">
                        Chess Academy
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sidebar Navigation Links */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onScrollToSection("hero");
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-semibold text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-body cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      onScrollToSection("academy-profile");
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-semibold text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-body cursor-pointer"
                  >
                    Story
                  </button>
                  <button
                    onClick={() => {
                      onScrollToSection("learning-levels");
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-semibold text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-body cursor-pointer"
                  >
                    Levels
                  </button>
                  <button
                    onClick={() => {
                      onScrollToSection("training");
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-semibold text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-body cursor-pointer"
                  >
                    Tactics
                  </button>
                  <button
                    onClick={() => {
                      onScrollToSection("coaches");
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-semibold text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-body cursor-pointer"
                  >
                    Coaches
                  </button>
                </div>
              </div>

              {/* Booking CTA inside mobile sidebar */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    onBookClick();
                    setSidebarOpen(false);
                  }}
                  className="w-full py-3 bg-white text-black hover:bg-gold hover:text-white rounded-xl text-center text-xs font-bold font-body flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  Book a Class
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                
                <p className="text-[10px] text-center text-white/30 font-body">
                  Professional Chess Coaching • Delhi, IN
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
