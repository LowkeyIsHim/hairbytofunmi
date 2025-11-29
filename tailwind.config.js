/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure 'class' mode is enabled for Dark Mode switching
  darkMode: 'class', 
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- VVIP Luxury Palette (Existing) ---
        'brand-dark': '#121212',       // Deep Charcoal / Near Black
        'brand-cream': '#FAF9F6',      // Off-White / Ivory Base
        'brand-gold': '#C5A059',       // Champagne/Antique Gold Accent
        'brand-charcoal': '#444444',   // Muted Dark Text/Accent
        // --- Added for Logo/Signature Clarity ---
        'logo-primary': '#121212',     // Primary text color (Dark Mode will handle the cream switch)
        'logo-accent': '#C5A059',      // Gold accent for icon/hover
      },
      // You can also extend typography styles here if needed later
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
        // --- Added for Signature Logo ---
        signature: ['var(--font-playfair)', 'serif'], // Use the elegant Playfair font for the signature look
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
