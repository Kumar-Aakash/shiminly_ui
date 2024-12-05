import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import FlashcardViewer from "./FlashcardViewer";
import FlashcardTable from "./FlashcardTable";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [acceptedFlashcards, setAcceptedFlashcards] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);

  const classes = ["Class A", "Class B", "Class C"];

  useEffect(() => {
    const storedFlashcards = JSON.parse(localStorage.getItem("acceptedFlashcards")) || [];
    setAcceptedFlashcards(storedFlashcards);
    if (storedFlashcards.length > 0) {
      setShowTable(true);
    }
  }, []);

  const handleGenerateFlashcards = async (text, numFlashcards) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-flashcards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: text, num_flashcards: numFlashcards }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFlashcards(data.flashcards);
        setReviewCompleted(false);
      }

    } catch (error) {
      alert("Error calling API.");
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
        console.log("Accepted Flashcards:", updated);
        return updated;
      });
      alert("Flashcard accepted and saved!");
    }
    if (action === "reject") {
      alert("Flashcard rejected!");
    }
  };

  const handleReviewCompleted = () => {
    setReviewCompleted(true);
    setShowTable(true); // Show the table immediately after review is completed
  };

  const handleViewTable = () => {
    console.log("Viewing Saved Flashcards:", acceptedFlashcards);
    setShowTable(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Flashcard Generator</h1>

      <FileUpload onGenerateFlashcards={handleGenerateFlashcards} isLoading={isLoading} />

      {!reviewCompleted && flashcards.length > 0 && (
        <FlashcardViewer
          flashcards={flashcards}
          onFlashcardAction={handleFlashcardAction}
          onReviewCompleted={handleReviewCompleted}
        />
      )}


      {showTable && <FlashcardTable flashcards={acceptedFlashcards} classes={classes} />}


      {acceptedFlashcards.length > 0 && !showTable && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewTable}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Accepted Flashcards
          </button>
        </div>
      )}
    </div>
  );
};

export default App;