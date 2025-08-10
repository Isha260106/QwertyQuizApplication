import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuizContext from "../../context/QuizContext";

function ShowAvailableQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const { setQuiz, setQuizActive } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/quizzes');
        const data = await res.json();
        setQuizzes(data); 
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectQuiz = (quiz) => {
    setQuiz(quiz);
    setQuizActive(quiz.isActive);
    navigate("/adminDashboard");
  };

  return (
    <div className="flex flex-col items-center bg-black text-white">
      <h1 className="text-4xl mb-5">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="p-4 flex flex-row justify-between space-x-12 border border-purple-500 rounded-xl shadow mb-4 cursor-pointer"
          onClick={() => handleSelectQuiz(quiz)}
        >
          <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default ShowAvailableQuizzes;
