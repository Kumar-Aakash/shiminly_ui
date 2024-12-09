import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload";
import FlashcardViewer from "../FlashcardViewer";
import FlashcardTable from "../FlashcardTable";
import ProfileSelector from "../ProfileSelector";
import FlashcardList from "../FlashcardList";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';


const FlashCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [acceptedFlashcards, setAcceptedFlashcards] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("Teacher");

  const { profile } = useParams();

  useEffect(()=>{
    setSelectedProfile(profile)    
  },[profile])


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
            classification: {},
          };
        }
        saveFlashcardData(newData);

        return updated;
      });
      toast.success("Flashcard accepted and saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (action === "reject") {
      toast.error("Flashcard Rejected!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });    }
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
      const data = flashcardData[flashcard?.heading];
      return (
        data &&
        data.assignedClasses &&
        data.assignedClasses.includes(selectedProfile)
      );
    });
  };

  const filteredFlashcards = getFilteredFlashcards();


  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        {/* <div className="w-full sm:w-auto">
          <ProfileSelector
            profiles={profiles}
            selectedProfile={selectedProfile}
            onSelectProfile={setSelectedProfile}
          />
        </div> */}
      </div>

      <div className="bg-white rounded-lg px-6 pb-6">
        {selectedProfile === "Teacher" ? (
          <>
            <>
            <h1 className="text-lg font-medium text-[#071434] -mt-8   sm:mb-0">
          Flashcard Generator
        </h1>

              <div className="flex flex-col mt-8 sm:flex-row gap-6">
                {/* FileUpload Section */}
                <div className="sm:w-1/2 bg-white h-[400px] p-6 rounded-lg border border-gray-200 shadow-sm">
                  <FileUpload
                    onGenerateFlashcards={handleGenerateFlashcards}
                    isLoading={isLoading}
                  />
                </div>

                {/* FlashcardViewer Section */}
                {!reviewCompleted && flashcards.length > 0 && (
                  <div className="sm:w-1/2 px-auto -mt-16 flex align-center align-middle justify-center bg-white p-6 rounded-lg">
                    <FlashcardViewer
                      flashcards={flashcards}
                      onFlashcardAction={handleFlashcardAction}
                      onReviewCompleted={handleReviewCompleted}
                    />
                  </div>
                )}
              </div>
            </>

            {showTable && (
              <div className="mt-6">
                <FlashcardTable
                  flashcards={acceptedFlashcards}
                  classes={classes}
                  isTeacher={true}
                  flashcardData={flashcardData}
                  onUpdateFlashcardData={saveFlashcardData}
                />
              </div>
            )}

            {acceptedFlashcards.length > 0 && !showTable && (
              <div className="text-center mt-8">
                <button
                  onClick={handleViewTable}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-200"
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
    </div>
  );
};

export default FlashCards;
