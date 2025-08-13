// import React, { useState,useEffect } from 'react';
// import {useNavigate} from 'react-router'

// import CountdownTimer from './CountDownTimer';

// function Quiz({ quiz}) {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);

//   const navigate=useNavigate()
//   useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       alert("Tab switch detected! You may be disqualified.");
//       setAnswers({})
//     }
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
// }, []);


//   useEffect(() => {
//   const handleKeyDown = (e) => {
//     if (e.key === 'F12' || 
//         (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) || 
//         (e.ctrlKey && ['U', 'S', 'C'].includes(e.key))) {
//       e.preventDefault();
//     }
//   };

//   document.addEventListener('keydown', handleKeyDown);
//   return () => document.removeEventListener('keydown', handleKeyDown);
// }, []);


//   useEffect(() => {
//     const handleRightClick = (e) => {
//       e.preventDefault();
//     };
//     document.addEventListener("contextmenu", handleRightClick);
    
//     return () => {
//       document.removeEventListener("contextmenu", handleRightClick);
//     };
//   }, []);

//   // Handle radio and checkbox inputs
//   const handleChange = (qIndex, value, type, isChecked) => {
//   setAnswers((prev) => {
//     if (type === "checkbox") {
//       const prevAnswers = prev[qIndex] || [];
//       if (isChecked) {
//         return { ...prev, [qIndex]: [...prevAnswers, value] };
//       } else {
//         return { ...prev, [qIndex]: prevAnswers.filter((v) => v !== value) };
//       }
//     } else {
//       return { ...prev, [qIndex]: value };
//     }
//   });
// };


//   const handleSubmit = async () => {
//     let sc = 0;

//     quiz.questions.forEach((q, i) => {
//       const userAnswer = answers[i];

//       if (q.inputType === "radio") {
//         if (userAnswer === q.correctAnswer) {
//           sc++;
//         }
//       } else if (q.inputType === "checkbox") {
//         const correct = q.correctAnswer.sort();
//         const user = (userAnswer || []).sort();

//         if (
//           correct.length === user.length &&
//           correct.every((val, idx) => val === user[idx])
//         ) {
//           sc++;
//         }
//       }
//     });

//     setScore(sc);
//     setSubmitted(true);

//     // Submit to backend
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const res = await fetch('http://localhost:5000/api/quizzes/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
          
//         },
//         body: JSON.stringify({
//           user,
//           quizId: quiz._id,
//           score: sc,
//           answers: answers, 
//         }),
//       });

//       const data = await res.json();
//       console.log("Saved result:", data);
//     } catch (err) {
//       console.error('Error submitting quiz:', err);
//     }
//   };

//   return (
    
//     <div className="min-h-screen flex items-center justify-center bg-black-100">
//   <div className="bg-black p-6 rounded w-full text-3xl sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-3/5 mx-auto">
//     <h2 className="text-3xl text-white font-bold mb-4 text-center">{quiz.title}</h2>
//     <CountdownTimer/>
//     {quiz.questions.map((q, i) => (
//       <div key={i} className="mb-6 border border-purple-500 p-4 rounded">
//         <p className="font-semibold text-wrap">{q.question}</p>
//         {[q.option1, q.option2, q.option3, q.option4].map((opt, j) => (
//           <div key={j}>
//             <label className="block mt-1">
//               <input
//                 type={q.inputType}
//                 name={q.inputType === 'radio' ? `question-${i}` : `option-${i}-${j}`}
//                 value={opt}
//                 onChange={(e) => handleChange(i, opt, q.inputType, e.target.checked)}
//                 disabled={submitted}
//                 checked={
//                   q.inputType === "checkbox"
//                     ? answers[i]?.includes(opt)
//                     : answers[i] === opt
//                 }
//                 className="mr-2"
//               />
//               {opt}
//             </label>
//           </div>
//         ))}
//       </div>
//     ))}

//     {!submitted ? (
//       <button
//         className="bg-purple-500 text-white px-4 py-2 rounded self-center"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     ) : (
//       navigate('/feedback')
//     )}
//   </div>
// </div>

    
//   );
// }

// export default Quiz;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountDownTimer';

// 🔹 Helper to shuffle an array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Quiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuiz, setShuffledQuiz] = useState(null);

  const navigate = useNavigate();

  // 🔹 Shuffle questions + options ONCE when quiz loads
  useEffect(() => {
    if (quiz && quiz.questions) {
      const shuffledQuestions = shuffleArray(quiz.questions).map(q => {
        const options = shuffleArray([q.option1, q.option2, q.option3, q.option4]);
        return { ...q, options };
      });
      setShuffledQuiz({ ...quiz, questions: shuffledQuestions });
    }
  }, [quiz]);

  // 🔹 Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Tab switch detected! You may be disqualified.");
        setAnswers({});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 🔹 Block dev tools shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'S', 'C'].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 🔹 Disable right click
  // useEffect(() => {
  //   const handleRightClick = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleRightClick);
  //   return () => document.removeEventListener("contextmenu", handleRightClick);
  // }, []);

  // 🔹 Handle answer changes
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

  // 🔹 Submit quiz
  const handleSubmit = async () => {
    let sc = 0;

    shuffledQuiz.questions.forEach((q, i) => {
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

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('http://localhost:5000/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
          quizId: shuffledQuiz._id,
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

  if (!shuffledQuiz) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black-100">
      <div className="bg-black p-6 rounded text-3xl mx-auto">
        <h2 className="text-4xl text-white font-bold mb-4 text-center">{shuffledQuiz.title}</h2>
        <CountdownTimer />
        
        {shuffledQuiz.questions.map((q, i) => (
          <div key={i} className="mb-6 border border-purple-500 p-4 rounded-3xl">
            <div className='mb-5'>
              <span className="font-semibold">{i+1}.{" "}</span>
            <code className=' text-white text-wrap whitespace-pre'>{q.question}</code>
            </div>
            {q.options.map((opt, j) => (
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
          <div className="flex justify-center mt-4">
    <button
      className="bg-purple-500 text-white px-4 py-2 rounded"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
        ) : (
          navigate('/feedback')
        )}
      </div>
    </div>
  );
}

export default Quiz;
