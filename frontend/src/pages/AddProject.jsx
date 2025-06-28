import React, { useState, useEffect } from "react";
import { useAuth } from "../globalState/authContext";
import ProfileCard from "../components/ProfileCard";

import api from "../services/api";

const AddProject = () => {
  const { user } = useAuth();
  const [devs, setDevs] = useState([]);
  const [selectedDevs, setSelectedDevs] = useState([]);

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

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-3/5 p-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white overflow-auto">
        <h1 className="text-4xl font-bold mb-8">
          Hey {user?.name}, let's create a project
        </h1>

        <form className="flex flex-col space-y-6 max-w-xl">
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-medium">Project Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              className="p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-medium">
              Project Description
            </label>
            <textarea
              placeholder="Enter project description"
              rows="5"
              className="p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30 transition text-white font-semibold py-3 rounded-lg"
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
      <div className="w-2/5 p-10 bg-gray-900 text-white overflow-auto">
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
