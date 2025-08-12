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
    if (!selectedQuizId) return;

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
  }, [selectedQuizId]);

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

      {topFivePerformers.length > 0 && (
        <table border="1" cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>USN</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Score</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {topFivePerformers.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.user?.name}</td>
                <td>{result.user?.usn}</td>
                <td>{result.user?.semester}</td>
                <td>{result.user?.branch}</td>
                <td>{result.user?.mobileNo}</td>
                <td>{result.user?.email}</td>
                <td>{result.score}</td>
                <td>{new Date(result.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewResult;
