const express = require('express');
const router = express.Router();
const { createQuiz,getQuiz,quizStatus,userQuizRender,userResult,userFeedback} = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.post('/', createQuiz);

router.get('/',getQuiz);

router.get('/active',userQuizRender);

router.patch('/toggle/:id',quizStatus);

router.post('/submit',userResult);

router.post('/feedback',userFeedback)

module.exports = router;
