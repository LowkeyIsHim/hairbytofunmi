/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-violet': '#4A148C', // Deep, mature purple
        'rose-gold': '#B76E79',   // Elegant, warm gold/rose
        'subtle-gray': '#EAEAEA',
        'off-white': '#FDFDFD',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Elegant serif for headers
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(74, 20, 140, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
