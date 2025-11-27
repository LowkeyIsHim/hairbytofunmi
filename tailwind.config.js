/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Using a more elegant, default serif/sans pairing
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        brand: {
          cream: '#FAF9F6', // Off-White/Cream Background
          champagne: '#C5B487', // Muted Gold/Champagne Accent
          mauve: '#A17A8A', // Deep Muted Mauve/Rose
          dark: '#1e1b19', // Deep Charcoal for Text
          accent: '#A17A8A', // Main brand color
        }
      }
    },
  },
  plugins: [],
};
