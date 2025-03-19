import React, { useState } from "react";
import LoginForm from "../pages/LoginForm";
import SignUpForm from "../pages/SignUpForm";
import logo from "../../assets/smart-parking.jpeg"; 

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen md:py-2"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <main className="w-full md:w-1/2 flex items-center justify-center">
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <SignUpForm setIsLogin={setIsLogin} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Authentification;