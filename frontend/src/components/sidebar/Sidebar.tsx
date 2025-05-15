import { ThemeToggle } from '../../theme/ThemeToggle';
import { SidebarButton } from './SidebarButton';

const Navbar = () => {
  return (
    <aside className="fixed left-0 top-0 h-dvh w-64 bg-white dark:bg-slate-800 shadow-lg transition-colors">
      <div className="flex flex-col h-full p-4">
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="flex items-center">
            <img src="/logo.png" alt="Pennie Logo" className="h-16 w-auto object-contain" />
            <p className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-100">
              Pennie
            </p>
          </div>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col space-y-4">
          <SidebarButton text="Home" />
          <SidebarButton text="Dashboard" />
          <SidebarButton text="Transactions" />
          <SidebarButton text="Settings" />
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
