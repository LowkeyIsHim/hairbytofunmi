import Link from 'next/link';

/**
 * A sophisticated logo featuring a custom brand icon and the elegant signature text.
 * Uses the custom 'signature' font and VVIP brand colors from tailwind.config.js.
 */
const Logo = ({ className = '' }) => {
  const iconFillColor = '#A37A4B'; // brand-gold
  const textColor = 'text-brand-dark dark:text-brand-cream'; 
  const textHoverAccent = 'hover:text-logo-accent dark:hover:text-logo-accent'; 

  return (
    <div className={`flex items-center ${className}`}>
      <Link 
        href="/" 
        className="group flex items-center space-x-2 transition-opacity duration-300 hover:opacity-90"
        aria-label="Hair by Tofunmi Home"
      >
        
        {/* 1. Brand Icon (Stylized 'H' Initial in a square frame) */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full"
          >
            {/* Elegant Square/Frame in Gold */}
            <rect x="0" y="0" width="100" height="100" stroke={iconFillColor} strokeWidth="6" fill="none" />
            
            {/* Stylized 'H' Initial */}
            <text 
                x="50" 
                y="68" // Adjusted y-position for better centering
                fontFamily="serif" // General serif for compatibility
                fontSize="60" 
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
