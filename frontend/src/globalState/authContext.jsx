import react, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        withCredentials: true, // Always send cookies for Google OAuth
      };
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      const response = await api.get("/api/auth/getMe", config);
      setUser(response.data.currentUser);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setUser(null);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleLogout, setUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
