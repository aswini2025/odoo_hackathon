import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  // Fetch question and answers
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions');
        const current = res.data.find((q) => q._id === id);
        setQuestion(current || null);
      } catch (err) {
        console.error('Error fetching question:', err);
      }
    };

    const fetchAnswers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/answers/${id}`);
        setAnswers(res.data);
      } catch (err) {
        console.error('Error fetching answers:', err);
      }
    };

    fetchQuestion();
    fetchAnswers();
  }, [id]);

  // Submit answer
  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/answers`, // ✅ FIXED: do NOT include `/${id}`
        {
          questionId: id,
          content: newAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswers((prev) => [res.data, ...prev]);
      setNewAnswer('');
    } catch (err) {
      console.error('❌ Failed to submit answer:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Could not submit answer.');
    }
  };

  return (
    <div className="p-6">
      {question && (
        <>
          <h1 className="text-2xl font-bold mb-2 text-primary">{question.title}</h1>
          <div
            className="prose prose-invert bg-card p-4 rounded"
            dangerouslySetInnerHTML={{ __html: question.description }}
          ></div>

          <div className="mt-2 flex gap-2 flex-wrap">
            {question.tags.map((tag, i) => (
              <span key={i} className="bg-primary text-black text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 text-muted text-sm">Asked by @{question.author}</div>
        </>
      )}

      {/* ANSWERS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Answers ({answers.length})</h2>
        {answers.length === 0 && (
          <div className="text-sm text-muted">No answers yet. Be the first!</div>
        )}
        {answers.map((ans) => (
          <div key={ans._id} className="bg-card p-4 rounded mb-3">
            <div
              className="prose prose-invert"
              dangerouslySetInnerHTML={{ __html: ans.content }}
            ></div>
            <div className="mt-2 flex justify-between text-sm text-muted">
              <div>by @{ans.author}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW ANSWER */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2 text-primary">Your Answer</h2>
        <ReactQuill
          theme="snow"
          value={newAnswer}
          onChange={setNewAnswer}
          className="bg-white text-black"
        />
        <button
          onClick={handleAnswerSubmit}
          className="mt-4 bg-primary text-black px-6 py-2 rounded hover:bg-cyan-300 transition"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;
