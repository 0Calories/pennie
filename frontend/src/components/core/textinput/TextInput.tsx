import { ChangeEvent, FocusEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  onFocus,
  onBlur,
}: TextInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      className={twMerge(
        'w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pennie-500 p-3 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    />
  );
}
