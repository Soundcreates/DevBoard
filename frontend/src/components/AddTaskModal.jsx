import React, { useState } from "react";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../globalState/authContext";

const AddTaskModal = ({ isOpen, onClose, developers, projectId }) => {
  console.log(projectId);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    project: projectId,
    createdBy: user?._id || "An User",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/api/task/createTask",
        {
          title: formData.title,
          description: formData.description,
          assignedTo: formData.assignedTo,
          project: formData.project,
          dueDate: formData.dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setError("Task added successfully!");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
      });
      onClose();
    } catch (err) {
      console.log(err.message);
      setError("Failed to add task, please try again.");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  //   onClose();
  //   setFormData({
  //     title: "",
  //     description: "",
  //     dueDate: "",
  //     assignedTo: "",
  //   });
  // };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full fixed h-full inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 backdrop-blur-lg mt-30 border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-white placeholder-white/70 focus:outline-none"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-white placeholder-white/70 focus:outline-none"
              placeholder="Enter task description"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1">Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-black focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Developer
              </option>
              {developers.map((dev) => (
                <option key={dev._id} value={dev._id}>
                  {dev.name} ({dev.email})
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 rounded-xl transition hover:bg-purple-500"
          >
            Add Task
          </motion.button>
        </form>
        <div className="w-full flex justify-center text-lg mt-2 ">
          <p className="italic text-red-800 font-bold">{error}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddTaskModal;
