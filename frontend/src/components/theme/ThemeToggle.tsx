import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark');
      }}
      className="p-2 rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Toggle theme"
    >
      {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻'}
    </button>
  );
}
