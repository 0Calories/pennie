import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  const baseClasses =
    'bg-pennie-500 hover:bg-pennie-600 px-3 py-1 rounded text-white transition-colors';

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
