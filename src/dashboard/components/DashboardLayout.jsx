import React, { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import MySidebar from "./MySidebar";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { userinfos, setUserinfos } = useContext(UserContext); 

  useEffect(() => {
    const savedUserInfos = JSON.parse(localStorage.getItem("userInfos"));
    if (savedUserInfos) {
      setUserinfos(savedUserInfos); 
    } else {
      navigate("/login"); 
    }
  }, [navigate, setUserinfos]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header toggleSidebar={toggleSidebar} />
      <MySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="p-4 lg:ml-60 mt-16">
        <Outlet /> 
      </div>
    </div>
  );
};

export default DashboardLayout;