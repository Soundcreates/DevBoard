import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { useTheme } from "../globalState/themeContext"; // your context
import {closestCorners, DndContext, useDndContext} from "@dnd-kit/core";
import {useTask} from "../globalState/taskContext.jsx";
import {useParams} from "react-router";
import DraggableTaskCard from "../components/DraggableTaskCard.jsx";

const TaskBoard = () => {
    const { darkMode } = useTheme();
    const {tasks, fetchTasks} = useTask();
    const {projectId} = useParams();
    const [todoTasks, setTodoTasks] = useState([
    () => {
         tasks.filter(task => task.status === "todo");

    }
    ]);
    const [inProgress, setInProgress] = useState([
        () => {
        tasks.filter(task => task.status === "in-progress");

        }
    ]);
    const [doneTasks, setDoneTasks ] =useState([
        () => {
         tasks.filter(task => task.status === "done");

        }
    ]);
    console.log(tasks);


    useEffect(() => {
        fetchTasks(projectId);
    }, [])

    const columnClasses =
        "bg-white/10 backdrop-blur-md rounded-xl p-4 w-full max-w-sm border border-white/20 flex flex-col h-[calc(100vh-4rem)]"; // 4rem for padding top/bottom

    const scrollAreaClasses =
        "space-y-3 overflow-y-auto mt-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pr-2";

    const handleDragEnd = (event) => {
    const {active, over} = event;
    if(active.id === over.id) return;

    }
    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div
                className={`min-h-screen p-8 flex justify-center items-start gap-6 flex-wrap ${
                    darkMode
                        ? "bg-gray-900"
                        : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
                }`}
            >
                {/* To Do Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={columnClasses}
                >
                    <h2 className="text-white text-xl font-bold mb-2">To Do</h2>
                    <div className={scrollAreaClasses}>
                        {todoTasks.length === 0 ? (
                            <h1>No tasks left</h1>
                        ) :

                            todoTasks.map((task) => (
                                    <DraggableTaskCard  key = {task._id} task = {task}/>
                                ))
                        }

                    </div>
                </motion.div>

                {/* In Progress Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={columnClasses}
                >
                    <h2 className="text-white text-xl font-bold mb-2">In Progress</h2>
                    <div className={scrollAreaClasses}>
                        {inProgress.length === 0 ? (
                            <h1>No tasks in progress</h1>
                        )
                            :

                            inProgress.map((task) => (
                                    <DraggableTaskCard key = {task._id} task = {task} />
                                ))
                        }

                    </div>
                </motion.div>

                {/* Completed Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className={columnClasses}
                >
                    <h2 className="text-white text-xl font-bold mb-2">Completed</h2>
                    <div className = {scrollAreaClasses}>
                        {doneTasks.length === 0 ? (
                            <h1>No tasks completed</h1>
                        ) :
                            doneTasks.map((task, index) => (
                                    <DraggableTaskCard key ={task._id}  task = {task} />
                                ))

                        }

                    </div>

                </motion.div>
            </div>
        </DndContext>

    );
};

export default TaskBoard;
