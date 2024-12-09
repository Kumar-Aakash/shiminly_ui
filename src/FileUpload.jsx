import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const FileUpload = ({ onGenerateFlashcards, isLoading }) => {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [numFlashcards, setNumFlashcards] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected. Please try again.");
      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    const reader = new FileReader();

    reader.onload = () => {
      setFileContent(reader.result);
      setIsUploading(false);
      toast.success("File uploaded successfully!");
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Error reading the file. Please try again.");
    };

    reader.readAsText(file);
  };

  const handleGenerateClick = () => {
    if (!fileContent) {
      toast.error("Please upload a file first.");
      return;
    }

    if (numFlashcards < 1) {
      toast.error("Please specify a valid number of flashcards.");
      return;
    }

    onGenerateFlashcards(fileContent, numFlashcards);
  };

  return (
    <div className="relative">
      {/* Full-Screen Loader */}
      {isUploading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <ClipLoader size={50} color="#4A90E2" />
        </div>
      )}

      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* File Upload Section */}
      <div className="pt-6 pb-3 rounded-md w-full max-w-lg text-left">
        <label className="block text-gray-700 text-sm mb-2">Upload a File</label>
        <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-6 bg-white hover:bg-gray-50 cursor-pointer">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center space-x-4">
            {fileName ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-600 text-[13px] font-medium">File Uploaded: {fileName}</p>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <p className="text-gray-600 text-[13px] font-medium">
                  Drag and drop a file here, or <span className="text-blue-500">browse</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Number of Flashcards Section */}
        <label className="block text-gray-700 text-sm mt-8 mb-2">
          Number of Flashcards
        </label>
        <input
          type="text"
          value={numFlashcards}
          onChange={(e) => setNumFlashcards(Number(e.target.value))}
          className="p-2 bg-white border rounded w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerateClick}
          className={`w-fit flex justify-center align-middle ml-auto mr-auto text-[12px] bg-blue-500 text-white mt-3 px-4 py-2 rounded-md hover:bg-blue-600 transition ${
            isLoading && "cursor-not-allowed opacity-70"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
