import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload";
import FlashcardViewer from "../FlashcardViewer";
import FlashcardTable from "../FlashcardTable";
import toast from "react-hot-toast";

const SplashCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [acceptedFlashcards, setAcceptedFlashcards] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);

  const classes = ["Class A", "Class B", "Class C"];

  useEffect(() => {
    const storedFlashcards =
      JSON.parse(localStorage.getItem("acceptedFlashcards")) || [];
    setAcceptedFlashcards(storedFlashcards);
    if (storedFlashcards.length > 0) {
      setShowTable(true);
    }
  }, []);

  const handleGenerateFlashcards = async (text, numFlashcards) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ai-gamified-api-82go.onrender.com/generate-flashcards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: text,
            num_flashcards: numFlashcards,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFlashcards(data.flashcards);
        setReviewCompleted(false);
      }
    } catch (error) {
      toast.error("Error generating flashcards!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlashcardAction = (flashcard, action) => {
    if (action === "accept") {
      setAcceptedFlashcards((prev) => {
        const updated = [...prev, flashcard];
        localStorage.setItem("acceptedFlashcards", JSON.stringify(updated));
        toast.success("Flashcard accepted and saved!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return updated;
      });
    }
    if (action === "reject") {
      toast.error("Flashcard rejected!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleReviewCompleted = () => {
    setReviewCompleted(true);
    setShowTable(true);
  };

  const handleViewTable = () => {
    setShowTable(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="flex gap-8">
          <div className="bg-white shadow-xl rounded-lg p-6 flex-1">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Generate Flashcards
              </h2>
            </div>
            <FileUpload
              onGenerateFlashcards={handleGenerateFlashcards}
              isLoading={isLoading}
            />
          </div>

          {flashcards.length > 0 && !reviewCompleted && (
            <div className="bg-white shadow-xl rounded-lg p-6 flex-1">
              <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Review Flashcards
              </h2>
            </div>
              <FlashcardViewer
                flashcards={flashcards}
                onFlashcardAction={handleFlashcardAction}
                onReviewCompleted={handleReviewCompleted}
              />
            </div>
          )}
        </div>
        {showTable && (
          <div className="bg-white shadow-xl rounded-lg p-6 mb-8 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Accepted Flashcards
            </h2>
            <FlashcardTable flashcards={acceptedFlashcards} classes={classes} />
          </div>
        )}

        {acceptedFlashcards.length > 0 && !showTable && (
          <div className="text-center mt-10">
            <button
              onClick={handleViewTable}
              className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:bg-green-600 hover:scale-105"
            >
              View Accepted Flashcards
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SplashCards;
