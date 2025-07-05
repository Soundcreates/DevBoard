import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";
import { useTheme } from "../globalState/themeContext"; // using your darkMode context
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const ProjectsPage = () => {
  const { user, isLoading } = useAuth();
  const { darkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/project/getProjects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjects(response.data.projects || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/api/project/deleteProjects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Project deleted");
      fetchProjects();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (isLoading || !user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-neutral-900 text-white"
            : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white"
        }`}
      >
        <p className="text-lg">Loading your projects...</p>
      </div>
    );
  }

  function handleNavigation() {
    navigate(-1);
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-8 space-y-8 animate-background ${
        darkMode
          ? "bg-neutral-900 text-white"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white"
      }`}
    >
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={handleNavigation}
      >
        <ArrowLeft color="#ffffff" />
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img
          src={user?.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full w-28 h-28 border-4 border-white/30 shadow-lg object-cover"
        />
        <h1 className="text-4xl font-bold mt-4">{user.name}</h1>
        <p className="italic text-lg mt-1 text-white/80">{user.role}</p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={() => handleDeleteProject(project._id)}
            />
          ))
        ) : (
          <p className="text-lg text-center">
            {user?.role === "admin" || user?.role === "pm"
              ? "No projects found. Start by creating one!"
              : "You have no projects assigned."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
