// src/components/Logo.js (UPGRADED LOGO)
import Link from 'next/link';

/**
 * A sophisticated logo featuring a custom brand icon and the elegant signature text.
 * Uses the new rich Sapphire and Gold palette.
 */
const Logo = ({ className = '' }) => {

  const iconColor = '#A58B5C'; // brand-secondary (Gold)
  // Text color is primary in dark mode, and dark in light mode (for contrast on light navbar/modal)
  const textColor = 'text-brand-primary dark:text-brand-text'; 

  return (
    // The logo group itself
    <div className={`flex items-center ${className}`}>
      <Link 
        href="/" 
        className="group flex items-center space-x-2 transition-opacity duration-300 hover:opacity-90"
      >
        
        {/* 1. Brand Icon (Stylized Flow/Ribbon Icon) */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Elegant Flowing Lines in Gold */}
            <path 
                d="M 20 50 C 35 30, 65 30, 80 50 C 65 70, 35 70, 20 50 Z" 
                stroke={iconColor} 
                strokeWidth="4" 
                fill="none" 
            />
             {/* Center dot/jewel accent */}
            <circle cx="50" cy="50" r="5" fill={iconColor} />
            
          </svg>
        </div>

        {/* 2. Brand Signature Text (Slightly smaller, refined weight) */}
        <span 
          className={`
            font-signature 
            text-2xl sm:text-3xl lg:text-4xl 
            font-light 
            ${textColor} 
            tracking-widest 
            transition-all duration-300
            hover:text-logo-accent
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
