import Link from 'next/link';
import { useTheme } from '../context/ThemeContext'; // Assuming this context is still used

/**
 * A sophisticated logo featuring a brand icon and the elegant signature text.
 * Uses the custom 'signature' font and VVIP brand colors.
 */
const Logo = ({ className = '' }) => {

  // Define colors based on the Tailwind config and theme mode for high contrast
  const iconFillColor = '#C5A059'; // brand-gold
  const textColor = 'text-brand-dark dark:text-brand-cream'; // Dark text in light mode, Cream in dark mode
  const textHoverAccent = 'hover:text-logo-accent dark:hover:text-logo-accent'; // Gold accent on hover

  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/" className="group flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80">
        
        {/* 1. Brand Icon (Stylized 'H' inside a flowing circle) */}
        <div className="w-8 h-8 sm:w-10 sm:h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Outer Circle/Flow Shape in Gold */}
            <circle cx="50" cy="50" r="48" stroke={iconFillColor} strokeWidth="4" />
            
            {/* Stylized 'H' Initial in Gold */}
            <text 
                x="50" 
                y="65" 
                fontFamily="Playfair Display, serif" 
                fontSize="45" 
                fontWeight="bold" 
                fill={iconFillColor}
                textAnchor="middle" 
                dominantBaseline="middle"
            >
                H
            </text>
            
          </svg>
        </div>

        {/* 2. Brand Signature Text */}
        <span 
          className={`
            font-signature 
            text-3xl sm:text-4xl lg:text-5xl 
            font-extrabold 
            ${textColor} 
            tracking-wide 
            transition-all duration-300
            ${textHoverAccent}
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
