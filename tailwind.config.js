/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure 'class' mode is enabled for Dark Mode switching
  // This is crucial for controlling dark mode via a parent class (e.g., <html class="dark">)
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 🎨 Extending the Default Theme
    extend: {
      // --- 1. Color Palette Expansion ---
      colors: {
        // --- VVIP Luxury Palette (Existing Core) ---
        'brand-dark': '#121212',       // Deep Charcoal / Near Black (Base for Dark Mode BG)
        'brand-cream': '#FAF9F6',      // Off-White / Ivory Base (Base for Light Mode BG)
        
        // --- Primary Accent Gold (Now a Scale) ---
        'brand-gold': {
          DEFAULT: '#C5A059',          // Original Champagne/Antique Gold Accent
          'light': '#D6C097',          // Lighter for hover/subtle lines
          'dark': '#A07E44',           // Darker for active/borders
        },
        
        // --- Secondary/Text Charcoal (Now a Scale) ---
        'brand-charcoal': {
          DEFAULT: '#444444',          // Muted Dark Text/Accent
          'light': '#666666',          // Lighter for subtle text/icons
          'dark': '#2A2A2A',           // Darker for high contrast text
        },
        
        // --- Surface Colors (For structured backgrounds/cards/modals) ---
        'surface': {
          'light': '#FFFFFF',          // Pure white for elements in light mode
          'dark': '#1E1E1E',           // Slightly lighter dark than brand-dark for depth
          'subtle-light': '#F3F2F0',   // Very subtle background texture in light mode
          'subtle-dark': '#2A2A2A',    // Very subtle background texture in dark mode
        },

        // --- Logo/Signature Clarity (Existing) ---
        'logo-primary': '#121212',     // Primary text color (Dark Mode will handle the cream switch)
        'logo-accent': '#C5A059',      // Gold accent for icon/hover
      },
      
      // --- 2. Typography Extension ---
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        signature: ['var(--font-playfair)', 'serif'], // Use the elegant Playfair font for the signature look
      },
      // Custom Text Size Scale for an editorial feel
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '1rem' }],  // Very small labels
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
        'heading-xl': ['5.5rem', { lineHeight: '1.05' }], // Custom large heading
        'heading-lg': ['3.5rem', { lineHeight: '1.1' }],  // Custom medium heading
      },

      // --- 3. Spacing Scale Extension ---
      // Adds finer control for small padding/margins and extra-large spacing
      spacing: {
        '0.5': '0.125rem', // 2px
        '1.5': '0.375rem', // 6px
        '2.5': '0.625rem', // 10px
        '3.5': '0.875rem', // 14px
        '18': '4.5rem',    // 72px
        '100': '25rem',    // 400px
        '120': '30rem',    // 480px
      },
      
      // --- 4. Custom Box Shadows ---
      boxShadow: {
        'luxury-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'luxury-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        // Subtle gold glow for focused elements or hero cards
        'gold-glow': '0 0 10px rgba(197, 160, 89, 0.3)', 
        'gold-glow-lg': '0 0 20px rgba(197, 160, 89, 0.5)',
      },

      // --- 5. Keyframes & Animation (Existing) ---
      keyframes: {
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 30s ease-in-out infinite',
      },
      
    }, // end of extend
  }, // end of theme
  plugins: [],
}
