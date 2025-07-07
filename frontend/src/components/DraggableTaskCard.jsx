import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../globalState/themeContext"; // your darkMode context
import { useDraggable } from "@dnd-kit/core";

const DraggableTaskCard = ({ task }) => {
  const { darkMode } = useTheme();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
      data: {
        type: "task",
        task,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 999 : "auto",
      }
    : undefined;


  return (
    <div
      ref={setNodeRef}
      style={style}

      {...attributes}
      {...listeners}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      whileTap={{ scale: isDragging ? 1 : 0.98 }}
      className={`p-4 rounded-xl shadow-md transition-colors duration-300 border border-white/20 cursor-grab active:cursor-grabbing touch-none select-none ${
        isDragging ? "opacity-50 z-50" : ""
      } ${
        darkMode
      ? "bg-gray-800 text-white"
          : "bg-white/20 backdrop-blur text-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-1 truncate">{task.title}</h3>
      <p className="text-sm mb-2 line-clamp-3">{task.description}</p>
      <p className="text-xs text-white/70 italic">Due: {task.dueDate}</p>
    </div>
  );
};

export default DraggableTaskCard;
