import React, { useState, useEffect } from "react";
import { useAuth } from "../globalState/authContext";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../globalState/themeContext"; // your darkMode context

const AddProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [devs, setDevs] = useState([]);
  const [selectedDevs, setSelectedDevs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await api.get("/api/users/getDevelopers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDevs(response.data.developers);
        console.log(response.data.developers);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchDevelopers();
  }, []);

  const handleSelectDev = (dev) => {
    if (selectedDevs.find((d) => d.id === dev.id)) {
      setSelectedDevs(selectedDevs.filter((d) => d.id !== dev.id));
    } else {
      setSelectedDevs([...selectedDevs, dev]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await api.post(
        "/api/project/addProjects",
        {
          title: title,
          description: description,
          teamMembers: selectedDevs.map((dev) => dev.id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setError(response.data.message);
      console.log(response.data.message);
      setTitle("");
      setDescription("");
      setSelectedDevs([]);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      setError("Failed to create project");
    }
  };

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div
        className={`relative w-3/5 p-10 overflow-auto ${
          darkMode
            ? "bg-neutral-900 text-white"
            : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white"
        }`}
      >
        <div
          className="absolute right-5 top-5 cursor-pointer"
          onClick={handleNavigation}
        >
          <ArrowLeft color="#ffffff" />
        </div>
        <h1 className="text-4xl font-bold mb-8">
          Hey {user?.name}, let's create a project
        </h1>
        <p className="italic text-left mb-5">{error}</p>

        <form
          className="flex flex-col space-y-6 max-w-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-medium">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className={`p-3 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-neutral-800 text-white focus:ring-white/40"
                  : "bg-white/20 text-white focus:ring-white"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-medium">
              Project Description
            </label>
            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className={`p-3 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-neutral-800 text-white focus:ring-white/40"
                  : "bg-white/20 text-white focus:ring-white"
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`transition text-white font-semibold py-3 rounded-lg ${
              darkMode
                ? "bg-neutral-700 hover:bg-neutral-600"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Create Project
          </button>
        </form>

        {selectedDevs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Members of this project:
            </h2>
            <div className="space-y-4">
              {selectedDevs.map((dev) => (
                <ProfileCard
                  key={dev.id}
                  name={dev.name}
                  profilePic={dev.profilePic}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div
        className={`w-2/5 p-10 overflow-auto ${
          darkMode ? "bg-neutral-800 text-white" : "bg-gray-900 text-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Assign to:</h2>
        <p className="mb-4 text-white/80">Developers:</p>
        <div className="space-y-4">
          {devs.map((dev) => (
            <div key={dev.id} onClick={() => handleSelectDev(dev)}>
              <ProfileCard name={dev.name} profilePic={dev.profilePic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProject;
