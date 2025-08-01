import React, { useState,useEffect } from 'react';

function Quiz({ quiz}) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      alert("Tab switch detected! You may be disqualified.");
      // Optionally: log or auto-submit quiz
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
}, []);


  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) || 
        (e.ctrlKey && ['U', 'S', 'C'].includes(e.key))) {
      e.preventDefault();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);


  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleRightClick);
    
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  // Handle radio and checkbox inputs
  const handleChange = (qIndex, value, type, isChecked) => {
  setAnswers((prev) => {
    if (type === "checkbox") {
      const prevAnswers = prev[qIndex] || [];
      if (isChecked) {
        return { ...prev, [qIndex]: [...prevAnswers, value] };
      } else {
        return { ...prev, [qIndex]: prevAnswers.filter((v) => v !== value) };
      }
    } else {
      return { ...prev, [qIndex]: value };
    }
  });
};


  const handleSubmit = async () => {
    let sc = 0;

    quiz.questions.forEach((q, i) => {
      const userAnswer = answers[i];

      if (q.inputType === "radio") {
        if (userAnswer === q.correctAnswer) {
          sc++;
        }
      } else if (q.inputType === "checkbox") {
        const correct = q.correctAnswer.sort();
        const user = (userAnswer || []).sort();

        if (
          correct.length === user.length &&
          correct.every((val, idx) => val === user[idx])
        ) {
          sc++;
        }
      }
    });

    setScore(sc);
    setSubmitted(true);

    // Submit to backend
    try {
      const token = localStorage.getItem("token"); // Assuming JWT stored
      const res = await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // If using JWT
        },
        body: JSON.stringify({
          quizId: quiz._id,
          score: sc,
          answers: answers,
        }),
      });

      const data = await res.json();
      console.log("Saved result:", data);
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-black-100">
  <div className="bg-black p-6 rounded shadow-md max-w-xl w-fit">
    <h2 className="text-3xl text-white font-bold mb-4 text-center">{quiz.title}</h2>
    {quiz.questions.map((q, i) => (
      <div key={i} className="mb-6 border border-purple-500 p-4 rounded">
        <p className="font-semibold text-wrap">{q.question}</p>
        {[q.option1, q.option2, q.option3, q.option4].map((opt, j) => (
          <div key={j}>
            <label className="block mt-1">
              <input
                type={q.inputType}
                name={q.inputType === 'radio' ? `question-${i}` : `option-${i}-${j}`}
                value={opt}
                onChange={(e) => handleChange(i, opt, q.inputType, e.target.checked)}
                disabled={submitted}
                checked={
                  q.inputType === "checkbox"
                    ? answers[i]?.includes(opt)
                    : answers[i] === opt
                }
                className="mr-2"
              />
              {opt}
            </label>
          </div>
        ))}
      </div>
    ))}

    {!submitted ? (
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded self-center"
        onClick={handleSubmit}
      >
        Submit
      </button>
    ) : (
      <p className="mt-4 text-green-600 font-bold text-center">
        Your Score: {score}/{quiz.questions.length}
      </p>
    )}
  </div>
</div>

    
  );
}

export default Quiz;
