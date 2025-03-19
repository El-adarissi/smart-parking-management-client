/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/smart-parking-logo.webp";
import httpClient from "../httpClient";
import { UserContext } from "../../context/UserContext"; 

const LoginForm = ({ setIsLogin }) => {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserinfos } = useContext(UserContext); 
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async () => {
    if (!user_id || !password) {
      setError("User ID and Vehicle Name are required.");
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    try {
      const payload = {
        user_id: user_id,
        password: password,
      };
  
      console.log("Sending payload:", payload); 
      const resp = await httpClient.post(`${API_BASE_URL}/login`, payload, {
        withCredentials: true,
      });
  
      if (resp.data && resp.data.message) {
        alert("Login successful!");
        console.log(resp.data);
  
        const userData = {
          user_id: resp.data.user.user_id,
          vehicleName: resp.data.user.vehicleName,
          ownerName: resp.data.user.ownerName,
          loginTime: new Date().toLocaleString(),
          role: resp.data.user.role,
        };
  
        // Set userinfos in context
        setUserinfos(userData);
  
        // Save user data to localStorage
        localStorage.setItem("userInfos", JSON.stringify(userData));
  
        // Redirect to dashboard
        navigate("/dashboard/main");
      } else {
        setError("Invalid User ID or Vehicle Name.");
      }
    } catch (error) {
      console.error("Error during login:", error); 
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="text-black rounded-2xl shadow-2xl flex flex-col w-full max-w-md p-6">
      <h2 className="p-3 text-3xl font-bold text-white">
        <img src={logo} alt="logo" className="w-48 h-auto" />
      </h2>
      <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
      <h3 className="text-xl font-semibold text-white pt-2">Sign In!</h3>
      <div className="flex space-x-2 m-4 items-center justify-center">
        <div className="socialIcon border-white"></div>
        <div className="socialIcon border-white"></div>
        <div className="socialIcon border-white"></div>
      </div>

      {/* Inputs */}
      <div className="flex flex-col items-center justify-center w-full mt-2">
        <input
          type="text"
          className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="User ID"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
        />
        <input
          type="password"
          className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="rounded-2xl m-4 text-white bg-blue-400 w-full px-4 py-2 shadow-md hover:text-black hover:bg-green-400 transition duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
      <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
      <p className="text-white mb-4 text-sm font-medium">Dont have an account?</p>
      <p
        className="text-white mb-4 text-sm font-medium cursor-pointer"
        onClick={() => setIsLogin(false)}
      >
        Create a New Account
      </p>
      <Link to="/">
        <p className="text-white mb-4 text-sm font-medium cursor-pointer underline">
          Back To Home
        </p>
      </Link>
    </div>
  );
};

export default LoginForm;