import React from 'react';
import { FaHome, FaChevronRight, FaSearch, FaBell, FaUser } from 'react-icons/fa'; // Corrected import for all icons

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white ">
      <div className="flex items-center space-x-2">
        {/* Home Icon */}
        <FaHome className="text-gray-800 text-xl" />
        <span className="text-[#071437] text-sm mt-1 font-medium">Dashboard</span>

        
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-800 text-xl cursor-pointer" />
          <span className="hidden sm:inline-block text-sm font-medium text-[#071437]">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
