import React, { useState, useEffect } from "react";
import { FaHome, FaChevronRight, FaSearch, FaBell, FaUser } from 'react-icons/fa'; // Corrected import for all icons
import ProfileSelector from "../ProfileSelector";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const classes = ["Class A", "Class B", "Class C"];
  const profiles = ["Teacher", ...classes];
  const [selectedProfile, setSelectedProfile] = useState("Teacher");
  const navigate = useNavigate();

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    navigate(`flash-cards/${profile}`);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        {/* Home Icon */}
        <FaHome className="text-gray-800 text-xl" />
        <span className="text-[#071437] text-sm mt-1 font-medium">Dashboard</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
        <ProfileSelector
            profiles={profiles}
            selectedProfile={selectedProfile}
            onSelectProfile={handleProfileSelect}
          />          
          <span className="hidden sm:inline-block text-lg font-medium text-[#071437]">{selectedProfile}</span>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
