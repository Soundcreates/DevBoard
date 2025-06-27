import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./authContext";
import api from "../services/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchProjects = async () =>{
    try{
      const response = await api.get('/api/projects/getProjects');
      
      const projects = response.data.projects;
      setProjects(projects);
      
      
    }
  }
  return (
    <ProjectContext.Provider value={{projects, isLoading}}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const content = useContext(ProjectContext);
  return content;
};
