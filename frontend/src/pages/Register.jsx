import React, { useState } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";

const Register = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempted with:", {
      name,
      email,
      password,
      confirmPassword,
    });
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

      {/* Registration Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="text-white block mb-1 font-medium">
            Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Enter your name"
            aria-required="true"
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-white block mb-1 font-medium">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Enter your email"
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <div className="mb-4">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Create a password"
            aria-required="true"
            autoComplete="new-password"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirm-password"
            className="text-white block mb-1 font-medium"
          >
            Confirm Password
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-700/50 border border-white/기술
/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/80 transition hover:shadow-lg"
            placeholder="Confirm your password"
            aria-required="true"
            autoComplete="new-password"
          />
        </div>

        <div className="flex justify-end mb-6">
          <a
            href="/"
            className="text-white/80 hover:text-white text-sm transition"
          >
            Already have an account? Sign In
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-purple-600 dark:bg-purple-700 text-white font-bold py-3 rounded-xl transition hover:bg-purple-500 hover:shadow-xl"
          aria-label="Register"
        >
          Register
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
