import { useState } from 'react';

import SearchBar from './components/Search/SearchBar';
import UserProfile from './components/Profile/UserProfile';
import RepoList from './components/Repository/RepoList';
import LanguageChart from './components/Charts/LanguageChart';
import { fetchUserData } from './services/api';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-github-dark text-github-text font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-12 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              GitHub Explorer
            </h1>
          </div>
          <p className="text-github-muted text-center max-w-xl">
            Discover developers, explore their repositories, and analyze their most used languages instantly.
          </p>
        </header>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-github-border border-t-github-blue rounded-full animate-spin"></div>
            <p className="text-github-muted font-medium animate-pulse">Fetching from GitHub...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto mb-8 shadow-sm">
            <p className="font-semibold text-lg">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Main Content */}
        {userData && !isLoading && !error && (
          <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserProfile profile={userData.profile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RepoList repos={userData.repositories} />
              </div>
              <div className="lg:col-span-1">
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
