/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#213547',
          dark: 'rgba(255, 255, 255, 0.87)',
        },
      },
    },
  },
  plugins: [],
};
