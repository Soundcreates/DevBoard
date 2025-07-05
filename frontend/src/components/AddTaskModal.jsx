import React, { useState } from "react";
import { X } from "lucide-react";
import ProfileCard from "./ProfileCard";
import api from "../services/api";
import axios from "axios";

function AddTaskModal({ refreshTasks, isOpen, onClose, project, developers }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    project: project,
  });
  const [error, setError] = useState("");

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log(formData);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/task/createTask/${project._id}`,
        {
          title: formData.title,
          description: formData.description,
          assignedTo: formData.assignedTo,
          dueDate: formData.dueDate,
          project: formData.project,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("THe Formdata is: ", formData);
      setError(response.data.message);
      refreshTasks();
      onClose();
    } catch (err) {
      console.log(err.messsage);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" relative p-3 bg-white/30 backdrop-blur-md w-full rounded-md flex flex-col items-start justify-evenly">
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </div>
        <form className="w-full" onSubmit={handleSubmitTask}>
          <div className="flex flex-col w-full gap-2 mb-2">
            <label htmlFor="title" className="text-xl font-semibold">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              placeholder="Enter title"
              className="w-[70%] h-[30px] rounded-md outline-none border-2 border-white/30 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-col w-full gap-2 mb-2">
            <label htmlFor="description" className="text-xl font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              placeholder="Enter description"
              className="w-[70%] h-[30px] rounded-md outline-none border-2 border-white/30 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-2">
            <label htmlFor="dueDate" className="text-xl font-semibold">
              dueDate
            </label>
            <input
              name="dueDate"
              value={formData.dueDate}
              onChange={(e) => handleChange(e)}
              type="date"
              placeholder="Enter description"
              className="w-[70%] h-[30px] rounded-md outline-none border-2 border-white/30 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-2">
            <label htmlFor="assignTo" className="text-xl font-semibold">
              Assign To:
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => handleChange(e)}
              className="w-[70%] h-[40px] rounded-md outline-none border-2 border-white/30 backdrop-blur-sm bg-white/80 text-gray-800 font-semibold px-2"
            >
              <option value="">Select a developer</option>
              {developers.map((dev) => (
                <option key={dev._id} value={dev._id}>
                  {dev.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="  p-2 w-[70%] bg-white/30  hover:bg-white/40 transition-all duration-300 cursor-pointer rounded-md backdrop-blur-sm"
          >
            Add Task
          </button>
        </form>
        <div className="w-[70%]  flex justify-center">
          <p className=" font-semibold text-white">{error}</p>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
