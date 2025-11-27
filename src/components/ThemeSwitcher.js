"use client";
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(null); // 'light' or 'dark'

  useEffect(() => {
    // 1. Get theme from local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme (prefersDark is used if no theme is saved)
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Apply initial theme class to the document root
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Render a placeholder while theme state is initializing (to prevent flicker)
  if (theme === null) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>;
  }

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full transition-colors duration-300 text-brand-mauve hover:text-brand-dark dark:text-brand-gold dark:hover:text-brand-cream"
      aria-label="Toggle Dark Mode"
    >
      {/* Show Moon icon when in light mode, show Sun icon when in dark mode */}
      {theme === 'light' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}
