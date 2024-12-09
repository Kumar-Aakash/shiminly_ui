import React from "react";

const FlashcardList = ({ flashcards, selectedProfile, flashcardData, onUpdateFlashcardData }) => {

  const handleClassificationChange = (flashcardHeading, classification) => {
    const newData = { ...flashcardData };
    if (!newData[flashcardHeading]) {
      newData[flashcardHeading] = {
        assignedClasses: [],
        classification: {}
      };
    }
    newData[flashcardHeading].classification[selectedProfile] = classification;
    onUpdateFlashcardData(newData);
  };

  // Determine classification for a flashcard under current profile
  const getClassForFlashcard = (flashcard) => {
    const data = flashcardData[flashcard.heading];
    if (!data || !data.classification) return "";
    return data.classification[selectedProfile] || "";
  };

  // Partition flashcards by classification
  const newFlashcards = flashcards.filter(f => getClassForFlashcard(f) === "");
  const importantFlashcards = flashcards.filter(f => getClassForFlashcard(f) === "Important");
  const reviewedFlashcards = flashcards.filter(f => getClassForFlashcard(f) === "Reviewed");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">New Flash Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {newFlashcards.map((flashcard,index) => (
            <div key={`${flashcard}-${index}`} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-bold mb-2">{flashcard.heading}</h2>
              <p className="text-gray-700">{flashcard.description}</p>
              <select
                value={getClassForFlashcard(flashcard)}
                onChange={(e) => handleClassificationChange(flashcard.heading, e.target.value)}
                className="mt-2 p-2 border rounded"
              >
                <option value="">Select Classification</option>
                <option value="Important">Important</option>
                <option value="Reviewed">Reviewed</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Important</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {importantFlashcards.map((flashcard,index) => (
            <div key={`${flashcard}-${index}`} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-bold mb-2">{flashcard.heading}</h2>
              <p className="text-gray-700">{flashcard.description}</p>
              <select
                value={getClassForFlashcard(flashcard)}
                onChange={(e) => handleClassificationChange(flashcard.heading, e.target.value)}
                className="mt-2 p-2 border rounded"
              >
                <option value="">Select Classification</option>
                <option value="Important">Important</option>
                <option value="Reviewed">Reviewed</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Reviewed</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Heading</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Classification</th>
            </tr>
          </thead>
          <tbody>
            {reviewedFlashcards.map((flashcard,index) => (
              <tr key={`${flashcard}-${index}`} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{flashcard.heading}</td>
                <td className="border px-4 py-2">{flashcard.description}</td>
                <td className="border px-4 py-2">
                  <select
                    value={getClassForFlashcard(flashcard)}
                    onChange={(e) => handleClassificationChange(flashcard.heading, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Classification</option>
                    <option value="Important">Important</option>
                    <option value="Reviewed">Reviewed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlashcardList;
