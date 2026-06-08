import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
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
      <div className="text-center p-12 bg-white/[0.02] rounded-3xl border border-white/5 mt-8 backdrop-blur-sm">
        <p className="text-gray-400 font-medium text-lg">No public repositories found.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Repositories 
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-lg font-bold">
            {repos.length}
          </span>
        </h2>
        
        <div className="w-full sm:w-auto flex items-center bg-[#111115] border border-white/10 p-1 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
          <div className="pl-3 pr-2 flex items-center text-gray-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto bg-transparent text-gray-300 text-sm font-medium focus:outline-none cursor-pointer py-2 pr-4 pl-1 appearance-none outline-none"
          >
            <option value="updated" className="bg-[#111115] text-gray-300">Recently Updated</option>
            <option value="stars" className="bg-[#111115] text-gray-300">Most Stars</option>
            <option value="name" className="bg-[#111115] text-gray-300">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedRepos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
