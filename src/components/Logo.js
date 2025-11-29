import Link from 'next/link';
import { useTheme } from '../context/ThemeContext'; // Assuming you use ThemeContext for light/dark mode

/**
 * A sophisticated, font-based signature logo for the brand.
 * Uses the custom 'signature' font and brand colors defined in tailwind.config.js.
 * @param {string} className - Optional Tailwind CSS classes for custom sizing/spacing.
 */
const Logo = ({ className = '' }) => {
  // Use the theme context to apply appropriate colors for light/dark mode
  // Assuming a basic structure where 'theme' has a 'mode' or similar property
  // const { theme } = useTheme(); 
  // const isDark = theme === 'dark'; // Or similar logic

  // We'll use classes that automatically handle the dark mode based on the 'darkMode: class' setting:
  const baseColor = 'text-brand-dark dark:text-brand-cream'; // Dark text in light mode, Cream text in dark mode
  const accentColor = 'hover:text-logo-accent dark:hover:text-logo-accent'; // Gold accent on hover

  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/" className="group flex items-center">
        {/* Main Brand Name */}
        <span 
          className={`
            font-signature 
            text-4xl lg:text-5xl 
            font-extrabold 
            ${baseColor} 
            tracking-wide 
            transition-all duration-300
            ${accentColor}
            p-1
          `}
        >
          Hair by Tofunmi
        </span>
      </Link>
    </div>
  );
};

export default Logo;
