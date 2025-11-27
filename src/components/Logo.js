"use client";
export default function Logo({ className = "w-40" }) {
  return (
    <svg viewBox="0 0 300 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="50" fontFamily="serif" fontSize="40" fill="#1c1917" fontWeight="bold">
        HairBy<tspan fill="#d4af37">Tofunmi</tspan>
      </text>
      <path d="M10 60 Q 150 80 290 60" stroke="#ec4899" strokeWidth="2" fill="none" />
    </svg>
  );
}
