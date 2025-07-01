import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import { AuthProvider } from "./globalState/authContext";
import AddProject from "./pages/AddProject";
import ProjectsPage from "./pages/ViewProject";
import ViewProject from "./pages/ViewProject";
import { ProjectProvider } from "./globalState/projectContext";
import ProtectedRoutes from "./globalState/ProtectedRoutes";
import ProfileSettings from "./pages/ProfileSetting";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/add-project" element={<AddProject />} />
              <Route
                path="/view-project/:projectId"
                element={<ViewProject />}
              />
              <Route path="/profile-setting" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
