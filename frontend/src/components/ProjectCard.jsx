import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FolderIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../globalState/authContext";
import api from "../services/api";

const ProjectCard = ({ project, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate(`/view-project/${project._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-white/20 transition-all hover:shadow-2xl bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg"
    >
      <FolderIcon className="w-12 h-12 mb-3 text-white" />
      <h3 className="text-xl font-semibold text-white mb-2 text-center">
        {project.title}
      </h3>
      <p className="text-white/70 text-center text-sm line-clamp-3">
        {project.description || "No description provided."}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleViewProject(project._id)}
        className="mt-4 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
      >
        View Project
      </motion.button>
      {user?.role === "admin" && (
        <div
          className="bg-red-500 text-white rounded-md mt-2 px-3 cursor-pointer hover:bg-red-700 transition-all duration-300"
          onClick={onDelete}
        >
          <p className="text-lg">Delete</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
