import React from 'react';
import { FaHome, FaChevronRight, FaSearch, FaBell, FaUser } from 'react-icons/fa'; // Corrected import for all icons

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-2">
        {/* Home Icon */}
        <FaHome className="text-gray-800 text-xl" />
        
        {/* Breadcrumbs with separator */}
        <FaChevronRight className="text-gray-500" />
        <span className="text-gray-800 text-lg font-semibold">Dashboard</span>
        
        <FaChevronRight className="text-gray-500" />
        <span className="text-gray-500 text-lg">Overview</span>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        
        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-gray-800 text-xl cursor-pointer" />
          {/* Optional: Notification Badge */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        
        {/* Profile Icon */}
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-800 text-xl cursor-pointer" />
          <span className="hidden sm:inline-block text-sm font-semibold text-gray-800">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
