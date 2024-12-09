import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaIdCard, FaCog } from "react-icons/fa"; // Dummy icons

const Sidebar = () => {
  return (
    <aside className="text-white bg-light w-64 min-h-screen border border-gray-100">
      <div className="p-5 flex items-center justify-center">
        <img
          src="https://shiminly.com/wp-content/uploads/2024/04/Shiminly_Full-Color-1024x252.png"
          alt="Logo"
          className="w-full max-[280px]"
        />
      </div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/flash-cards/Teacher"
              className="flex text-[#1b84FF] bg-[#F9F9F9] mx-2 items-center px-6 py-2 text-[14px] rounded-lg transition-all"
            >
              <FaIdCard className="mr-3 text-xl" />
              Flash Cards
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
