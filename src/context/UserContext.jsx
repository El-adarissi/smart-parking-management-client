/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  // Retrieve user information from local storage on initial load
  const storedUserinfos = JSON.parse(localStorage.getItem("userInfos")) || {
    user_id: null,
    vehicleName: null,
    loginTime: null,
    ownerName: null,
    role: null,
  };

  const [userinfos, setUserinfos] = useState(storedUserinfos);
  
  // Save user information to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userInfos", JSON.stringify(userinfos));
  }, [userinfos]);

  return (
    <UserContext.Provider value={{ userinfos, setUserinfos }}>
      {children}
    </UserContext.Provider>
  );
};