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
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col justify-between">
        <label className="text-4xl text-center" htmlFor="quizSelect">Select a Quiz:</label>
      <select
        id="quizSelect"
        value={selectedQuizId}
        onChange={(e) => setSelectedQuizId(e.target.value)}
        className="border border-purple-600 m-10 p-5"
      >
        <option value="" className="bg-black text-gray-400">-- Choose a quiz --</option>
        {quizzes.map((quiz) => (
          <option className="bg-black text-gray-400" key={quiz._id} value={quiz._id}>
            {quiz.title}
          </option>
        ))}
      </select>

      {topFivePerformers.length > 0 && (
        <table className="border border-purple-600" >
          <thead className="border-b-2 border-purple-600">
            <tr>
              <th className="border-r-2 border-purple-600 text-center p-4">Rank</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Name</th>
              <th className="border-r-2 border-purple-600 text-center p-4">USN</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Semester</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Branch</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Mobile</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Email</th>
              <th className="border-r-2 border-purple-600 text-center p-4">Score</th>
              <th className=" text-center p-4">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {topFivePerformers.map((result, index) => (
              <tr key={index}>
                <td className="border-r-2 border-purple-600 text-center p-4">{index + 1}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.name}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.usn}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.semester}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.branch}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.mobileNo}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.user?.email}</td>
                <td className="border-r-2 border-purple-600 text-center p-4">{result.score}</td>
                <td className="text-center p-4">{new Date(result.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default ViewResult;
