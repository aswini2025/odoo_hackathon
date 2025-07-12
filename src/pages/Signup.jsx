import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        alert('Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSignup}
        className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">Create Your StackIt Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 rounded bg-card text-white border border-muted mb-4"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-card text-white border border-muted mb-4"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-card text-white border border-muted mb-6"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-black py-2 rounded hover:bg-cyan-300 transition"
        >
          Sign Up
        </button>

        <p className="text-muted text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
