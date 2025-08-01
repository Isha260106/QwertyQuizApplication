import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Wait from "./Wait";

function GetQuiz() {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    let intervalId;

    async function fetchActiveQuizzes() {
      try {
        const response = await fetch("http://localhost:5000/api/quizzes/active");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if quiz data has changed before updating state
        setQuiz((prevQuiz) => {
          const prevJson = JSON.stringify(prevQuiz);
          const newJson = JSON.stringify(data);
          return prevJson !== newJson ? data : prevQuiz;
        });

        console.log("Fetched quizzes:", data);
      } catch (err) {
        console.error("Error fetching active quizzes:", err);
      }
    }

    fetchActiveQuizzes(); // initial fetch

    intervalId = setInterval(fetchActiveQuizzes, 5000); // poll every 5 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <>
      {quiz && quiz.length > 0 ? (
        quiz.map((q, index) => <Quiz key={q._id || index} quiz={q} />)
      ) : (
        <Wait />
      )}
    </>
  );
}

export default GetQuiz;
