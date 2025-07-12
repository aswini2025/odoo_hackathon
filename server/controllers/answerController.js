const Answer = require('../models/Answer');

exports.postAnswer = async (req, res) => {
  try {
    const { questionId, content, author } = req.body;
    const answer = new Answer({ questionId, content, author });
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ questionId }).sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
