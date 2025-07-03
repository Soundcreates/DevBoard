// src/pages/Profile.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";
import { useNavigate } from "react-router";
import { useProject } from "../globalState/projectContext";
import { useState, useEffect } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [getProjects, setGetProjects] = useState([]);
  const [project, setProject] = useState(true);
  const [tasks, setTasks] = useState(false);
  const [countTasks, setCountTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/task/fetchTasksToUser", {
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
  }, []);
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <p className="text-white text-lg animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  const handleNavigation = () => {
    navigate(-1);
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 space-y-8 animate-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-white/30"
      >
        <div
          className="absolute right-5 top-5 cursor-pointer "
          onClick={handleNavigation}
        >
          <ArrowLeft color="#ffffff" />
        </div>
        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePic}
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-white/30"
          />
          <div className="flex flex-col">
            <h1 className="text-white text-4xl font-bold">{user.name}</h1>
            <p className="italic text-stone-200 text-lg">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 text-white text-lg flex space-x-6">
          <p>Projects: {getProjects.length}</p>
          <p>Tasks: {countTasks.length} </p>
        </div>

        <div className="mt-4 flex space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`bg-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition ${
              project && "bg-white/30"
            }`}
            onClick={() => {
              setTasks(false);
              setProject((prev) => !prev);
            }}
          >
            View Projects
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`bg-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition ${
              tasks && "bg-white/30"
            }`}
            onClick={() => {
              setProject(false);
              setTasks(true);
            }}
          >
            View Tasks
          </motion.button>
          <div
            className="bg-white/30 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/40 transition-all cursor-pointer duration-300"
            onClick={() => navigate("/profile-setting")}
          >
            Edit Profile
          </div>
        </div>
      </motion.div>
      {project && (
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {getProjects.length === 0 ? (
            <p className="text-xl italic text-white">
              You have no projects right now
            </p>
          ) : (
            getProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      )}
      {tasks && (
        <div clasName="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {countTasks.length === 0 ? (
            <p className="text-xl italic text-white ">
              No tasks has been assigned to you
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Profile;
