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
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f8', // Very light pink
          100: '#fce7f3',
          500: '#ec4899', // Pink accent
          800: '#9d174d', // Dark pink
          900: '#831843', // Deep styling
          gold: '#d4af37', // Luxury Gold
          dark: '#1c1917', // Charcoal
        }
      }
    },
  },
  plugins: [],
};
