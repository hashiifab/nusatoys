import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CartIcon from "../../ui/CartIcon";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Nusatoys" className="h-8" />
            </Link>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <HashLink
              smooth
              to="/#koleksi"
              className="text-gray-600 hover:text-gray-900"
            >
              Koleksi
            </HashLink>
            <HashLink
              smooth
              to="/#tentang-kami"
              className="text-gray-600 hover:text-gray-900"
            >
              Tentang Kami
            </HashLink>
            <HashLink
              smooth
              to="/#edukasi-blog"
              className="text-gray-600 hover:text-gray-900"
            >
              Edukasi & Blog
            </HashLink>
            <HashLink
              smooth
              to="/#kontak"
              className="text-gray-600 hover:text-gray-900"
            >
              Kontak
            </HashLink>
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Masuk/Daftar
            </a>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <CartIcon />
            </Link>
          </div>

          {/* Mobile Right: Cart + Burger */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <CartIcon />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <HashLink
                smooth
                to="/#koleksi"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Koleksi
              </HashLink>
              <HashLink
                smooth
                to="/#tentang-kami"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Tentang Kami
              </HashLink>
              <HashLink
                smooth
                to="/#edukasi-blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Edukasi & Blog
              </HashLink>
              <HashLink
                smooth
                to="/#kontak"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Kontak
              </HashLink>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Masuk/Daftar
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;