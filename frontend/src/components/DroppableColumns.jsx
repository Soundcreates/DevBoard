import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

const DroppableColumn = ({
  id,
  children,
  title,
  isEmpty,
  columnClasses,
  scrollAreaClasses,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${columnClasses} ${
        isOver ? "ring-2 ring-blue-400 ring-opacity-50 overflow-hidden" : ""
      }`}
    >
      <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
      <div
        ref={setNodeRef}
        className={`${scrollAreaClasses} ${
          isOver ? "bg-white/5" : ""
        } transition-colors duration-200 overflow-hidden`}
      >
        {isEmpty ? (
          <h1 className="text-white/60 text-center py-4">No tasks</h1>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};

export default DroppableColumn;
