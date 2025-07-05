import React, {createContext, useContext, useState} from 'react';
import api from "../services/api.js";
import {useAuth} from "./authContext.jsx";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const {user} = useAuth();
    const[tasks, setTasks] = useState([]);

    const fetchTasks = async (projectId) => {
        const response = await api.get(`/api/task/fetchTasks/${projectId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setTasks(response.data.tasks);
    }


    return (
        <TaskContext.Provider  value = {{tasks, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const content = useContext(TaskContext);
    return content;
}