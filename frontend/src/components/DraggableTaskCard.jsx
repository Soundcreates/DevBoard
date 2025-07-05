import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../globalState/themeContext"; // your darkMode context

const DraggableTaskCard = ({ task }) => {
    const { darkMode } = useTheme();

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl shadow-md transition-colors duration-300 border border-white/20 ${
                darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white/20 backdrop-blur text-white"
            }`}
        >
            <h3 className="text-lg font-semibold mb-1 truncate">{task.title}</h3>
            <p className="text-sm mb-2 line-clamp-3">{task.description}</p>
            <p className="text-xs text-white/70 italic">
                Due: {task.dueDate}
            </p>
        </motion.div>
    );
};

export default DraggableTaskCard;
