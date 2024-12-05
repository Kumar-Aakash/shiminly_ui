import React, { useState } from "react";

const FileUpload = ({ onGenerateFlashcards, isLoading }) => {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [numFlashcards, setNumFlashcards] = useState(5);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setFileContent(reader.result);
      };

      reader.onerror = () => {
        alert("Error reading the file.");
      };

      reader.readAsText(file);
    }
  };

  const handleGenerateClick = () => {
    if (!fileContent) {
      alert("Please upload a file first.");
      return;
    }

    if (numFlashcards < 1) {
      alert("Please specify a valid number of flashcards.");
      return;
    }

    onGenerateFlashcards(fileContent, numFlashcards);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md">
      <label className="block text-gray-700 font-bold mb-2">
        Upload a File
      </label>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="p-2 bg-white border rounded w-full mb-4"
      />
      {fileName && (
        <p className="text-sm text-gray-600 mb-4">Uploaded File: {fileName}</p>
      )}

      <label className="block text-gray-700 font-bold mb-2">
        Number of Flashcards
      </label>
      <input
        type="text"
        value={numFlashcards}
        onChange={(e) => setNumFlashcards(Number(e.target.value))}
        className="p-2 bg-white border rounded w-full mb-4"
      />

      <button
        onClick={handleGenerateClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  );
};

export default FileUpload;