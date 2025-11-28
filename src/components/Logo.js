// src/components/Logo.js

"use client";
import { motion } from 'framer-motion';

export default function Logo({ className = "w-40", isDark = false }) {
  // Define colors based on the current context (light/dark mode compatibility)
  const mainColor = isDark ? "#FAF9F6" : "#121212"; 
  const accentColor = "#C5A059"; // Champagne Gold

  // Monogram/Signature Animation Variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger text drawing
        delayChildren: 0.5, // Wait for the initial path to draw
      }
    }
  };

  const textDrawVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center ${className}`} 
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.svg 
        viewBox="0 0 400 80" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        
        {/* === PART 1: The Monogram (HBT) - High Contrast Initials === */}
        
        {/* Monogram Text: HBT (Using Playfair Display, the serif font) */}
        <text 
            x="10" 
            y="55" 
            fontFamily="serif" 
            fontSize="30" 
            fill={mainColor} 
            fontWeight="bold"
        >
          H
          <tspan x="30" dy="0" fill={accentColor} fontSize="28">B</tspan>
          <tspan x="55" dy="0" fill={mainColor}>T</tspan>
        </text>

        {/* --- PART 2: The Signature/Text Animation --- */}
        
        {/* Name: TOFUNMI (Draws out like a signature) */}
        <motion.text
            x="85" 
            y="55" 
            fontFamily="serif" 
            fontSize="32" 
            fontWeight="lighter"
            fill={mainColor} 
            className="italic"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
        >
          Tofunmi
        </motion.text>
        
        {/* Signature Flourish/Line (Animated Path) */}
        <motion.path 
            // This path creates a subtle flourish curve underneath the name
            d="M 90 60 C 150 75, 250 65, 350 70" 
            stroke={accentColor} 
            strokeWidth="1.5" 
            fill="none" 
            variants={textDrawVariants}
        />
        
        {/* Tagline: Elegance. Style. Care. (Subtle and spaced) */}
        <motion.text 
            x="95" 
            y="72" 
            fontFamily="sans-serif" 
            fontSize="8" 
            fill={accentColor} 
            className="uppercase tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
        >
          Elegance. Style. Care.
        </motion.text>
      </motion.svg>
    </motion.div>
  );
}
