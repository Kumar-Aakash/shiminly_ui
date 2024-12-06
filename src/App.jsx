import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import FlashcardViewer from "./FlashcardViewer";
import FlashcardTable from "./FlashcardTable";
import ProfileSelector from "./ProfileSelector";
import FlashcardList from "./FlashcardList";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [acceptedFlashcards, setAcceptedFlashcards] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("Teacher");

  const classes = ["Class A", "Class B", "Class C"];
  const profiles = ["Teacher", ...classes];

  // Single source of truth for assignments and classifications
  const [flashcardData, setFlashcardData] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("flashcardData")) || {};
    return stored;
  });

  useEffect(() => {
    const storedFlashcards =
      JSON.parse(localStorage.getItem("acceptedFlashcards")) || [];
    setAcceptedFlashcards(storedFlashcards);
    if (storedFlashcards.length > 0) {
      setShowTable(true);
    }
  }, []);

  const saveFlashcardData = (updatedData) => {
    setFlashcardData(updatedData);
    localStorage.setItem("flashcardData", JSON.stringify(updatedData));
  };

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

        // Initialize flashcardData entry if not present
        const newData = { ...flashcardData };
        if (!newData[flashcard.heading]) {
          newData[flashcard.heading] = {
            assignedClasses: [],
            classification: {}
          };
        }
        saveFlashcardData(newData);

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
    setShowTable(true);
  };

  const handleViewTable = () => {
    setShowTable(true);
  };

  // Filter flashcards for non-teacher profiles based on assigned classes
  const getFilteredFlashcards = () => {
    if (selectedProfile === "Teacher") return acceptedFlashcards;

    // Check in flashcardData to see if the flashcard is assigned to this profile (class)
    return acceptedFlashcards.filter((flashcard) => {
      const data = flashcardData[flashcard.heading];
      return data && data.assignedClasses && data.assignedClasses.includes(selectedProfile);
    });
  };

  const filteredFlashcards = getFilteredFlashcards();

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Flashcard Generator</h1>
        <ProfileSelector
          profiles={profiles}
          selectedProfile={selectedProfile}
          onSelectProfile={setSelectedProfile}
        />
      </div>

      {selectedProfile === "Teacher" ? (
        <>
          <FileUpload onGenerateFlashcards={handleGenerateFlashcards} isLoading={isLoading} />

          {!reviewCompleted && flashcards.length > 0 && (
            <FlashcardViewer
              flashcards={flashcards}
              onFlashcardAction={handleFlashcardAction}
              onReviewCompleted={handleReviewCompleted}
            />
          )}

          {showTable && (
            <FlashcardTable
              flashcards={acceptedFlashcards}
              classes={classes}
              isTeacher={true}
              flashcardData={flashcardData}
              onUpdateFlashcardData={saveFlashcardData}
            />
          )}

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
        </>
      ) : (
        <FlashcardList
          flashcards={filteredFlashcards}
          selectedProfile={selectedProfile}
          flashcardData={flashcardData}
          onUpdateFlashcardData={saveFlashcardData}
        />
      )}
    </div>
  );
};

export default App;
