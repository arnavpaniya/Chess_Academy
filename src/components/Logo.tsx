import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 48 }: LogoProps) {
  // We'll use a responsive SVG that scales perfectly to 'size'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`text-white select-none ${className}`}
      aria-label="Shivika Rohilla Chess Academy"
    >
      <defs>
        {/* Paths for the curved text */}
        {/* Top Text Path (clockwise around the top) */}
        <path
          id="topTextPath"
          d="M 24,100 A 76,76 0 0,1 176,100"
          fill="none"
        />
        {/* Bottom Text Path (clockwise around the bottom) */}
        <path
          id="bottomTextPath"
          d="M 176,100 A 76,76 0 0,1 24,100"
          fill="none"
        />
        {/* Linear gradients for sub-decorations */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Decorative Outer Circle with double-thin lines */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Outer Dotted ring */}
      <circle
        cx="100"
        cy="100"
        r="83"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 4"
        strokeOpacity="0.4"
      />

      {/* Background Initials: S and R in elegant luxury serif fonts */}
      <text
        x="65"
        y="125"
        fontFamily="'Instrument Serif', 'Georgia', serif"
        fontSize="100"
        fontWeight="300"
        fontStyle="italic"
        fill="currentColor"
        fillOpacity="0.1"
        textAnchor="middle"
      >
        S
      </text>
      <text
        x="135"
        y="125"
        fontFamily="'Instrument Serif', 'Georgia', serif"
        fontSize="100"
        fontWeight="300"
        fontStyle="italic"
        fill="currentColor"
        fillOpacity="0.1"
        textAnchor="middle"
      >
        R
      </text>

      {/* Curved Text: SHIVIKA ROHILLA */}
      <text
        fontFamily="'Barlow', sans-serif"
        fontSize="13.5"
        fontWeight="600"
        letterSpacing="2.5"
        fill="currentColor"
        fillOpacity="0.9"
      >
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          SHIVIKA ROHILLA
        </textPath>
      </text>

      {/* Curved Text: CHESS ACADEMY */}
      <text
        fontFamily="'Barlow', sans-serif"
        fontSize="13.5"
        fontWeight="600"
        letterSpacing="2.5"
        fill="currentColor"
        fillOpacity="0.9"
      >
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          CHESS ACADEMY
        </textPath>
      </text>

      {/* Small separators (stars or dots) in gold */}
      <circle cx="21" cy="100" r="2.5" fill="#C9A84C" />
      <circle cx="179" cy="100" r="2.5" fill="#C9A84C" />

      {/* Inner Frame */}
      <circle
        cx="100"
        cy="100"
        r="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <circle
        cx="100"
        cy="100"
        r="53"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />

      {/* Chess Rook SVG in the core */}
      <g transform="translate(72, 60) scale(0.95)" fill="currentColor" className="text-white">
        {/* Battlements / Crown of the Rook */}
        <path
          d="M6 3h6v4h6v-4h10v4h6v-4h6v10H6V3z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Neck of the Rook */}
        <path
          d="M8 13h24l-2 5H10l-2-5z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Tapered column body */}
        <path
          d="M11 18h18l-1.5 32h-15L11 18z"
        />
        {/* Base rings */}
        <rect x="9" y="50" width="22" height="4" rx="1" />
        <rect x="7" y="55" width="26" height="5" rx="1.5" />
        
        {/* Thin elegant horizontal slits inside the Rook column for luxury details */}
        <line x1="14" y1="28" x2="26" y2="28" stroke="#000" strokeWidth="1.5" opacity="0.3" />
        <line x1="14" y1="40" x2="26" y2="40" stroke="#000" strokeWidth="1.5" opacity="0.3" />
      </g>

      {/* A small refined trademark dot at bottom right */}
      <circle cx="172" cy="151" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <text
        x="172"
        y="153"
        fontFamily="sans-serif"
        fontSize="5"
        fill="currentColor"
        textAnchor="middle"
        opacity="0.5"
      >
        TM
      </text>
    </svg>
  );
}
