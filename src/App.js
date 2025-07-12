import { Routes, Route } from 'react-router-dom'; // ✅ Only import Routes & Route
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionDetail from './pages/QuestionDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
