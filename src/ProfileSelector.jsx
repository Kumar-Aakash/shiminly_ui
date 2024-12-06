import React, { useState } from "react";

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
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 rounded-full p-2 focus:outline-none"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          {profiles.map((profile) => (
            <button
              key={profile}
              onClick={() => handleProfileSelect(profile)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedProfile === profile ? "bg-gray-200" : ""
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