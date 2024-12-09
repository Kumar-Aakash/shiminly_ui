import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content (scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;
