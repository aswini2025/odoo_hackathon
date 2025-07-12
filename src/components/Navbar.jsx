import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-card shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-primary text-2xl font-bold tracking-wide hover:text-cyan-300">
        StackIt 💬
      </Link>
      <div className="space-x-6">
        <Link to="/ask" className="text-text hover:text-secondary">Ask</Link>
        <Link to="/login" className="text-text hover:text-secondary">Login</Link>
        <Link to="/signup" className="bg-primary text-black px-4 py-1 rounded hover:bg-cyan-300">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
