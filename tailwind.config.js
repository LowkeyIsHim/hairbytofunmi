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
        'deep-violet': '#5F4B8B', // Primary Accent
        'soft-blush': '#F7D1BA', // Secondary Accent
        'cream': '#FAFAFA', // Background
        'dark-text': '#333333',
        'subtle-gray': '#E5E7EB',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 10px rgba(95, 75, 139, 0.1)', // Subtle shadow
      },
    },
  },
  plugins: [],
}
