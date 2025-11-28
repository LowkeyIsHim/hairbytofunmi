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
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        brand: {
          cream: '#FAF9F6', // Slightly brighter off-white (Alabaster)
          gold: '#C5A059',  // A true metallic champagne gold
          goldLight: '#E5C585', // Highlight gold for gradients
          mauve: '#9D8189', // Dustier, softer mauve
          dark: '#121212',  // Richer luxury black
          gray: '#4A4A4A',  // Slate gray for subtext
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #C5A059, #E5C585, #C5A059)',
      }
    },
  },
  plugins: [],
};
