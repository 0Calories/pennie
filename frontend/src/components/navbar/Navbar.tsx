import NavbarButton from "./NavbarButton";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar = () => {
  return (
    <aside className="fixed left-0 top-0 h-dvh w-64 bg-background-light dark:bg-background-dark shadow-lg transition-colors">
      <div className="flex flex-col h-full p-4">
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="flex items-center">
            <img src="/logo.png" alt="Pennie Logo" className="h-16 w-auto object-contain" />
            <p className="font-sans text-2xl font-bold text-text-light dark:text-text-dark">Pennie</p>
          </div>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col space-y-4">
          <NavbarButton text="Home" className="w-full" />
          <NavbarButton text="Dashboard" className="w-full" />
          <NavbarButton text="Transactions" className="w-full" />
          <NavbarButton text="Settings" className="w-full" />
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
