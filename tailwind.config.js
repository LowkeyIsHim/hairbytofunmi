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
        // High-end serif for headlines (Think magazine titles)
        serif: ['"Playfair Display"', 'serif'], 
        // Clean, readable sans for body text
        sans: ['"Lato"', 'sans-serif'], 
      },
      colors: {
        brand: {
          cream: '#F7F4F0', // Slightly richer, warmer off-white background
          gold: '#997300',    // Deeper, more luxurious Gold for accents
          mauve: '#7F5E70',   // Richer, deeper Mauve/Plum for elegance
          dark: '#1A1A1A',  // Near-black for bold text
          accent: '#997300', // Primary accent color
        }
      }
    },
  },
  plugins: [],
};
