import React, { useState } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../globalState/authContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const { setUser } = useAuth();

  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = async (e) => {
    const { email, password } = formData;
    e.preventDefault();
    // Handle login logic here
    try {
      console.log("Login attempted with:", { email, password });
      const response = await api.post("/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-background"
      } transition-colors duration-300`}
    >
      {/* Dark Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </motion.button>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="text-white block mb-1 font-medium">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Enter your email"
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-white block mb-1 font-medium"
          >
            Password
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Enter your password"
            aria-required="true"
            autoComplete="current-password"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <a
            href="/register"
            className="text-white/80 hover:text-white text-sm transition"
          >
            Sign Up
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-purple-600 dark:bg-purple-700 text-white font-bold py-3 rounded-xl transition hover:bg-purple-500 hover:shadow-xl"
          aria-label="Login"
        >
          Login
        </motion.button>
        <div className=" text-center">
          <p className="italic text-blue-500">{error}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
