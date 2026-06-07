import { useState, useEffect } from 'react';
import { Search, History, X } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (term) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const removeSearch = (e, term) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
      saveSearch(username.trim());
      setShowRecent(false);
    }
  };

  const handleRecentClick = (term) => {
    setUsername(term);
    onSearch(term);
    saveSearch(term);
    setShowRecent(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-4 text-github-muted w-5 h-5" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
          placeholder="Search GitHub username..."
          className="w-full bg-github-dark border border-github-border rounded-lg py-3 pl-12 pr-24 text-github-text placeholder-github-muted focus:outline-none focus:border-github-blue focus:ring-1 focus:ring-github-blue transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="absolute right-2 bg-github-border hover:bg-github-blue hover:text-white text-github-text px-4 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-github-dark border border-github-border rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-2 bg-github-gray border-b border-github-border text-xs text-github-muted font-semibold uppercase tracking-wider">
            Recent Searches
          </div>
          <ul>
            {recentSearches.map((term, index) => (
              <li
                key={index}
                onClick={() => handleRecentClick(term)}
                className="px-4 py-3 hover:bg-github-gray cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center text-github-text group-hover:text-github-blue">
                  <History className="w-4 h-4 mr-3 text-github-muted group-hover:text-github-blue transition-colors" />
                  <span>{term}</span>
                </div>
                <button
                  onClick={(e) => removeSearch(e, term)}
                  className="text-github-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from history"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
