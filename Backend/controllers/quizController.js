const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const Feedback =require('../models/feedback');
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

const userFeedback=async(req,res)=>{
  try{
    const feedback=new Feedback(req.body);
    await feedback.save();
    res.status(201).json({message : 'Feedback submitted'})
  }catch(err){
    res.status(500).json({message:'Error storing data',err})
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

const userResult = async (req, res) => {
  const { user, quizId, score, answers } = req.body;

  if (!user || !quizId) {
    return res.status(400).json({ message: 'User details and quizId are required' });
  }

  try {
    const result = new Result({
      user,  // entire user object (name, email, usn)
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
};


module.exports = {userFeedback, createQuiz ,getQuiz,quizStatus,userQuizRender,userResult};
