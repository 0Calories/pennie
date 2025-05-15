import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NavbarButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
  disabled?: boolean;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  onClick,
  className = '',
  variant = 'default',
  disabled = false,
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    default: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    ></button>
  );
};

export default NavbarButton;
