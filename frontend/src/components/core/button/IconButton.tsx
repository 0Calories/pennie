import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, type ButtonProps } from './Button';
import { buttonVariants } from './button-variants';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <Button
        className={twMerge(
          'inline-flex items-center gap-2',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
