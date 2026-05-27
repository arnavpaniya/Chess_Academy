import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Do I need to bring my own chess board?",
    answer: "No, SR Chess Academy provides professional tournament-grade chess sets, digital tactile timers, and grandmaster training materials for all on-site classes. However, we highly recommend having a standard weighted chess set at home to practice lines and complete physical visualization home drills."
  },
  {
    question: "What is the academy's refund policy?",
    answer: "We strive for complete satisfaction. If you are not fully aligned with your mentorship track, we provide a full refund if requested within the first 3 class sessions or 10 days of enrollment. One-on-one masterclass bookings can be rescheduled or fully refunded with a 24-hour advance notification."
  },
  {
    question: "Are these programs suitable for absolute beginners?",
    answer: "Absolutely! We cater to all cognitive ranges. Our 'Tactical Foundation' tracks are tailored explicitly for beginners to learn piece movements, board coordinates, and basic mating patterns in a welcoming, interactive environment. We gradually scale difficulty as you gain confidence."
  },
  {
    question: "How do online masterclass rooms work?",
    answer: "Online sessions are hosted inside state-of-the-art interactive digital board environments. Students view the mentor's private stream directly, play real-time practice positions, write comments, and receive personal tactic corrections seamlessly in a tailored digital chess lab."
  },
  {
    question: "Do you offer official tournament preparation?",
    answer: "Yes, our certified FIDE curriculum is designed specifically to build the discipline, repertoire, and nervous system control required for rated competition. We assist students in securing official FIDE credentials, choosing tournaments, and analyzing match play."
  }
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 px-6 md:px-16 lg:px-20 bg-transparent text-white select-none text-left">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block mb-4">
            // FIDE Academy FAQ
          </span>
          <h3 className="font-heading italic text-white text-4xl md:text-6xl tracking-[-2px]">
            Frequently Answered
            <br />
            Questions
          </h3>
        </div>

        <div className="max-w-4xl flex flex-col divide-y divide-white/10 mt-8">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="py-6 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group select-none"
                >
                  <span className="text-base md:text-lg font-semibold text-white/95 font-body group-hover:text-gold transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold/80 transition-transform duration-300 group-hover:text-gold shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-gold" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-xs md:text-sm text-white/60 leading-relaxed font-body font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
