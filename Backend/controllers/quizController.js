const { default: mongoose } = require('mongoose');
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

const getResult = async (req, res) => {
  try {
    const quizId= req.params.id 
    console.log(quizId)
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quizId" });
    }

    const PRIORITY_BRANCHES = ["ECE", "EEE", "MECH", "CHEM"];

    // 1. Get top 10 performers
    const top10 = await Result.find({ quizId })
      .sort({ score: -1, submittedAt: 1 })
      .limit(10)
      .select("user score submittedAt");

    // 2. Separate priority branch users & others
    const priority = top10.filter(r => PRIORITY_BRANCHES.includes(r.user.branch));
    const others = top10.filter(r => !PRIORITY_BRANCHES.includes(r.user.branch));

    // 3. Merge so priority users appear first
    let finalList = [...priority, ...others];

    // 4. Remove duplicates by username
    finalList = finalList.filter(
      (item, index, self) =>
        index === self.findIndex(u => u.user.name === item.user.name)
    );

    // 5. Keep only top 5 after promotion
    finalList = finalList.slice(0, 5);

    res.status(200).json(finalList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {userFeedback, createQuiz ,getQuiz,quizStatus,userQuizRender,userResult,getResult};
