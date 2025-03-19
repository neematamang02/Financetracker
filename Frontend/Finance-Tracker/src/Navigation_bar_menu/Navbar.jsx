import { useState } from "react";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ROUTES from "../routes/routes";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  return (
    <nav className="flex justify-between items-center py-8 px-10 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="logo">
        <Link to={ROUTES.HOME} className="font-bold">
          Logo
        </Link>
      </div>

      {/* Navigation Links for Desktop */}
      <ul className="hidden md:flex flex-row gap-10">
        <li>
          <Link to={ROUTES.HOME} className="text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link to={ROUTES.PORTFOLIO} className="hover:text-primary">
            Portfolio
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT_ME} className="hover:text-primary">
            About Me
          </Link>
        </li>
        <li>
          <Link to={ROUTES.TESTIMONIALS} className="hover:text-primary">
            Testimonials
          </Link>
        </li>
      </ul>

      {/* Contact Me Button for Desktop */}
      <div className="hidden md:block">
        <Buttons
          buttontext="Contact Me"
          className="hover:bg-primary hover:text-white text-primary py-2 px-4 rounded border-2 border-primary"
          navigateto={ROUTES.CONTACT_FORM}
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 p-8 mt-16">
          <li>
            <Link
              to={ROUTES.HOME}
              className="text-primary"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.PORTFOLIO}
              className="hover:text-primary"
              onClick={toggleMenu}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.ABOUT_ME}
              className="hover:text-primary"
              onClick={toggleMenu}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.TESTIMONIALS}
              className="hover:text-primary"
              onClick={toggleMenu}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Buttons
              buttontext="Contact Me"
              className="hover:bg-primary hover:text-white text-primary py-2 px-4 rounded border-2 border-primary w-full"
              navigateto={ROUTES.CONTACT_FORM}
              onClick={toggleMenu}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
