import { Link } from 'react-router-dom';

const QuestionCard = ({ title, tags, author, id }) => {
  return (
    <Link to={`/questions/${id}`}>
      <div className="bg-card p-4 rounded-xl mb-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-150 cursor-pointer">
        <h2 className="text-xl font-semibold text-primary hover:underline">{title}</h2>
        <div className="text-muted text-sm mb-2">Asked by @{author}</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
