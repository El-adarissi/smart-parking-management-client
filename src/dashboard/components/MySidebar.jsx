/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import logo from "../../assets/smart-parking-logo.webp";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants/index";
import classNames from "classnames";
import httpClient from "../../authentification/httpClient";
import { UserContext } from "../../context/UserContext";

const MySidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userinfos, setUserinfos } = useContext(UserContext);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  
  const linkClass =
    "flex items-center gap-2 p-2 rounded-md hover:bg-neutral-800";

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
  
      const logoutUrl = `${API_BASE_URL}/logout`;
  
      const response = await httpClient.post(logoutUrl, {}, { withCredentials: true });
  
      console.log("Logout response:", response.data);
  
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfos");
  
      setUserinfos(null);
  
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };
  
  
  const filteredLinks = DASHBOARD_SIDEBAR_LINKS.filter((link) => {
    if (userinfos.user_id !== "1000") {
      return link.key !== "customers" && link.key !== "manage-slots"; 
    }
    return true;
  });

  return (
    <>
      <div
        className={classNames(
          "fixed top-0 left-0 h-full bg-neutral-900 text-white p-3 transform lg:transform-none transition-transform w-60 z-40",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Close Button for Small Screens */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-full"
          onClick={toggleSidebar}
        >
          <HiX size={24} />
        </button>

        <div className="flex">
          <img src={logo} alt="smart-parking-logo" width={100} height={100} />
        </div>

        <div className="py-8 flex flex-1 flex-col gap-3">
          {filteredLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={classNames(
                pathname === link.path
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400",
                linkClass
              )}
              onClick={toggleSidebar} 
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-neutral-700 text-red-500 cursor-pointer">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
            <div
              key={link.label}
              className={classNames(
                pathname === link.path
                  ? "bg-neutral-700 text-white"
                  : "text-red-500",
                linkClass
              )}
              onClick={() => {
                if (link.path === "/logout") {
                  handleLogout();
                } else {
                  toggleSidebar();
                  navigate(link.path);
                }
              }}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default MySidebar;
