/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pennie: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fdd3a4',
          300: '#fcb975',
          400: '#f9913e',
          500: '#f77118',
          600: '#e8570e',
          700: '#c0410e',
          800: '#993413',
          900: '#7b2d13',
          950: '#421408',
        },
      },
    },
  },
  plugins: [],
};
