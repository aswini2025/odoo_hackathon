import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Save token
        navigate('/'); // Redirect to homepage
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">Login to StackIt</h2>

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
          Log In
        </button>

        <p className="text-muted text-sm mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-secondary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
