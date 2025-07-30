const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: 'Quiz created' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving quiz', error });
  }
};

module.exports = { createQuiz };
