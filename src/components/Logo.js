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
      {/* Visual Icon: Abstract Curl/Flow */}
      <motion.path 
        d="M 5 45 C 50 35, 100 35, 150 45" 
        stroke="#7F5E70" 
        strokeWidth="3" 
        fill="none" 
        opacity="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.2, type: "tween" }}
      />
      
      {/* Styled Brand Name - Using Playfair Display (serif) */}
      <text x="10" y="38" fontFamily="serif" fontSize="30" fill="#1A1A1A" fontWeight="700">
        HairBy<tspan fill="#997300" fontWeight="bold">Tofunmi</tspan>
      </text>
      
      {/* Elegant Tagline */}
      <text x="12" y="48" fontFamily="sans" fontSize="10" fill="#7F5E70" opacity="0.8">
        Elegance. Style. Care.
      </text>
    </motion.svg>
  );
}
