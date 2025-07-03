// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";
import { useNavigate } from "react-router";
import ProjectCard from "../components/ProjectCard";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import { useTheme } from "../globalState/themeContext"; // assuming your darkMode context is here

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { darkMode } = useTheme();

  const [getProjects, setGetProjects] = useState([]);
  const [project, setProject] = useState(true);
  const [tasks, setTasks] = useState(false);
  const [countTasks, setCountTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/task/fetchTasksToUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCountTasks(response.data.tasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/project/getProjects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGetProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setGetProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  if (isLoading || !user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-neutral-900 text-white"
            : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white"
        }`}
      >
        <p className="text-lg animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start p-8 space-y-8 animate-background ${
        darkMode
          ? "bg-neutral-900 text-white"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl shadow-2xl w-full max-w-2xl p-6 border ${
          darkMode
            ? "bg-white/5 backdrop-blur-lg border-white/10"
            : "bg-white/10 backdrop-blur-lg border-white/30"
        }`}
      >
        <div
          className="absolute right-5 top-5 cursor-pointer"
          onClick={handleNavigation}
        >
          <ArrowLeft color={darkMode ? "#ffffff" : "#ffffff"} />
        </div>

        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-white/30 object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="italic text-lg text-stone-200">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 text-lg flex space-x-6">
          <p>Projects: {getProjects.length}</p>
          <p>Tasks: {countTasks.length}</p>
        </div>

        <div className="mt-4 flex space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`font-semibold px-4 py-2 rounded-lg transition ${
              project ? "bg-white/30" : "bg-white/20 hover:bg-white/30"
            }`}
            onClick={() => {
              setTasks(false);
              setProject(true);
            }}
          >
            View Projects
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`font-semibold px-4 py-2 rounded-lg transition ${
              tasks ? "bg-white/30" : "bg-white/20 hover:bg-white/30"
            }`}
            onClick={() => {
              setProject(false);
              setTasks(true);
            }}
          >
            View Tasks
          </motion.button>
          <div
            onClick={() => navigate("/profile-setting")}
            className="bg-white/30 font-semibold px-4 py-2 rounded-lg hover:bg-white/40 transition-all cursor-pointer duration-300"
          >
            Edit Profile
          </div>
        </div>
      </motion.div>

      {project && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {getProjects.length === 0 ? (
            <p className="text-xl italic">You have no projects right now.</p>
          ) : (
            getProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      )}

      {tasks && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {countTasks.length === 0 ? (
            <p className="text-xl italic">
              No tasks have been assigned to you.
            </p>
          ) : (
            // Insert your <TaskCard /> list here once ready
            <p className="text-lg italic">Tasks will display here.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
