import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  className = '',
  ...props
}) {
  const inputClasses = "w-full p-3 border border-subtle-gray rounded-lg focus:ring-2 focus:ring-muted-lavender focus:border-muted-lavender transition duration-200 bg-white text-deep-violet";

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-deep-violet">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={4}
          className={`${inputClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...props}
        />
      )}
      
    </div>
  );
}
