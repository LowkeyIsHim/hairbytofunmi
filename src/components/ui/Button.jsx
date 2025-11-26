import { twMerge } from 'tailwind-merge';
import { FaSpinner } from 'react-icons/fa';
import { premiumStyles, colors } from '@/styles/theme';

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  ...props 
}) {
  const baseStyle = 'btn-base';

  const variantStyles = {
    primary: `bg-[${colors.primary}] text-white hover:bg-[${colors.deepViolet}] ${premiumStyles.shadow}`,
    secondary: `bg-[${colors.secondary}] text-white hover:bg-pink-400 ${premiumStyles.shadow}`,
    ghost: 'bg-transparent border border-subtle-gray text-text hover:bg-subtleGray',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1DA851] flex items-center gap-2',
  };

  return (
    <button
      className={twMerge(baseStyle, variantStyles[variant], className, {
        'opacity-70 cursor-not-allowed': isLoading,
      })}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        children
      )}
    </button>
  );
}
