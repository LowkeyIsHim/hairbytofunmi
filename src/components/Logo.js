import Link from 'next/link';

/**
 * A sophisticated, font-based signature logo for the brand.
 * Uses the custom 'signature' font and 'brand-primary' color defined in tailwind.config.js.
 * * @param {string} className - Optional Tailwind CSS classes for custom sizing/spacing.
 */
const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/" className="group flex items-center">
        {/* Main Brand Name */}
        <span 
          className={`
            font-signature 
            text-3xl sm:text-4xl lg:text-5xl 
            font-bold 
            text-brand-primary 
            tracking-wider 
            transition-colors duration-300
            hover:text-brand-secondary 
            hover:shadow-text
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
