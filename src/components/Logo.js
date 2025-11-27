"use client";
export default function Logo({ className = "w-40" }) {
  return (
    <svg viewBox="0 0 350 50" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background curl graphic */}
      <path 
        d="M 5 45 C 50 35, 100 35, 150 45" 
        stroke="#A17A8A" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.3"
      />
      {/* Styled Brand Name */}
      <text x="10" y="38" fontFamily="serif" fontSize="30" fill="#1e1b19" fontWeight="500">
        HairBy<tspan fill="#C5B487" fontWeight="bold">Tofunmi</tspan>
      </text>
      {/* Tagline */}
      <text x="12" y="48" fontFamily="sans" fontSize="10" fill="#A17A8A" opacity="0.8">
        Elegance. Style. Care.
      </text>
    </svg>
  );
}
