// src/components/ThemeSwitch.js (Updated with Hydration Guard)

"use client";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'; // <-- NEW IMPORTS

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  // State to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false); 

  // Set mounted to true after the initial render (hydration)
  useEffect(() => {
    setMounted(true);
  }, []);

  // IMPORTANT: Do not render the theme-dependent UI until mounted
  if (!mounted) {
    // Return a null placeholder or a simple loading spinner to reserve space
    return <div className="w-[36px] h-[36px]"></div>; 
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2 rounded-full text-brand-dark dark:text-brand-cream hover:bg-brand-gold/10 transition-colors duration-300 relative"
      // Animation for the button itself
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: theme === 'dark' ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
