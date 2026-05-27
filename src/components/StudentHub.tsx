import React from "react";
import { Award, Image, Calendar, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function StudentHub() {
  const cards = [
    {
      title: "Download Certificates",
      description: "Access and search the official register of SR Chess Academy trainees. Verifiable tournament and level clearance records.",
      link: "https://docs.google.com/spreadsheets/d/1O5iU5IOBoQHZ0QNfIKBq6xMzU5MlYeBXO70bcsyvT1s/edit?gid=0#gid=0",
      cta: "Verify Certificates",
      bgGradient: "from-amber-500/10 to-transparent hover:border-amber-500/25",
      icon: <Award className="w-8 h-8 text-amber-400" />,
      tag: "Official Registry"
    },
    {
      title: "Tournament Gallery",
      description: "Browse the visual memories of our state-level championships, offline chess clinics, and grand masterclass encounters.",
      link: "https://docs.google.com/spreadsheets/d/1Y7oHirDt_kffeIpl6U5MMgfquKjUfusIY7CX-gOkN0E/edit?gid=0#gid=0",
      cta: "View Photos & Videos",
      bgGradient: "from-sky-500/10 to-transparent hover:border-sky-500/25",
      icon: <Image className="w-8 h-8 text-sky-400" />,
      tag: "Match Highlights"
    },
    {
      title: "Chess Coffee Connect",
      description: "Discover upcoming casual blitz meetups, offline gatherings, and tactical workshops. Secure your seat for our next physical event.",
      link: "https://srchessacademy.com/chess-coffee-connect",
      cta: "Upcoming Events",
      bgGradient: "from-gold/10 to-transparent hover:border-gold/25",
      icon: <Calendar className="w-8 h-8 text-gold" />,
      tag: "Community Gatherings"
    }
  ];

  return (
    <section id="resources" className="relative max-w-7xl mx-auto py-24 px-6 md:px-16 lg:px-20 z-10 border-b border-white/5 pb-20 select-none text-left">
      {/* Visual Accent Layer */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-transparent opacity-40 pointer-events-none" />

      <div className="mb-14">
        <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block mb-4">
          // Digital Dashboard
        </span>
        <h3 className="font-heading italic text-white text-4xl md:text-6xl tracking-[-2px] mb-4">
          Student Resources Hub
        </h3>
        <p className="font-body font-light text-xs md:text-sm text-white/50 max-w-xl leading-relaxed">
          Unlock your trophies, relive rated game highlights, or prepare for immediate offline engagement. Connect to external FIDE systems seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`liquid-glass rounded-3xl border border-white/5 p-6 flex flex-col justify-between hover:scale-102 transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${card.bgGradient} group`}
            id={`resource-card-${idx}`}
          >
            {/* Ambient subtle light source overlay */}
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-white/[0.01] blur-xl group-hover:scale-150 transition-transform duration-500" />

            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full">
                  {card.tag}
                </span>
                <div className="p-3 rounded-2xl bg-white/2 border border-white/5 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="font-body font-semibold text-white text-lg md:text-xl mb-3 group-hover:text-gold transition-colors">
                {card.title}
              </h4>
              <p className="font-body font-light text-xs md:text-sm text-white/60 leading-relaxed mb-8">
                {card.description}
              </p>
            </div>

            {/* Launch link trigger button */}
            <a
              href={card.link}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white hover:text-black group-hover:border-gold/30 text-white/90 cursor-pointer select-none transition-all"
            >
              <span>{card.cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
