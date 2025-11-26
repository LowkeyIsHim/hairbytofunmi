module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8fb",
          100: "#fdeaf2",
          200: "#f7cfe0",
          300: "#f0b0cc",
          400: "#ea84b2",
          500: "#df5d98",
          600: "#c2457f",
          700: "#9b3561",
          800: "#732443",
          900: "#4b1529"
        },
        neutralSoft: {
          50: "#fbfbfb",
          100: "#f5f5f6",
          200: "#ededee",
          300: "#d9d7d8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
