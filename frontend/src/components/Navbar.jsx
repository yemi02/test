import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 ">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Letflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to={"/"} className="hover:underline">
            Movies
          </Link>
          <Link to={"/"} className="hover:underline">
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-5 cursor-pointer" />
        </Link>

        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-5 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu className="size-5 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border border-gray-800 rounded">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;