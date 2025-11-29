// tailwind.config.js (NEW LUXURY PALETTE)

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- NEW RICH SAPPHIRE & GOLD LUXURY PALETTE ---
        'brand-primary': '#0D0D1F',     // Deep Sapphire / Near Black for background
        'brand-secondary': '#A58B5C',   // Rich, Antique Gold for accents
        'brand-text': '#F7F4EB',        // Off-White/Ivory for readability
        'brand-muted': '#7B7B8F',       // Muted Grey-Blue for subtext/borders
        
        // Aliases for Logo (Uses new palette)
        'logo-primary': '#0D0D1F',
        'logo-accent': '#A58B5C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
        // Signature remains Playfair
        signature: ['var(--font-playfair)', 'serif'], 
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
