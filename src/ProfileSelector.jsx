import React, { useState } from "react";
import UserIcon from "./assets/user.png" 

const ProfileSelector = ({ profiles, selectedProfile, onSelectProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileSelect = (profile) => {
    onSelectProfile(profile);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full max-w-xs">
    {/* Label */}
    <label
      htmlFor="profile-dropdown"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Select Profile
    </label>
  
    {/* Dropdown Button */}
    <button
      id="profile-dropdown"
      onClick={toggleDropdown}
      className="w-full flex justify-between items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
    >
      <span>{selectedProfile || "Choose a profile"}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  
    {/* Dropdown Menu */}
    {isOpen && (
      <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-xl min-w-[200px]">
        {profiles.map((profile) => (
          <button
            key={profile}
            onClick={() => handleProfileSelect(profile)}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 ${
              selectedProfile === profile ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {profile}
          </button>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default ProfileSelector;