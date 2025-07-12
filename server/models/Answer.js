const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);
