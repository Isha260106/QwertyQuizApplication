const express = require('express');
const router = express.Router();
const { createQuiz,getQuiz,quizStatus,userQuizRender,userResult} = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.post('/', createQuiz);

router.get('/',getQuiz);

router.get('/active',userQuizRender);

router.patch('/toggle/:id',quizStatus);

router.post('/submit',userResult);

module.exports = router;
