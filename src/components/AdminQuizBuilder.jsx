// src/AdminQuizBuilder.jsx
import React, { useState } from 'react';
import Question from './Question';

function AdminQuizBuilder() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 0) {
      setQuestionCount(count);
      setQuestions(Array(count).fill().map(() => ({
        inputType: "radio",
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
      })));
    }
  };

  const handleQuestionChange = (index, name, value) => {
    const updated = [...questions];

    if (typeof value === 'function') {
      updated[index][name] = value(updated[index][name]);
    } else {
      updated[index][name] = value;
    }

    setQuestions(updated);
  };

  const validateForm = () => {
    if (!quizTitle.trim() || !quizDescription.trim()) return false;

    for (let q of questions) {
      if (
        !q.question.trim() ||
        !q.option1.trim() ||
        !q.option2.trim() ||
        !q.option3.trim() ||
        !q.option4.trim() ||
        (q.inputType === "radio" && !q.correctAnswer) ||
        (q.inputType === "checkbox" && (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0))
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all fields!");
      return;
    }

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      questions: questions
    };

    console.log("Quiz Data:", quizData);

    // Uncomment below when backend is ready
    /*
    try {
      const res = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      });

      if (res.ok) {
        alert("Quiz submitted successfully!");
        setQuizTitle('');
        setQuizDescription('');
        setQuestionCount(0);
        setQuestions([]);
      } else {
        alert("Failed to submit quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Try again.");
    }
    */
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Quiz</h2>

      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <textarea
        placeholder="Quiz Description"
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      <input
        type="number"
        min="0"
        placeholder="Number of questions"
        value={questionCount}
        onChange={handleCountChange}
        style={{ padding: '8px', marginBottom: '20px' }}
      />

      {questions.map((_, index) => (
        <Question key={index} index={index} onChange={handleQuestionChange} />
      ))}

      {questions.length > 0 && (
        <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default AdminQuizBuilder;
