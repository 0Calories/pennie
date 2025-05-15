import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-3 py-1 rounded text-white transition-colors';
  const variantClasses =
    variant === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
