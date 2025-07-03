// src/pages/ProfileSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../globalState/authContext";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await api.post("/api/users/UploadProfilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Profile picture updated successfully!");
      fetchUser(); // Refresh user context
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6 animate-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relaitve bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 flex flex-col items-center"
      >
        <div
          className="absolute right-5 top-5 cursor-pointer "
          onClick={handleNavigation}
        >
          <ArrowLeft color="#ffffff" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Profile Settings</h2>

        <img
          src={
            previewUrl || user?.profilePic || "https://via.placeholder.com/150"
          }
          alt="Profile Preview"
          className="rounded-full w-32 h-32 border-4 border-white/30 object-cover mb-4"
        />

        <div className="w-full space-y-4">
          <div className="flex flex-col items-start w-full">
            <label className="text-white/80 text-sm">Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label className="text-white/80 text-sm">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label className="text-white/80 text-sm">
              Upload New Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className=" bg-white/30 rounded-md text-white mt-1"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </motion.button>

          {message && (
            <p className="text-center text-white/80 mt-2">{message}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
