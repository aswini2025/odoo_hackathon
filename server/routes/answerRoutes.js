const express = require('express');
const router = express.Router();
const { postAnswer, getAnswers } = require('../controllers/answerController');

router.post('/', postAnswer);              // POST /api/answers
router.get('/:questionId', getAnswers);    // GET /api/answers/:questionId

module.exports = router;
