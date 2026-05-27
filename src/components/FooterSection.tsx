import React from "react";
import { Phone, Mail, MapPin, Facebook, Send, Youtube, MessageSquare } from "lucide-react";
import CalligraphicWriter from "./CalligraphicWriter";

export default function FooterSection() {
  return (
    <footer className="relative bg-transparent text-white overflow-hidden py-16 px-4 sm:px-6 md:px-12 select-none text-left">
      {/* Subtle bottom gradients */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-transparent opacity-60 pointer-events-none" />

      {/* 3D claymorphic card container encompassing the signature, links and copy section */}
      <div className="max-w-7xl mx-auto clay-card-strong rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative z-10 overflow-hidden">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Calligraphic Signature of Authenticity (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-gold font-bold">♕</span>
              <span className="text-sm font-heading tracking-[0.2em] font-light uppercase text-white/90">
                SR Chess Academy
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-body font-light max-w-sm">
              Forging strategic mastermind intelligence through world-class FIDE certified mentoring, interactive laboratories, and customized individual chess paths.
            </p>

            {/* Golden signature animation */}
            <div className="pt-4 border-t border-white/5 w-full flex flex-col items-start">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-white/40 block mb-2">
                Syllabus Endorsement
              </span>
              <CalligraphicWriter className="scale-90 -translate-x-6 h-28" delay={0.2} />
            </div>
          </div>

          {/* Column 2: Direct Contact Channels (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-gold tracking-widest uppercase block mb-4">
                // Direct Inquiry Lines
              </span>
              <ul className="flex flex-col gap-3.5">
                
                {/* Phone Contacts */}
                <li className="flex items-start gap-3 group">
                  <span className="p-2 rounded-lg bg-white/2 border border-white/5 text-gold group-hover:bg-gold/10 group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-semibold font-body block">
                      Call Mentorship Desk
                    </span>
                    <a
                      href="tel:+917042854007"
                      className="text-xs md:text-sm text-white/80 hover:text-gold font-mono transition-colors"
                    >
                      +91-7042854007
                    </a>
                    <span className="text-white/30 mx-2 text-xs">/</span>
                    <a
                      href="tel:+918076689078"
                      className="text-xs md:text-sm text-white/80 hover:text-gold font-mono transition-colors"
                    >
                      +91-8076689078
                    </a>
                  </div>
                </li>

                {/* Email Contacts */}
                <li className="flex items-start gap-3 group">
                  <span className="p-2 rounded-lg bg-white/2 border border-white/5 text-gold group-hover:bg-gold/10 group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-semibold font-body block">
                      Direct Email Correspondence
                    </span>
                    <a
                      href="mailto:contactus@srchessacademy.com"
                      className="text-xs md:text-sm text-white/85 hover:text-gold transition-colors block"
                    >
                      contactus@srchessacademy.com
                    </a>
                    <a
                      href="mailto:enquiries.srca@gmail.com"
                      className="text-xs md:text-sm text-white/55 hover:text-gold transition-colors block mt-0.5"
                    >
                      enquiries.srca@gmail.com
                    </a>
                  </div>
                </li>

                {/* Address / Location Line */}
                <li className="flex items-start gap-3 group">
                  <span className="p-2 rounded-lg bg-white/2 border border-white/5 text-gold group-hover:bg-gold/10 group-hover:text-white transition-all">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-semibold font-body block">
                      Grandmaster Headquarters
                    </span>
                    <p className="text-xs text-white/70 font-body leading-relaxed max-w-xs font-light">
                      B-7/93, Extn, Safdarjung Enclave.<br />
                      Lower ground floor. New Delhi - 110029.
                    </p>
                  </div>
                </li>

              </ul>
            </div>
          </div>

          {/* Column 3: Social Directories & Instant Messenger (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-gold tracking-widest uppercase block mb-4">
                // Social Registry
              </span>
              <p className="text-xs text-white/55 font-body font-light leading-relaxed mb-6 max-w-sm">
                Explore tactical clips, tournament standings, and regular chess puzzles on our digital communities.
              </p>

              {/* Grid of clean high-contrast social buttons */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* WhatsApp instant link */}
                <a
                  href="https://api.whatsapp.com/send?phone=917042854007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-green-950/15 border border-green-800/30 text-green-400 hover:bg-green-800/20 text-xs transition-colors cursor-pointer select-none"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61559885038853"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl clay-btn text-white/90 hover:text-gold text-xs transition-all cursor-pointer"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/srca_chessmentors/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl clay-btn text-white/90 hover:text-gold text-xs transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold leading-none font-sans italic">Insta</span>
                  <span>Instagram</span>
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/ChessShivi46473?t=T63X2qFgay2WqroAs7amsw&s=09"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl clay-btn text-white/90 hover:text-gold text-xs transition-all cursor-pointer"
                >
                  <span className="text-xs font-mono font-black italic">X</span>
                  <span>Follow X</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/sr-chess-academy/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl clay-btn text-white/90 hover:text-gold text-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtu.be/39wamHswcB8"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-950/15 border border-red-800/30 text-red-400 hover:bg-red-800/20 text-xs transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>

              </div>
            </div>
          </div>

        </div>

        {/* Extreme bottom copyright and legal credit */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© 2026 SR Chess Academy. All International Chess Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#training" className="hover:text-white transition-colors">Tactics Arena</a>
            <span>•</span>
            <a href="#coaches" className="hover:text-white transition-colors">FIDE Coaches</a>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">Top</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
