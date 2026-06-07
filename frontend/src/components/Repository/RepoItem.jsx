import { Star, Circle, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Map of common languages to colors
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

const RepoItem = ({ repo }) => {
  const langColor = languageColors[repo.language] || '#8b949e';

  return (
    <div className="bg-github-dark border border-github-border rounded-lg p-5 hover:border-github-muted transition-all hover:shadow-lg flex flex-col h-full group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-github-blue group-hover:underline truncate max-w-[85%]">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        <div className="flex items-center text-github-muted bg-github-gray px-2 py-1 rounded-full text-xs font-medium border border-github-border">
          <Star className="w-3.5 h-3.5 mr-1" />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>

      <p className="text-github-text text-sm flex-grow mb-4 line-clamp-2">
        {repo.description || <span className="italic text-github-muted">No description provided</span>}
      </p>

      <div className="flex items-center text-xs text-github-muted gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center">
            <Circle className="w-3 h-3 mr-1.5" fill={langColor} color={langColor} />
            <span>{repo.language}</span>
          </div>
        )}
        
        <div className="flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <span>Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
