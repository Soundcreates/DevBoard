import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";

const ProjectsPage = () => {
  const { user, isLoading } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/project");
        setProjects(response.data.projects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <p className="text-white text-lg">Loading your projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 space-y-8 animate-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="rounded-full w-28 h-28 border-4 border-white/30 shadow-lg"
        />
        <h1 className="text-4xl text-white font-bold mt-4">{user.name}</h1>
        <p className="text-white/80 italic text-lg mt-1">{user.role}</p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onView={(project) => {
                console.log("View Project clicked:", project);
                // Navigate to project details page or open modal here
              }}
            />
          ))
        ) : (
          <p className="text-white text-lg">
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
