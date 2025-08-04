const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    usn: String,
  },
  quizId: String,
  score: Number,
  answers: Object,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
