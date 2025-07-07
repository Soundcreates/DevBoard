import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../globalState/themeContext";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { useTask } from "../globalState/taskContext.jsx";
import { useParams } from "react-router";
import DraggableTaskCard from "../components/DraggableTaskCard.jsx";
import DroppableColumns from "../components/DroppableColumns.jsx";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";
import {useNavigate} from "react-router";

const TaskBoard = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { tasks, fetchTasks } = useTask();
  const { projectId } = useParams();
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const handleNavigation = () => {
    navigate(-1);
  }
  useEffect(() => {
    fetchTasks(projectId);
  }, [fetchTasks, projectId]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setTodoTasks(tasks.filter((task) => task.status === "todo"));
      setInProgress(tasks.filter((task) => task.status === "in-progress"));
      setDoneTasks(tasks.filter((task) => task.status === "done"));
    } else {
      setTodoTasks([]);
      setInProgress([]);
      setDoneTasks([]);
    }
  }, [tasks]);

  const columnClasses =
    "bg-white/10 backdrop-blur-md rounded-xl p-4 w-full max-w-sm border border-white/20 flex flex-col h-[calc(100vh-4rem)]";

  const scrollAreaClasses =
    "space-y-3 overflow-y-auto mt-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pr-2 flex-1 min-h-0";

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(
        `/api/task/updateTask/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Refresh tasks after successful update
      fetchTasks(projectId);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = active.data.current?.task;

    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
 //resetting activeTask when drag ends
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const task = active.data.current?.task;
    const newStatus = over.id;

    console.log(
      "Updating task status:",
      task?.title,
      "from",
      task?.status,
      "to",
      newStatus
    );

    if (task && task.status !== newStatus) {
      updateTaskStatus(task._id, newStatus);
    }
  };

  return (
    //i cant use copilot here so might switch back to vs code


    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleNavigation}
      >
        <ArrowLeft color={darkMode ? "#ffffff" : "#ffffff"} />
      </div>
      <div
        className={`min-h-screen p-8 flex justify-center items-start gap-6 flex-wrap ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
        }`}
      >
        {/* To Do Column */}
        <DroppableColumns
          id="todo"
          title="To Do"
          isEmpty={todoTasks.length === 0}
          columnClasses={columnClasses}
          scrollAreaClasses={scrollAreaClasses}
        >
          {todoTasks.map((task) => (
            <DraggableTaskCard key={task._id} task={task} />
          ))}
        </DroppableColumns>

        {/* In Progress Column */}
        <DroppableColumns
          id="in-progress"
          title="In Progress"
          isEmpty={inProgress.length === 0}
          columnClasses={columnClasses}
          scrollAreaClasses={scrollAreaClasses}
        >
          {inProgress.map((task) => (
            <DraggableTaskCard key={task._id} task={task} />
          ))}
        </DroppableColumns>

        {/* Completed Column */}
        <DroppableColumns
          id="done"
          title="Completed"
          isEmpty={doneTasks.length === 0}
          columnClasses={columnClasses}
          scrollAreaClasses={scrollAreaClasses}
        >
          {doneTasks.map((task) => (
            <DraggableTaskCard key={task._id} task={task} />
          ))}
        </DroppableColumns>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <div className="p-4 rounded-xl shadow-lg bg-white/20 backdrop-blur text-white border border-white/20 opacity-80">
            <h3 className="text-lg font-semibold mb-1 truncate">
              {activeTask.title}
            </h3>
            <p className="text-sm mb-2 line-clamp-3">
              {activeTask.description}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
