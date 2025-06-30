import React from "react";
import { motion } from "framer-motion";

const TaskCard = ({ task }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-md transition text-white"
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-white/70 text-sm mt-1">{task.description}</p>
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
    </motion.div>
  );
};

export default TaskCard;
