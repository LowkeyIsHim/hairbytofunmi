import React from 'react';

// Premium SVG Logo: Abstract representation of stylized 'T' and hair flow.
export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Circle/Frame */}
      <circle cx="50" cy="50" r="48" stroke="#CFB998" strokeWidth="2" fill="none" />
      {/* Stylized 'T' shape */}
      <path 
        d="M30 40 L50 40 L50 75 M70 40 L50 40 M50 75 Q55 80 60 75" 
        stroke="#1C1917" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Gold dot accent */}
      <circle cx="65" cy="30" r="3" fill="#CFB998" />
    </svg>
  );
}
