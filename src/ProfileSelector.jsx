import React, { useState } from "react";
import userIcon from "./assets/user.png";

const ProfileSelector = ({ profiles, selectedProfile, onSelectProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileName, setProfileName] = useState("Teacher");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileSelect = (profile) => {
    onSelectProfile(profile);
    setProfileName(profile);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2 focus:outline-none">
        <img src={userIcon} alt="Profile" width={35} className="rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
          {/* Header: Profile Image and User Name */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <img
              src={userIcon}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{profileName}</p>
              <p className="text-sm text-gray-500">
                {profileName.split(" ").join("_").toString().toLocaleLowerCase() + "@shiminily.com"}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            {profiles.map((profile, index) => (
              <React.Fragment key={`${profile}-${index}`}>
                <button
                  onClick={() => handleProfileSelect(profile)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
                    selectedProfile === profile ? "bg-gray-200" : ""
                  }`}
                >
                  {profile}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
