// postcss.config.js (Old - needs update if using the package directly)
module.exports = {
  plugins: {
    tailwindcss: {}, // <--- This is the source of the error if it's the main package
    autoprefixer: {},
  },
}
