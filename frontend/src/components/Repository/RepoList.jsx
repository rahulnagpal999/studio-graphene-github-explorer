import { useState, useMemo } from 'react';
import { ArrowDownWideNarrow } from 'lucide-react';
import RepoItem from './RepoItem';

const RepoList = ({ repos }) => {
  const [sortBy, setSortBy] = useState('updated');

  const sortedRepos = useMemo(() => {
    if (!repos) return [];
    return [...repos].sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: updated date
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  }, [repos, sortBy]);

  if (!repos || repos.length === 0) {
    return (
      <div className="text-center p-8 bg-github-gray rounded-xl border border-github-border mt-8">
        <p className="text-github-muted">No public repositories found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
          Repositories <span className="bg-github-border text-xs px-2 py-1 rounded-full ml-2 text-github-text">{repos.length}</span>
        </h2>
        
        <div className="flex items-center space-x-2 bg-github-dark border border-github-border p-1.5 rounded-lg">
          <ArrowDownWideNarrow className="w-4 h-4 text-github-muted ml-2" />
          <span className="text-sm text-github-muted font-medium px-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer py-1 pr-2 appearance-none"
          >
            <option value="updated" className="bg-github-dark text-white">Recently Updated</option>
            <option value="stars" className="bg-github-dark text-white">Most Stars</option>
            <option value="name" className="bg-github-dark text-white">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRepos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
