import { useState } from "react";
import QuizContext from "./QuizContext";

const QuizContextProvider = ({ children }) => {
  const [adminToggle, setAdminToggle] = useState(false); // unrelated toggle
  const [quiz, setQuiz] = useState(null);                 // selected quiz
  const [quizActive, setQuizActive] = useState(false);    // start/stop status

  // Start/Stop selected quiz
  const startStopQuiz = async () => {
    if (!quiz?._id) {
      alert("No quiz selected!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/toggle/${quiz._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Only update quiz start/stop status
      setQuizActive(data.isActive);
      setQuiz((prev) => ({ ...prev, isActive: data.isActive }));

    } catch (err) {
      console.error("Error toggling quiz:", err);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        adminToggle, setAdminToggle, // unrelated toggle
        quiz, setQuiz,
        quizActive, setQuizActive,   // start/stop quiz state
        startStopQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;
