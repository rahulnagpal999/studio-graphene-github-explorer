import { Star, GitFork, Calendar, Code2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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
    <div className="bg-[#111115]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-[#16161b]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 flex flex-col h-full group relative overflow-hidden">

      {/* Top language highlight */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: langColor }}
      />

      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">

        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate"
          >
            {repo.name}
          </a>
        </h3>

        <div className="flex items-center gap-2 flex-shrink-0">

          <span className="flex items-center text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Star
              className="w-3.5 h-3.5 mr-1.5 text-yellow-500"
              fill="currentColor"
            />
            {repo.stargazers_count}
          </span>

          {repo.forks_count > 0 && (
            <span className="flex items-center text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <GitFork className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
              {repo.forks_count}
            </span>
          )}

        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm flex-grow mb-6 line-clamp-2 leading-relaxed">
        {repo.description || (
          <span className="italic text-gray-600">
            No description provided
          </span>
        )}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">

        <div className="flex items-center gap-4 flex-wrap">

          {repo.language ? (
            <div className="flex items-center font-medium bg-white/5 px-2 py-1 rounded-md">
              <span
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: langColor }}
              />
              <span className="text-gray-300">
                {repo.language}
              </span>
            </div>
          ) : (
            <div className="flex items-center font-medium bg-white/5 px-2 py-1 rounded-md">
              <Code2 className="w-3 h-3 mr-2 text-gray-500" />
              <span>Unknown</span>
            </div>
          )}

          <div className="flex items-center font-medium">
            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            <span>
              {formatDistanceToNow(
                new Date(repo.updated_at),
                { addSuffix: true }
              )}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RepoItem;