// src/components/ui/Button.jsx
import { motion } from 'framer-motion';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  isLoading = false,
  ...props
}) {
  let baseStyles = 'px-6 py-3 rounded-lg text-center font-bold transition-all duration-300 focus:outline-none focus:ring-4';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-deep-violet text-white hover:bg-[#6A1B9A] focus:ring-deep-violet/50 shadow-premium';
      break;
    case 'secondary':
      variantStyles = 'bg-off-white border border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white focus:ring-rose-gold/50';
      break;
    case 'whatsapp':
      variantStyles = 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600/50 shadow-md';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600/50';
      break;
    default:
      variantStyles = 'bg-subtle-gray text-deep-violet hover:bg-subtle-gray/80';
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center space-x-2">
          <AiOutlineLoading className="animate-spin" size={20} />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
