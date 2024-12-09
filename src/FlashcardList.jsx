import React from 'react';
import Dropdown from './Dropdown'; // Import the Dropdown component

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

  const getClassForFlashcard = (flashcard) => {
    const data = flashcardData[flashcard.heading];
    if (!data || !data.classification) return '';
    return data.classification[selectedProfile] || '';
  };

  const dropdownOptions = [
    { value: 'Important', label: 'Important' },
    { value: 'Reviewed', label: 'Reviewed' }
  ];

  const newFlashcards = flashcards.filter((f) => getClassForFlashcard(f) === '');
  const importantFlashcards = flashcards.filter((f) => getClassForFlashcard(f) === 'Important');
  const reviewedFlashcards = flashcards.filter((f) => getClassForFlashcard(f) === 'Reviewed');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-[#071434]">New Flash Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {newFlashcards.map((flashcard, index) => (
            <div key={`${flashcard.heading}-${index}`} className="mx-auto mt-10 bg-white rounded-lg shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg p-6">
                  <h2 className="text-[16px] font-medium text-white text-center mb-2">{flashcard.heading}</h2>
                  <p className="text-white text-[13px] text-center">{flashcard.subheading || 'Expand your knowledge!'}</p>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-700 text-center text-[13px] leading-relaxed mb-2">{flashcard.description}</p>
                </div>
              </div>
              <div className="p-6 -mt-12">
                <Dropdown
                  value={getClassForFlashcard(flashcard)}
                  onChange={(value) => handleClassificationChange(flashcard.heading, value)}
                  options={dropdownOptions}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-[#071434] mt-[100px]">Important Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {importantFlashcards.map((flashcard, index) => (
            <div key={`${flashcard.heading}-${index}`} className="mx-auto mt-10 bg-white rounded-lg shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg p-6">
                  <h2 className="text-[16px] font-medium text-white text-center mb-2">{flashcard.heading}</h2>
                  <p className="text-white text-[13px] text-center">{flashcard.subheading || 'Expand your knowledge!'}</p>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-700 text-center text-[13px] leading-relaxed mb-2">{flashcard.description}</p>
                </div>
              </div>
              <div className="pt-0 p-6 -mt-12">
                <Dropdown
                  value={getClassForFlashcard(flashcard)}
                  onChange={(value) => handleClassificationChange(flashcard.heading, value)}
                  options={dropdownOptions}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-[#071434] mt-[100px]">Reviewed</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Heading</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Classification</th>
            </tr>
          </thead>
          <tbody>
            {reviewedFlashcards.map((flashcard, index) => (
              <tr key={`${flashcard.heading}-${index}`} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{flashcard.heading}</td>
                <td className="border px-4 py-2">{flashcard.description}</td>
                <td className="border px-4 py-2">
                  <Dropdown
                    value={getClassForFlashcard(flashcard)}
                    onChange={(value) => handleClassificationChange(flashcard.heading, value)}
                    options={dropdownOptions}
                  />
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