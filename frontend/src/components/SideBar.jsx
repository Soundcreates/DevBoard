import React from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  ClipboardListIcon,
  FolderIcon,
  LogOutIcon,
} from "lucide-react";
import { useAuth } from "../globalState/authContext";
import { useNavigate } from "react-router";

function SideBarMain() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    handleLogout();
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 h-full w-64 bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg p-6 shadow-xl border-r border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
        <nav className="space-y-4">
          {[
            {
              icon: UserCircleIcon,
              label: "Profile",
              function: handleNavigateProfile,
            },
            { icon: ClipboardListIcon, label: "Tasks" },
            { icon: FolderIcon, label: "Projects" },
          ].map((item, index) => (
            <motion.a
              key={index}
              whileHover={{ scale: 1.1, x: 10 }}
              className="flex items-center text-white/80 hover:text-white transition-colors"
              onClick={item.function}
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span>{item.label}</span>
            </motion.a>
          ))}
        </nav>
      </motion.aside>
    </div>
  );
}

export default SideBarMain;
