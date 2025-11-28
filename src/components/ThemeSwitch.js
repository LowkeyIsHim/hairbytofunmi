// src/components/ThemeSwitch.js

"use client";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext'; // <-- NEW IMPORT
import { motion } from 'framer-motion';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

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
