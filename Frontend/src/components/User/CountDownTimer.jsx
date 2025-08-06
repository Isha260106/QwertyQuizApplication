// CountdownTimer.js
import React, { use } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router';

function CountdownTimer() {
  const navigate=useNavigate();
  const durationInMinutes = 1;
  const countdownTarget = Date.now() + durationInMinutes * 60 * 1000;

  // Function to call when timer finishes
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
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('http://localhost:5000/api/quizzes/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          user,
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

  // Optional custom display
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
        alert("Time's Up!!!")
        navigate('/feedback')
      return <span className="text-red-500">Time's up!</span>;
    } else {
      return (
        <span className="text-xl font-bold text-white">
          Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      );
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded text-center">
      <Countdown
        date={countdownTarget}
        renderer={renderer}
        onComplete={handleSubmit}
      />
    </div>
  );
}

export default CountdownTimer;
