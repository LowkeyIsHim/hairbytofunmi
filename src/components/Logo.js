"use client";
import { motion } from 'framer-motion';

export default function Logo({ className = "w-40", isDark = false }) {
  // Dynamic colors based on where the logo is used (Navbar vs Footer)
  const mainColor = isDark ? "#FAF9F6" : "#121212"; 
  const accentColor = "#C5A059"; // The Gold

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
        <motion.svg 
        viewBox="0 0 300 80" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        >
        
        {/* The "HBT" Monogram Background Element */}
        <motion.path
            d="M 150 10 L 150 70"
            stroke={accentColor}
            strokeWidth="1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 60, opacity: 0.5 }}
            transition={{ duration: 1 }}
        />
        
        {/* Main Text: Hair By (Small, Spaced out) */}
        <text 
            x="150" 
            y="30" 
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontSize="10" 
            fill={mainColor} 
            letterSpacing="0.4em" 
            className="uppercase tracking-[0.4em]"
        >
            Hair By
        </text>

        {/* Main Text: TOFUNMI (Large, Serif, Elegant) */}
        <text 
            x="150" 
            y="60" 
            textAnchor="middle" 
            fontFamily="serif" 
            fontSize="38" 
            fill={mainColor} 
            className="font-serif"
        >
            TOFUNMI
        </text>

        {/* The Dot (Luxury Accent) */}
        <motion.circle 
            cx="260" 
            cy="55" 
            r="2" 
            fill={accentColor} 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
        />
        </motion.svg>
    </div>
  );
}
