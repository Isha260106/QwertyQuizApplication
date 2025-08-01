const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: 'Quiz created' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving quiz', error });
  }
};

const getQuiz=async(req,res)=>{
  try{
    const quiz=await Quiz.find();
    res.json(quiz)
  }catch(err){
    res.status(500).json({message:'Error getting quiz',err})
  }
}

 const quizStatus=async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    quiz.isActive = !quiz.isActive;
    await quiz.save();

    res.json({ isActive: quiz.isActive });
  } catch (error) {
    res.status(500).json({"Error":error});
  }
}

const userQuizRender=async (req, res) => {
  const quizzes = await Quiz.find({ isActive: true });
  res.json(quizzes);
}

const userResult=async (req, res) => {
  const { quizId, score, answers } = req.body;

  try {
    const result = new Result({
      userId: req.user.id,
      quizId,
      score,
      answers
    });

    await result.save();
    res.status(201).json({ message: 'Quiz submitted successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createQuiz ,getQuiz,quizStatus,userQuizRender,userResult};
