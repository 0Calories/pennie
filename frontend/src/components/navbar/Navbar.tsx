import NavbarButton from "./NavbarButton";

const Navbar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="Pennie Logo" className="h-16 w-auto object-contain" />
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
