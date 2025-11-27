"use client";
import { motion } from 'framer-motion';

export default function Logo({ className = "w-40" }) {
  return (
    <motion.svg 
      viewBox="0 0 350 50" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle Hair Flow Graphic */}
      <motion.path 
        d="M 5 45 C 50 35, 100 35, 150 45" 
        stroke="#A17A8A" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      {/* Styled Brand Name */}
      <text x="10" y="38" fontFamily="serif" fontSize="30" fill="#1e1b19" fontWeight="500" className="font-serif">
        HairBy<tspan fill="#C5B487" fontWeight="bold">Tofunmi</tspan>
      </text>
      {/* Elegant Tagline */}
      <text x="12" y="48" fontFamily="sans" fontSize="10" fill="#A17A8A" opacity="0.8">
        Elegance. Style. Care.
      </text>
    </motion.svg>
  );
}
