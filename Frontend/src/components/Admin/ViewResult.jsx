import React, { useState, useEffect } from "react";

function ViewResult() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [topFivePerformers, setTopFivePerformers] = useState([]);

  // Fetch quiz list on mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  // Fetch top performers whenever quizId changes
  useEffect(() => {
    if (!selectedQuizId) return; // Don't call API if no quiz is selected

    const topPerformers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/quizzes/result/${selectedQuizId}`
        );
        const data = await res.json();
        console.log("Top performers", data);
        setTopFivePerformers(data);
      } catch (err) {
        console.error("Error fetching top performers:", err);
      }
    };

    topPerformers();
  }, [selectedQuizId]); // 👈 This is key

  return (
    <div>
      <label htmlFor="quizSelect">Select a Quiz:</label>
      <select
        id="quizSelect"
        value={selectedQuizId}
        onChange={(e) => setSelectedQuizId(e.target.value)}
      >
        <option value="">-- Choose a quiz --</option>
        {quizzes.map((quiz) => (
          <option key={quiz._id} value={quiz._id}>
            {quiz.title}
          </option>
        ))}
      </select>

      {/* Show top performers */}
      {topFivePerformers.length > 0 && (
        <ul>
          {topFivePerformers.map((user, idx) => (
            <li key={idx}>
              {user.user?.name} — {user.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewResult;
