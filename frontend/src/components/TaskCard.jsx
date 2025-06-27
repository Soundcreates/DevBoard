import React from "react";
import { motion } from "framer-motion";
import { UserCircleIcon } from "lucide-react";

const TaskCard = ({ title, assignedTo, assignedBy }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 w-full max-w-md transition hover:shadow-2xl"
    >
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

      <div className="flex items-center space-x-3 mb-2">
        <UserCircleIcon className="w-6 h-6 text-white/70" />
        <div>
          <p className="text-white/80 text-sm">Assigned To</p>
          <p className="text-white font-semibold">
            {assignedTo.name}{" "}
            <span className="text-white/50">({assignedTo.role})</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <UserCircleIcon className="w-6 h-6 text-white/70" />
        <div>
          <p className="text-white/80 text-sm">Assigned By</p>
          <p className="text-white font-semibold">
            {assignedBy.name}{" "}
            <span className="text-white/50">({assignedBy.role})</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
