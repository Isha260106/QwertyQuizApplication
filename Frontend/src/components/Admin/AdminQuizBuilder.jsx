// // src/AdminQuizBuilder.jsx
// import React, { useState } from 'react';
// import Question from './Question';

// function AdminQuizBuilder() {
//   const [quizTitle, setQuizTitle] = useState('');
//   const [quizDescription, setQuizDescription] = useState('');
//   const [questionCount, setQuestionCount] = useState(0);
//   const [questions, setQuestions] = useState([]);

//   const handleCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     if (!isNaN(count) && count >= 0) {
//       setQuestionCount(count);
//       setQuestions(Array(count).fill().map(() => ({
//         inputType: "radio",
//         question: '',
//         option1: '',
//         option2: '',
//         option3: '',
//         option4: '',
//         correctAnswer: ''
//       })));
//     }
//   };

//   const handleQuestionChange = (index, name, value) => {
//     const updated = [...questions];

//     if (typeof value === 'function') {
//       updated[index][name] = value(updated[index][name]);
//     } else {
//       updated[index][name] = value;
//     }

//     setQuestions(updated);
//   };

//   const validateForm = () => {
//     if (!quizTitle.trim()) return false;

//     for (let q of questions) {
//       if (
//         !q.question.trim() ||
//         !q.option1.trim() ||
//         !q.option2.trim() ||
//         !q.option3.trim() ||
//         !q.option4.trim() ||
//         (q.inputType === "radio" && !q.correctAnswer) ||
//         (q.inputType === "checkbox" && (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0))
//       ) {
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     const quizData = {
//       title: quizTitle,
//       description: quizDescription,
//       questions: questions
//     };
    
//     console.log("Quiz Data:", quizData);

    
    
//     try {
//       const res = await fetch('http://localhost:5000/api/quizzes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });

//       if (res.ok) {
//         alert("Quiz submitted successfully!");
//         setQuizTitle('');
//         setQuizDescription('');
//         setQuestionCount(0);
//         setQuestions([]);
//       } else {
//         alert("Failed to submit quiz.");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Server error. Try again.");
//     }
    
//   };

//   return (
//     <div className='flex flex-col justify-around gap-4 items-center min-h-screen bg-black'>
//     <div className='p-20 max-w-2xl  border border-purple-500 rounded-4xl flex flex-col  space-y-5 gap-4 text-white'>
//       <h2 className='text-5xl'>Create New Quiz</h2>

//       <input
//       className='text-2xl p-3 w-full mb-10 border border-purple-500'
//         type="text"
//         placeholder="Quiz Title"
//         value={quizTitle}
//         onChange={(e) => setQuizTitle(e.target.value)}
//       />

//       <textarea
//       className='text-2xl w-full mb-10 p-5 pb-6.5 border border-purple-500'
//         placeholder="Quiz Description"
//         value={quizDescription}
//         onChange={(e) => setQuizDescription(e.target.value)}
        
//       />

//       <input
//         className='text-2xl p-1.5 mb-10 border border-purple-500'
//         type="number"
//         placeholder="Number of questions"
//         value={questionCount}
//         onChange={handleCountChange}
//       /> </div>
//       <div>
//       {questions.map((_, index) => (
//         <Question key={index} index={index} onChange={handleQuestionChange} />
//       ))}

//       {questions.length > 0 && (
//         <button onClick={handleSubmit} 
//         className='mt-10 p-1.5 rounded-xl border border-purple-500'
//         >
//           Submit Quiz
//         </button>
//       )}
//       </div>
   
//     </div>
//   );
// }

// export default AdminQuizBuilder;
import React, { useState } from 'react';
import Question from './Question';
import { FaPlus } from 'react-icons/fa';

function AdminQuizBuilder() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Add new blank question
  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        inputType: "radio",
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
      }
    ]);
    setEditingIndex(questions.length); // open edit mode for new one
  };

  const handleQuestionChange = (index, name, value) => {
    const updated = [...questions];
    updated[index][name] = typeof value === 'function'
      ? value(updated[index][name])
      : value;
    setQuestions(updated);
  };

  const handleDelete = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const validateForm = () => {
    if (!quizTitle.trim()) return false;
    for (let q of questions) {
      if (
        !q.question.trim() ||
        !q.option1.trim() ||
        !q.option2.trim() ||
        !q.option3.trim() ||
        !q.option4.trim() ||
        (q.inputType === "radio" && !q.correctAnswer) ||
        (q.inputType === "checkbox" &&
          (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0))
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (setActive = false) => {
    if (!validateForm()) {
      alert("Please fill in all fields!");
      return;
    }

    const quizData = {
      title: quizTitle,
      questions: questions,
      active: setActive
    };

    try {
      const res = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      });

      if (res.ok) {
        alert("Quiz saved successfully!");
        setQuizTitle('');
        setQuestions([]);
        setEditingIndex(null);
      } else {
        alert("Failed to save quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="flex flex-col justify-around min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Title */}
        <h2 className="text-4xl mb-4">Enter Title</h2>
        <input
          type="text"
          className="w-full text-2xl p-3 mb-8 border border-purple-500 rounded bg-transparent"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        {/* Questions heading */}
        <div className="flex items-center mb-4">
          <h3 className="text-2xl mr-3">Questions</h3>
          <button
            onClick={handleAddQuestion}
            className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition"
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        {/* Questions preview table */}
        <div className="space-y-2 mb-8">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white text-black rounded px-4 py-2"
            >
              <span className="w-10">{idx + 1}</span>
              <span className="flex-1">{q.question || "Question preview"}</span>
              <button
                className="text-purple-600 font-semibold mr-4"
                onClick={() => setEditingIndex(idx)}
              >
                edit
              </button>
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleDelete(idx)}
              >
                del
              </button>
            </div>
          ))}
        </div>

        {/* Edit mode */}
        {editingIndex !== null && (
          <Question
            index={editingIndex}
            data={questions[editingIndex]}
            onChange={handleQuestionChange}
          />
        )}

        {/* Save buttons */}
        <div className="flex gap-6 mt-10">
          <button
            onClick={() => handleSubmit(false)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-medium"
          >
            Save
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-medium"
          >
            Save & Set
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminQuizBuilder;
