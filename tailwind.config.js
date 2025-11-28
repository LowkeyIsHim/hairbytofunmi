// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure 'class' mode is enabled for Dark Mode switching
  darkMode: 'class', 
  content: [
    // ... your content paths ...
  ],
  theme: {
    extend: {
      colors: {
        // --- VVIP Luxury Palette ---
        'brand-dark': '#121212',       // Deep Charcoal / Near Black
        'brand-cream': '#FAF9F6',      // Off-White / Ivory Base
        'brand-gold': '#C5A059',       // Champagne/Antique Gold Accent
        'brand-charcoal': '#444444',   // Muted Dark Text/Accent
      },
      // You can also extend typography styles here if needed later
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
      },
      // Optional: Add slow zoom for Hero Image parallax effect
      keyframes: {
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
