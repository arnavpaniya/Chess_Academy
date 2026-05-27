import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delayOffset?: number; // extra optional delay
}

export default function BlurText({ text, className = "", delayOffset = 0 }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
        }
      },
      {
        threshold: 0.1, // trigger at 10% visibility
        rootMargin: "0px",
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap justify-center row-gap-[0.1em] ${className}`}
    >
      {words.map((word, i) => {
        const delay = delayOffset + (i * 100) / 1000; // stagger delay

        return (
          <motion.span
            key={i}
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={
              hasTriggered
                ? {
                    filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : { filter: "blur(10px)", opacity: 0, y: 50 }
            }
            transition={{
              duration: 0.7,
              times: [0, 0.5, 1],
              ease: "easeOut",
              delay: delay,
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
