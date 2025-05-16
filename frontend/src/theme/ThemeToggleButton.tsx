import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative flex items-center w-[64px] h-[32px] rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
    >
      {/* Icons container */}
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <SunIcon className="w-4 h-4 text-yellow-500" />
        <MoonIcon className="w-4 h-4 text-blue-300" />
      </div>

      {/* Sliding thumb */}
      <div
        className={`absolute w-[26px] h-[26px] rounded-full bg-white shadow-md transform transition-transform duration-200 mx-[3px] ${
          isDark ? 'translate-x-[32px]' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
