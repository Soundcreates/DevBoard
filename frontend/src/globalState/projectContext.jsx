import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./authContext";
import api from "../services/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchProject = async (projectId) => {
    try {
      const response = await api.get(`/api/project/getProjects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const project = response.data.project;
      setProjects(project);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ProjectContext.Provider value={{ projects, isLoading, fetchProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const content = useContext(ProjectContext);
  return content;
};
