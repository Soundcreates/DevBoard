import React, { useEffect } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !localStorage.getItem("token")) {
      navigate("/");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center bg-transparent justify-center items-center">
        <h1 className="text-white font-bold text-3xl italic">Loading...</h1>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoutes;
