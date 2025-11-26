import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CFB998", // Gold Accent
        secondary: "#FDF2F8", // Soft Rose/Pastel Background
        dark: "#1C1917", // Rich Black Text/Buttons
        light: "#FFFFFF",
      },
      fontFamily: {
        serif: ['var(--font-playfair)'], // Elegant Heading Font
        sans: ['var(--font-inter)'],     // Clean Body Font
      }
    },
  },
  plugins: [],
};
export default config;
