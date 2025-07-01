import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import { useAuth } from "../globalState/authContext";
import { useParams } from "react-router";
import api from "../services/api";

const ViewProject = () => {
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [modal, setModal] = useState(false);

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
        console.log(response.data.project);
        setProject(response.data.project);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 animate-background">
      <div className="max-w-6xl mx-auto space-y-6">
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

        {/* Project Details with Tasks and Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {!project ? (
            <p className="text-white/80 text-center col-span-3">
              No project found.
            </p>
          ) : (
            <>
              {/* Left: Project + Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-2 p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>
                <p className="text-white/80 mt-1">{project.description}</p>
                {(user?.role === "admin" || user?.role === "pm") && (
                  <div
                    className="bg-blue-500 text-white text-center w-[70px] py-2 rounded-lg mt-4 cursor-pointer hover:bg-blue-700 transition-all duration-300"
                    onClick={() => setModal(true)}
                  >
                    Add Task
                  </div>
                )}
                {modal && (
                  <AddTaskModal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    projectId={project._id}
                    developers={project.teamMembers || []}
                  />
                )}

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

              {/* Right: Team Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Team Members
                </h3>
                {project.teamMembers && project.teamMembers.length > 0 ? (
                  <ul className="space-y-3">
                    {project.teamMembers.map((member) => (
                      <li
                        key={member._id}
                        className="flex items-center space-x-3 bg-white/10 rounded-lg p-2 hover:bg-white/20 transition"
                      >
                        <img
                          src="https://via.placeholder.com/40"
                          alt={member.name}
                          className="rounded-full w-10 h-10 border-2 border-white/20"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {member.name}
                          </p>
                          <p className="text-white/70 text-sm italic">
                            {member.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/60 italic">No team members found.</p>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
