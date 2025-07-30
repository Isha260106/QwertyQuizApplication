const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [
    {
      inputType: String,
      question: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
      correctAnswer: mongoose.Schema.Types.Mixed, // string or array
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema);
