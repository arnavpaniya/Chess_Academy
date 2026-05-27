import React from "react";
import { motion } from "motion/react";

interface CalligraphicWriterProps {
  className?: string;
  delay?: number;
}

export default function CalligraphicWriter({ className = "", delay = 0.5 }: CalligraphicWriterProps) {
  // A hand-designed premium looking calligraphic cursive signature representation.
  // It features overlapping high-end calligraphy strokes of "Shivika Rohilla" 
  // along with a luxury underline, which animates dynamically on draw.
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (customDelay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: customDelay, duration: 1.8, ease: "easeInOut" },
        opacity: { delay: customDelay, duration: 0.3 }
      }
    })
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] md:max-w-[340px] text-gold"
      >
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* S - letter flourish */}
          <motion.path
            d="M 40 40 C 20 20, 60 5, 45 42 C 30 70, 10 90, 48 80 C 70 75, 80 50, 75 40 C 70 30, 40 50, 60 65"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={delay}
          />

          {/* h, i, v, i, k, a (Cursive fluid link) */}
          <motion.path
            d="M 60 65 C 64 62, 68 55, 71 58 C 73 63, 75 75, 78 72 C 81 68, 83 58, 84 58 C 86 63, 89 74, 91 71 C 94 65, 96 50, 95 62 C 94 74, 98 75, 101 70"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={delay + 0.3}
          />
          
          {/* dot on 'i' points */}
          <motion.circle
            cx="71"
            cy="48"
            r="1.2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.9, duration: 0.2 }}
          />
          <motion.circle
            cx="84"
            cy="48"
            r="1.2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1.1, duration: 0.2 }}
          />

          {/* R - letter flourish */}
          <motion.path
            d="M 125 45 C 105 30, 140 20, 135 55 C 130 90, 120 90, 142 80 C 150 75, 160 55, 155 45 C 150 35, 128 55, 145 68 C 155 75, 170 85, 175 75"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={delay + 0.5}
          />

          {/* o, h, i, l, l, a */}
          <motion.path
            d="M 175 75 C 180 72, 185 68, 182 72 C 180 78, 188 77, 192 73 M 192 73 C 195 60, 201 50, 198 73 C 202 75, 206 65, 208 72 C 210 50, 218 35, 215 72 C 218 50, 225 35, 222 72 C 225 68, 230 65, 235 73"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={delay + 0.8}
          />
          
          {/* dot on 'i' in Rohilla */}
          <motion.circle
            cx="208"
            cy="48"
            r="1.2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1.4, duration: 0.2 }}
          />

          {/* Swash Calligraphic Underline with loop */}
          <motion.path
            d="M 30 95 C 120 95, 200 90, 290 82 C 300 81, 310 75, 305 70 C 295 65, 280 85, 260 98"
            strokeWidth="1.2"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={delay + 1.2}
          />
        </g>
      </svg>
      {/* Sublabel */}
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 0.6, letterSpacing: "0.25em" }}
        transition={{ delay: delay + 1.8, duration: 1 }}
        className="text-[10px] uppercase font-body text-white/90 text-center font-light leading-none -mt-3.5 tracking-widest pl-1"
      >
        Shivika Rohilla
      </motion.span>
    </div>
  );
}
