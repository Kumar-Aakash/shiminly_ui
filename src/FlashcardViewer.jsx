import { useState, useEffect } from "react";

const FlashcardViewer = ({ flashcards, onFlashcardAction, onReviewCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= flashcards.length) {
      onReviewCompleted();
    }
  }, [currentIndex, flashcards.length, onReviewCompleted]);

  const handleAccept = () => {
    onFlashcardAction(flashcards[currentIndex], "accept");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    onFlashcardAction(flashcards[currentIndex], "reject");
    setCurrentIndex((prev) => prev + 1);
  };

  const flashcard = flashcards[currentIndex];

  return (
    flashcard && (
      <div className="mx-auto mt-10 bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
        {/* Flashcard Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-2">{flashcard.heading}</h2>
          <p className="text-white text-sm text-center">{flashcard.subheading || "Expand your knowledge!"}</p>
        </div>

        {/* Flashcard Content */}
        <div className="p-6">
          <p className="text-gray-700 text-center text-lg leading-relaxed mb-6">{flashcard.description}</p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FlashcardViewer;
