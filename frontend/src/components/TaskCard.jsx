import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, SquarePen, Check, X } from "lucide-react";
import { useAuth } from "../globalState/authContext";
import api from "../services/api";

const TaskCard = ({ task, refreshTasks }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  async function handleDeleteTask() {
    try {
      const response = await api.delete(`/api/task/deleteTask/${task._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      refreshTasks();
    } catch (err) {
      console.log(err.message);
    }
  }
  //gona use intellij for some days to like get the feel, kinda like it lowk
  const handleEditClick = () => {
    setIsEditing(true);
  };
  //this just feels better like mine
  const handleSaveEdit = async () => {
    try {
      const response = await api.put(
        `/api/task/updateTask/${task._id}`,
        {
          title: editedTitle,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setIsEditing(false);
      refreshTasks();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 relative bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-md transition text-white"
    >
      <div className="flex gap-3">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-b border-white/50 focus:border-white focus:outline-none text-white flex-1"
            autoFocus
          />
        ) : (
          <h3 className="text-lg font-semibold">{task.title}</h3>
        )}
        <div className="w-10 h-10 rounded-full border-2 border-white">
          <img
            className="rounded-full object-cover w-full h-full"
            src={task.assignedTo.profilePic}
            alt="developer profilepic"
          />
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="text-white/70 text-sm mt-1 w-full bg-transparent border border-white/30 rounded p-2 focus:border-white focus:outline-none resize-none"
          rows={3}
        />
      ) : (
        <p className="text-white/70 text-sm mt-1">{task.description}</p>
      )}
      <div className="mt-2 text-xs text-white/80">
        <p>
          <span className="font-medium">Created By:</span> {task.createdBy.name}{" "}
          ({task.createdBy.role})
        </p>
        <p>
          <span className="font-medium">Assigned To:</span>{" "}
          {task.assignedTo.name} ({task.assignedTo.role})
        </p>
        <p>
          <span className="font-medium">Status:</span> {task.status}
        </p>
      </div>
      {user?.role !== "developer" && (
        <div className="absolute bottom-2 right-5 flex gap-2">
          {isEditing ? (
            <>
              <div
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={handleSaveEdit}
              >
                <Check color="#22c55e" />
              </div>
              <div
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={handleCancelEdit}
              >
                <X color="#ef4444" />
              </div>
            </>
          ) : (
            <>
              <div
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={handleDeleteTask}
              >
                <Trash2 color="#ffffff" />
              </div>
              <div
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={handleEditClick}
              >
                <SquarePen color="#ffffff" />
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
