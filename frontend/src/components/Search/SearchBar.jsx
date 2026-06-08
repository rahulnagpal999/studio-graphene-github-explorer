import { useState, useEffect } from 'react';
import { Search, History, X, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading, onFocusChange }) => {
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

    const updated = [
      term,
      ...recentSearches.filter((s) => s !== term),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const removeSearch = (e, term) => {
    e.stopPropagation();

    const updated = recentSearches.filter((s) => s !== term);

    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim()) {
      onSearch(username.trim());
      saveSearch(username.trim());
      setShowRecent(false);
      onFocusChange?.(false);
    }
  };

  const handleRecentClick = (term) => {
    setUsername(term);
    onSearch(term);
    saveSearch(term);
    setShowRecent(false);
    onFocusChange?.(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto z-40">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search
            className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${showRecent || username
                ? 'text-blue-400'
                : 'text-gray-500'
              }`}
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => {
              setShowRecent(true);
              onFocusChange?.(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowRecent(false);
                onFocusChange?.(false);
              }, 200);
            }}
            placeholder="Search GitHub username..."
            disabled={isLoading}
            className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-lg shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl disabled:opacity-50 transition-all duration-300 font-medium flex items-center justify-center min-w-[140px] w-full sm:w-auto shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="absolute top-full mt-3 w-full bg-[#111115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-gray-500 font-semibold uppercase tracking-widest flex items-center">
            <History className="w-3.5 h-3.5 mr-2" />
            Recent Searches
          </div>

          <ul className="py-2">
            {recentSearches.map((term, index) => (
              <li
                key={index}
                onMouseDown={() => handleRecentClick(term)}
                className="px-5 py-3 hover:bg-white/[0.04] cursor-pointer flex items-center justify-between group transition-colors duration-200"
              >
                <span className="text-gray-300 group-hover:text-white">
                  {term}
                </span>

                <button
                  onMouseDown={(e) => removeSearch(e, term)}
                  className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
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