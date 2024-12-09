import React, { useState } from "react";
import MultiSelect from "./Mutiselect";
import Modal from "./Modal";

const FlashcardTable = ({ flashcards, classes }) => {
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [assignments, setAssignments] = useState({});

  if (flashcards.length === 0) {
    return <p className="text-center text-gray-500">No flashcards saved yet.</p>;
  }

  const handleAssignChange = (flashcardId, selectedClasses) => {
    setAssignments({
      ...assignments,
      [flashcardId]: selectedClasses,
    });
  };

  return (
    <>
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-500 font-semibold bg-gray-50">
              <th className="px-6 py-3">Heading</th>
              <th className="px-6 py-3">Open</th>
              <th className="px-6 py-3">Assign To</th>
            </tr>
          </thead>
          <tbody>
            {flashcards?.map((flashcard) => (
              <tr
                key={flashcard?.heading}
                className="bg-white shadow hover:shadow-lg transition-shadow rounded-lg"
              >
                <td className="px-6 py-4 flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold text-sm">
                      {flashcard?.heading?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {flashcard?.heading}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedFlashcard(flashcard)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Open
                  </button>
                </td>
                <td className="px-6 py-4">
                  <MultiSelect
                    options={classes}
                    value={assignments[flashcard?.heading] || []}
                    onChange={(selected) =>
                      handleAssignChange(flashcard?.heading, selected)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFlashcard && (
        <Modal
          flashcard={selectedFlashcard}
          onClose={() => setSelectedFlashcard(null)}
        />
      )}
    </div>
    </>
  );
};

export default FlashcardTable;
