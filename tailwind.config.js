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
          cream: '#F9F7F2',       // Richer, warmer cream
          dark: '#121212',        // Soft Black (Luxury standard)
          charcoal: '#2A2A2A',    // For paragraphs
          gold: '#C5A059',        // Muted metallic gold (not yellow)
          goldLight: '#E3C88D',
          mauve: '#8E7F85',       // Sophisticated accent
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-overlay': 'linear-gradient(to bottom, rgba(18,18,18,0.2), rgba(18,18,18,0.8))',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s linear infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
};
