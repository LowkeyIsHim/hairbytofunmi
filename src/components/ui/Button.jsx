import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  type = 'button',
  onClick,
  isLoading = false,
  variant = 'primary', // primary, secondary, danger, outline
  className = '',
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-full text-base font-medium transition duration-300 shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-muted-lavender text-cream-white hover:bg-deep-violet hover:shadow-premium px-6 py-3",
    secondary: "bg-soft-gold text-deep-violet hover:bg-soft-gold/80 px-4 py-2",
    danger: "bg-red-600 text-cream-white hover:bg-red-700 px-4 py-2",
    outline: "bg-transparent border border-muted-lavender text-muted-lavender hover:bg-muted-lavender hover:text-cream-white px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || props.disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
