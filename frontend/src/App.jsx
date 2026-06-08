import { useState } from 'react';
import { AlertCircle, Search as SearchIcon } from 'lucide-react';
import SearchBar from './components/Search/SearchBar';
import UserProfile from './components/Profile/UserProfile';
import RepoList from './components/Repository/RepoList';
import LanguageChart from './components/Charts/LanguageChart';
import { fetchUserData } from './services/api';

const POPULAR_SEARCHES = [
  'torvalds',
  'gaearon',
  'vercel',
  'facebook',
  'microsoft',
  'sindresorhus',
];

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data.data);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopularSearch = (username) => {
    handleSearch(username);
  };

  return (
    <div className="min-h-screen font-sans p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 rounded-[100%] blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            GitHub Explorer
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover developers, explore their repositories, and analyze their
            most used languages instantly.
          </p>
        </header>

        {/* Search */}
        <div className="mb-16">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            onFocusChange={setShowSearchOverlay}
          />
        </div>

        {/* Empty State */}
        {!userData &&
          !isLoading &&
          !error &&
          !showSearchOverlay && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                <SearchIcon className="w-10 h-10 text-gray-500" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Explore GitHub
              </h3>

              <p className="text-gray-400 text-center max-w-md mb-10">
                Search any GitHub developer to explore repositories and language
                insights.
              </p>

              <div className="w-full max-w-2xl">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">
                  Popular Searches
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearch(term)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Loading */}
        {isLoading && (
          <div className="animate-pulse space-y-10">
            <div className="bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8 min-h-[300px]">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
                <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-white/10 flex-shrink-0"></div>

                <div className="flex-grow space-y-4 pt-2 sm:pt-4 w-full">
                  <div className="h-10 bg-white/10 rounded w-1/3"></div>
                  <div className="h-6 bg-white/10 rounded w-1/4"></div>
                  <div className="h-20 bg-white/10 rounded w-full mt-6"></div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <div className="h-24 bg-white/10 rounded-2xl flex-1"></div>
                    <div className="h-24 bg-white/10 rounded-2xl flex-1"></div>
                    <div className="h-24 bg-white/10 rounded-2xl flex-1"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl border border-white/10 h-48"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center max-w-2xl mx-auto mb-12 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h3>

            <p className="text-red-200/80 mb-6">{error}</p>

            <button
              onClick={() => setError(null)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {userData && !isLoading && !error && (
          <main>
            <UserProfile profile={userData.profile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <RepoList repos={userData.repositories} />
              </div>

              <div className="lg:col-span-1 static lg:sticky lg:top-8">
                <LanguageChart repos={userData.repositories} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;