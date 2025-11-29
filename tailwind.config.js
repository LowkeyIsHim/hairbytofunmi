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
        // --- VVIP Luxury Palette 2.0: High Contrast and Metallic ---
        'brand-dark': '#0A0A0A',       // True Deep Black
        'brand-cream': '#F8F4EF',      // Luxurious Off-White Ivory
        'brand-gold': '#A37A4B',       // Rich, Metallic Antique Gold
        'brand-charcoal': '#333333',   // Muted Dark Text/Accent
        // Aliases for clarity
        'logo-primary': '#0A0A0A',
        'logo-accent': '#A37A4B',      
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
        // Signature uses Playfair for an elegant script-like feel
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
