import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "../components/TaskCard";

import { useAuth } from "../globalState/authContext";
import { useParams } from "react-router";
import api from "../services/api";

const ViewProject = () => {
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(
          `/api/project/getProjects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(response.data.project);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 animate-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="rounded-full w-20 h-20 border-4 border-white/30"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
            <p className="italic text-white/80">{user?.role}</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6 mt-4">
          {!project ? (
            <p className="text-white/80 text-center">No projects found.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <p className="text-white/80 mt-1">{project.description}</p>

              {/* Tasks under this project */}
              {project.tasks && project.tasks.length > 0 ? (
                <div className="mt-4 grid gap-4">
                  {project.tasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              ) : (
                <p className="text-white/60 mt-2 italic text-sm">
                  No tasks for this project.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
