const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: {
    name:String,
    usn:String,
    semester:String,
    branch:String,
    mobileNo:String,
    email:String,
  },
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
  },
  score: Number,
  answers: Object,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
