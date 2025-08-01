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

module.exports = { createQuiz ,getQuiz,quizStatus};
