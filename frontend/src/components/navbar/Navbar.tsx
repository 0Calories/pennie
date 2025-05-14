import NavbarButton from "./NavbarButton";

const Navbar = () => {
  return (
    <header>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Pennie Logo" className="h-16 w-auto object-contain" />
            <NavbarButton text="Home" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
