import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaIdCard, FaCog } from "react-icons/fa"; // Dummy icons

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen shadow-xl">
      <div className="p-6 flex items-center justify-center bg-gray-900">
        <img
          src="https://shiminly.com/wp-content/uploads/2024/04/Shiminly_Full-Color-1024x252.png"
          alt="Logo"
          className="w-full max-w-xs"
          style={imageStyle}
        />
      </div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className="flex items-center px-6 py-1 text-lg text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
              activeClassName="bg-gray-700 text-blue-400"
            >
              <FaHome className="mr-3 text-xl" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/flash-cards"
              className="flex items-center px-6 py-1 text-lg text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
              activeClassName="bg-gray-700 text-blue-400"
            >
              <FaIdCard className="mr-3 text-xl" />
              Flash Cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="flex items-center px-6 py-1 text-lg text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
              activeClassName="bg-gray-700 text-blue-400"
            >
              <FaCog className="mr-3 text-xl" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const imageStyle = {
  filter: 'brightness(5)',
};

export default Sidebar;
