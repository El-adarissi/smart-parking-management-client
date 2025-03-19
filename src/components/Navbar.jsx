import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as Link1 } from "react-scroll";

import { FaXmark, FaBars } from "react-icons/fa6";
import logo from "/src/assets/smart-parking-logo.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //   naviterms
  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Features", path: "features" },
    { link: "FAQs", path: "faqs" },
    { link: "Contact", path: "contact" },
  ];
  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            className="text-2xl font-semibold  flex items-center space-x-3"
          >
            <img
              src={logo}
              alt="LOGO"
              className="inline-block items-center text-gray900"
              height={100}
              width={100}
            />
            <span className="text-[#263238]"></span>
          </a>

          {/* nav items for large devices */}

          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link1
                to={path} // This should match the "id" of the target section
                key={path}
                spy={true} // Highlight active section
                smooth={true} // Enable smooth scrolling
                offset={-100} // Adjust scrolling offset
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium"
              >
                <a href=""> {link} </a>
              </Link1>
            ))}
          </ul>

          {/* btn for large devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            <Link
              to="authentificate"
              className="hidden lg:flex items-center text-brandPrimary hover:text-gray900"
            >
              <a href="authentificate"> Login </a>
            </Link>
            <Link
              to="/authentificate"
              className="bg-brandPrimary  text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey"
            >
              <a href=""> Sign Up </a>
            </Link>
          </div>

          {/* Menu button for mobile devices */}
          <div className="md:hidden">
            <button
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
              onClick={toggleMenu} // Ensure this function toggles `isMenuOpen`
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-neutralDGrey" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Nav items for mobile devices */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            
            <Link1
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              className="block text-base text-white hover:text-brandPrimary first:font-medium"
            >
              <a href=""> {link} </a>
            </Link1>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
