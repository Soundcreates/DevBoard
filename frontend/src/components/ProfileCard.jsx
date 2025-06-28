import React from "react";

const ProfileCard = ({ name, profilePic }) => {
  return (
    <div className="flex items-center space-x-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition cursor-pointer">
      <img
        src={profilePic}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white"
      />
      <span className="text-white text-lg font-medium">{name}</span>
    </div>
  );
};

export default ProfileCard;
