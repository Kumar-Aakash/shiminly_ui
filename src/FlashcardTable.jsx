import React, { useState } from "react";
import MultiSelect from "./Mutiselect";
import Modal from "./Modal";

const FlashcardTable = ({ flashcards, classes, isTeacher, flashcardData, onUpdateFlashcardData }) => {
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  const handleAssignChange = (flashcardHeading, selectedClasses) => {
    const newData = { ...flashcardData };
    if (!newData[flashcardHeading]) {
      newData[flashcardHeading] = {
        assignedClasses: [],
        classification: {}
      };
    }
    newData[flashcardHeading].assignedClasses = selectedClasses;
    onUpdateFlashcardData(newData);
  };

  return (
    <div className="bg-white shadow-sm  border border-gray-200 rounded-xl pt-4 mt-20">
      <h2 className="text-[16px] font-semibold mb-4 ml-4">Stored Flashcards</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#FCFCFC]">
            <th className="px-4 py-2 text-left text-[13px] text-[#4B5675] font-normal">Heading</th>
            <th className="px-4 py-2 text-left text-[13px] font-normal text-[#4B5675] ">Open</th>
            {isTeacher && <th className="px-4 py-2 text-left text-[13px] font-normal text-[#4B5675] ">Assign To</th>}
          </tr>
        </thead>
        <tbody>
          {flashcards?.map((flashcard,index) => {
            const data = flashcardData?.[flashcard?.heading] || { assignedClasses: [], classification: {} };
            return (
              <tr key={flashcard?.heading} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-sm text-normal text-left">{flashcard?.heading}</td>
                <td className="border px-4 py-2 text-left">
                  <button
                    onClick={() => setSelectedFlashcard(flashcard)}
                    className="bg-blue-500 text-[12px] text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Open
                  </button>
                </td>
                {isTeacher && (
                  <td className="border px-4 py-2 text-left">
                    <MultiSelect
                      options={classes}
                      value={data?.assignedClasses}
                      onChange={(selected) => handleAssignChange(flashcard?.heading, selected)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedFlashcard && (
        <Modal
          flashcard={selectedFlashcard}
          onClose={() => setSelectedFlashcard(null)}
        />
      )}
    </div>
  );
};

export default FlashcardTable;