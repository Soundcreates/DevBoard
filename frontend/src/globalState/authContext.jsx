import react, { useState, useContext, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api.auth.getMe", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data.currentUser);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  fetchUser();

  return (
    <AuthContext.Provider value={{ user, isLoading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
