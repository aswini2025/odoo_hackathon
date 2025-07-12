const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/auth', authRoutes);

// START SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ MongoDB Error:', err));
