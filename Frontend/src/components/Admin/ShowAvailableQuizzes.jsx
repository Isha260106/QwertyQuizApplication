import React, { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";

function ShowAvailableQuizzes(){
    const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/quizzes', {
          method:'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setQuizzes(data); 
    } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);
    return(
        <div className="flex flex-col items-center bg-black text-white">
            <h1 className="text-4xl mb-5">Available Quizzes</h1>
            {quizzes.map((quiz) => (
  <div key={quiz._id} className="p-4 flex flex-row justify-between space-x-12 border border-purple-500 rounded-xl shadow mb-4">
    <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
    <ToggleButton quizId={quiz._id} initialStatus={quiz.isActive}/>
  </div>
))}
        </div>
    )
}

export default ShowAvailableQuizzes