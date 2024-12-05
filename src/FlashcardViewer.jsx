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
      <div className="bg-white p-6 shadow-md rounded-md mt-[60px]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{flashcard.heading}</h2>
        <p className="text-gray-600 mb-6">{flashcard.description}</p>
        <div className="flex justify-between">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    )
  );
};

export default FlashcardViewer;