/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { HiMenu, HiUser } from "react-icons/hi";
import logo from "../../assets/smart-parking-logo.webp";
import { UserContext } from "../../context/UserContext";

const Header = ({ toggleSidebar }) => {
  const { userinfos } = useContext(UserContext); 

  return (
    <header className="fixed top-0 left-0 right-0 bg-neutral-800 text-white p-4 flex justify-between items-center shadow-lg z-30">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-neutral-700 rounded-full"
          onClick={toggleSidebar}
        >
          <HiMenu size={24} />
        </button>
        <img src={logo} alt="Smart Parking Logo" className="h-10 w-auto" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {userinfos.ownerName}</span>
        <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
          <HiUser size={20} className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;