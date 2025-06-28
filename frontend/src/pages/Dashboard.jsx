import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBarMain from "../components/SideBar";
import {
  UserCircleIcon,
  ClipboardListIcon,
  FolderIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useAuth } from "../globalState/authContext";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth(); // ✅ get user from auth context
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleClickLogout = () => {
    handleLogout();
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  const handleNavigateProjects = () => {
    navigate("/projects");
  };

  const cards = [
    {
      icon: UserCircleIcon,
      title: "Your Profile",
      desc: "View and edit your account details, preferences, and settings.",
      color: "bg-blue-500/20",
      function: handleNavigateProfile,
    },
    {
      icon: FolderIcon,
      title: "Projects",
      desc: "Explore and collaborate on your projects.",
      color: "bg-yellow-500/20",
      function: handleNavigateProjects,
    },
    {
      icon: LogOutIcon,
      title: "Logout",
      desc: "Safely log out from your account.",
      color: "bg-red-500/20",
      function: handleClickLogout,
    },
    (user?.role === "pm" || user?.role === "admin") && {
      icon: ClipboardListIcon,
      title: "Add Project",
      desc: "Add a new project and assign tasks and team members.",
      color: "bg-green-500/20",
      function: () => navigate("/add-project"),
    },
  ].filter(Boolean); // ✅ remove false if condition fails

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
      } transition-colors duration-300`}
    >
      <SideBarMain />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white"
          >
            Welcome to Your Dashboard {user?.name ? user.name : ""}
          </motion.h1>

          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-white/80"
              onClick={handleNavigateProfile}
            >
              <UserCircleIcon className="w-8 h-8" />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 text-white" />
              ) : (
                <MoonIcon className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-white/20 transition-all hover:shadow-2xl ${card.color} bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg`}
            >
              <card.icon className="w-12 h-12 mb-3 text-white" />
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="text-white/70 mt-2 text-center text-sm">
                {card.desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                onClick={card.function}
              >
                Go to {card.title}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
