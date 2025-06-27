import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../globalState/authContext";
import api from "../services/api";

const TasksPage = () => {
  const { user, isLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/api/task/user/${user.id}`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  if (isLoading || loadingTasks) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-lg"
        >
          Loading your tasks...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 space-y-6 animate-background">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-6"
      >
        Your Tasks
      </motion.h1>

      {tasks.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/80"
        >
          You have no tasks assigned yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              assignedTo={task.assignedTo}
              assignedBy={task.createdBy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
