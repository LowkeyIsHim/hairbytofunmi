/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7C9C0', // feminine pastel
        secondary: '#FFF1F0',
        accent: '#E57C7C'
      },
      fontFamily: {
        body: ['"Inter"', 'sans-serif'],
        heading: ['"Playfair Display"', 'serif']
      }
    },
  },
  plugins: [],
}
