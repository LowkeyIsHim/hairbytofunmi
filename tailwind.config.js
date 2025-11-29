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
        // --- VVIP Luxury Palette (Bolder) ---
        'brand-dark': '#0D0D0D',       // Near-Black, ultra-deep Charcoal
        'brand-cream': '#F3EFEA',      // Soft, warm Ivory Base
        'brand-gold': '#B8860B',       // Rich, true Gold Accent (DarkGoldenrod)
        'brand-charcoal': '#333333',   // Muted Text/Accent
        
        // Semantic aliases
        'primary-bg': '#F3EFEA',       // Light Mode BG
        'secondary-bg': '#0D0D0D',     // Dark Mode BG
        'accent-gold': '#B8860B',      // Primary Accent
      },
      // You can also extend typography styles here if needed later
      fontFamily: {
        // Playfair for signature/headings, Lato for body
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
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
      // Box shadow refinement for depth
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
