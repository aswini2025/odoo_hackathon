const Question = require('../models/Question');

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags, author } = req.body;
    const question = new Question({ title, description, tags, author });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
