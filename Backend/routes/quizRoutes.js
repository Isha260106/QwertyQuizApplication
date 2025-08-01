const express = require('express');
const router = express.Router();
const { createQuiz,getQuiz,quizStatus } = require('../controllers/quizController');

router.post('/', createQuiz);

router.get('/',getQuiz);

router.patch('/toggle/:id',quizStatus);


module.exports = router;
