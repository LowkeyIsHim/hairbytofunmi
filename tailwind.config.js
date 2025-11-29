/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure 'class' mode is enabled for Dark Mode switching
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- 1. Color Palette Expansion ---
      colors: {
        // --- FIX 1: ADDED DYNAMIC BACKGROUND/FOREGROUND UTILITIES ---
        // This generates classes like bg-background, text-background, ring-offset-background, etc.
        // The '<alpha-value>' placeholder ensures opacity utilities work (e.g., bg-background/50)
        'background': 'rgb(var(--background-rgb) / <alpha-value>)',
        'foreground': 'rgb(var(--foreground-rgb) / <alpha-value>)',
        
        // --- VVIP Luxury Palette (Existing Core) ---
        'brand-dark': '#121212',       // Deep Charcoal / Near Black (Base for Dark Mode BG)
        'brand-cream': '#FAF9F6',      // Off-White / Ivory Base (Base for Light Mode BG)
        
        // --- Primary Accent Gold (Now a Scale) ---
        'brand-gold': {
          DEFAULT: '#C5A059',          // Original Champagne/Antique Gold Accent
          'light': '#D6C097',          
          'dark': '#A07E44',           
        },
        
        // --- Secondary/Text Charcoal (Now a Scale) ---
        'brand-charcoal': {
          DEFAULT: '#444444',          
          'light': '#666666',          
          'dark': '#2A2A2A',           
        },
        
        // --- Surface Colors (Structured for background/cards/modals) ---
        // This generates classes like bg-surface-subtle-light and bg-surface-subtle-dark.
        'surface': {
            'light': '#FFFFFF',          
            'dark': '#1E1E1E',           
            'subtle-light': '#F3F2F0',   
            'subtle-dark': '#2A2A2A',    
        },
        // --- End of Surface Colors ---

        // --- Logo/Signature Clarity (Existing) ---
        'logo-primary': '#121212',     
        'logo-accent': '#C5A059',      
      },
      
      // --- 2. Typography Extension ---
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        signature: ['var(--font-playfair)', 'serif'], 
      },
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '1rem' }],  
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
        'heading-xl': ['5.5rem', { lineHeight: '1.05' }], 
        'heading-lg': ['3.5rem', { lineHeight: '1.1' }],  
      },

      // --- 3. Spacing Scale Extension ---
      spacing: {
        '0.5': '0.125rem', 
        '1.5': '0.375rem', 
        '2.5': '0.625rem', 
        '3.5': '0.875rem', 
        '18': '4.5rem',    
        '100': '25rem',    
        '120': '30rem',    
      },
      
      // --- 4. Custom Box Shadows ---
      boxShadow: {
        'luxury-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'luxury-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
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
