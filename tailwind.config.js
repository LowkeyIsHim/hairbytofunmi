// tailwind.config.js 

/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- FIX APPLIED HERE ---
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ... rest of the file ...
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['"Lato"', 'sans-serif'], 
      },
      colors: {
        brand: {
          cream: '#F7F4F0',
          gold: '#997300',
          mauve: '#7F5E70',
          dark: '#1A1A1A',
          accent: '#997300',
        }
      }
    },
  },
  plugins: [],
};
