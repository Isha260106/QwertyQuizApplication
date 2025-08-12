const express = require('express');
const router = express.Router();
const { createQuiz,getQuiz,quizStatus,userQuizRender,userResult,userFeedback,getResult} = require('../controllers/quizController');


router.post('/', createQuiz);

router.get('/',getQuiz);

router.get('/active',userQuizRender);

router.patch('/toggle/:id',quizStatus);

router.post('/submit',userResult);

router.get('/result/:id',getResult);

router.post('/feedback',userFeedback)

module.exports = router;
