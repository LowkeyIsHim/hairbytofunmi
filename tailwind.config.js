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
        'cream-white': '#FFFBF5', // Background
        'muted-lavender': '#A399CC', // Primary CTA/Accents
        'deep-violet': '#3A2D5C', // Text/Headers
        'soft-gold': '#C8A35E', // Highlight/Border
        'subtle-gray': '#EAEAEA',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Modern, readable font
        serif: ['"Playfair Display"', 'serif'], // Elegant display font
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(163, 153, 204, 0.2)', // Soft, elegant shadow
      }
    },
  },
  plugins: [],
}
