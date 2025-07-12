const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  author: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);
answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]