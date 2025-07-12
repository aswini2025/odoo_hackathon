import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Questions</h1>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        questions.map((q) => (
          <QuestionCard
            key={q._id}
            title={q.title}
            tags={q.tags}
            author={q.author}
            id={q._id}
          />
        ))
      )}
    </div>
  );
};

export default Home;
