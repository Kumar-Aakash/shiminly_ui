import React from "react";

const Modal = ({ flashcard, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {/* Flashcard Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-2">{flashcard.heading}</h2>
          <p className="text-white text-sm text-center">{flashcard.subheading || "Expand your knowledge!"}</p>
        </div>

        {/* Flashcard Content */}
        <div className="p-6">
          <p className="text-gray-700 text-center text-sm leading-relaxed mb-6">{flashcard.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;