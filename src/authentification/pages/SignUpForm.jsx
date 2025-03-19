/* eslint-disable react/prop-types */
import React, { useState } from "react";
import logo from "../../assets/smart-parking-logo.webp";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";

const SignUpForm = ({ setIsLogin }) => {
    const [vehicleName, setVehicleName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [password, setPassword] = useState("");
    const [bankNumber, setBankNumber] = useState("");
    const [user_id, setUser_id] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleBankNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 14) {
            setBankNumber(value);
        }
    };

    const handleSignUp = async () => {
        if (!vehicleName || !ownerName || !user_id || !bankNumber || !password) {
            setError("All fields are required.");
            return;
        }

        if (bankNumber.length !== 14) {
            setError("Bank Number must be 14 digits.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const payload = {
                ownerName,
                password,
                vehicle_name: vehicleName,
                user_id,
                bankNumber
            };

            console.log("Sending payload:", payload);
            const resp = await httpClient.post(`${API_BASE_URL}/register`, payload, { withCredentials: true });

            if (resp.data && resp.data.message) {
                alert("Registration successful!");
                setIsLogin(true);
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            if (error.response) {
                setError(error.response.data.error || "An error occurred.");
            } else {
                setError("Cannot connect to the server. Please try again.");
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
            <h3 className="text-xl font-semibold text-white pt-2">Create Account!</h3>

            <div className="flex flex-col items-center justify-center w-full mt-2">
                <input type="text" placeholder="Vehicle Name" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2"/>
                <input type="text" placeholder="Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2"/>
                <input type="text" placeholder="User ID" value={user_id} onChange={(e) => setUser_id(e.target.value)} className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2"/>
                <input type="text" placeholder="Bank Number" value={bankNumber} onChange={handleBankNumberChange} className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl px-4 py-2 w-full border-[1px] border-blue-400 m-2"/>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button onClick={handleSignUp} disabled={isLoading} className="rounded-2xl m-4 text-white bg-blue-400 w-full px-4 py-2 shadow-md hover:text-black hover:bg-green-400 transition duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
            </div>

            <p className="text-white mb-4 text-sm font-medium">Already have an account?</p>
            <p className="text-white mb-4 text-sm font-medium cursor-pointer" onClick={() => setIsLogin(true)}>
                Sign In to your Account?
            </p>
            <Link to="/">
                <p className="text-white mb-4 text-sm font-medium cursor-pointer underline">
                    Back To Home
                </p>
            </Link>
        </div>
    );
};

export default SignUpForm;
