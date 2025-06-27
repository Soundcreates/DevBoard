// src/pages/Profile.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <p className="text-white text-lg animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 space-y-8 animate-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-white/30"
      >
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-white/30"
          />
          <h1 className="text-white text-4xl font-bold">{user.name}</h1>
        </div>

        <div className="mt-6 text-white text-lg flex space-x-6">
          <p>Projects: 0</p>
          <p>Tasks: 0</p>
        </div>

        <div className="mt-4 flex space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            View Projects
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            View Tasks
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
