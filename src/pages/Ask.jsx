import { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ask = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = {
      title,
      description: desc,
      tags: tags.split(',').map(t => t.trim()),
      author: 'madhu',
    };
    await axios.post('http://localhost:5000/api/questions', question);
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 rounded bg-card text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          value={desc}
          onChange={setDesc}
          className="bg-white text-black"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-3 rounded bg-card text-white"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" className="bg-primary text-black px-6 py-2 rounded">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default Ask;
