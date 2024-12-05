import React from "react";

const Modal = ({ flashcard, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{flashcard.heading}</h2>
        <p className="text-gray-700">{flashcard.description}</p>
      </div>
    </div>
  );
};

export default Modal;