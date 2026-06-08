import { Users, UserPlus, BookOpen, ExternalLink, MapPin, Link as LinkIcon, Building2 } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-xl ${colorClass} bg-opacity-10 backdrop-blur-sm`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-gray-400 font-medium text-sm">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white tracking-tight ml-1">{value}</div>
  </div>
);

const UserProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="relative bg-[#111115]/80 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden mb-10 group">
      {/* Decorative gradient orb */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-shrink-0 mx-auto lg:mx-0 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          <img
            src={profile.avatar_url}
            alt={`${profile.login}'s avatar`}
            className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-52 lg:h-52 rounded-full border-4 border-[#161b22] object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex-grow w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                {profile.name || profile.login}
              </h1>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center"
              >
                @{profile.login}
              </a>
            </div>

            <div className="flex justify-center">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
              </a>
            </div>
          </div>

          {profile.bio && (
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 mb-8">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light text-center lg:text-left">
                {profile.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm text-gray-400">
            {profile.company && (
              <div className="flex items-center justify-center lg:justify-start gap-2"><Building2 className="w-4 h-4" /> {profile.company}</div>
            )}
            {profile.location && (
              <div className="flex items-center justify-center lg:justify-start gap-2"><MapPin className="w-4 h-4" /> {profile.location}</div>
            )}
            {profile.blog && (
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <LinkIcon className="w-4 h-4 flex-shrink-0" />
                <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors truncate max-w-[200px] sm:max-w-[250px]">{profile.blog}</a>
              </div>
            )}
            {profile.twitter_username && (
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span>𝕏</span>
                @{profile.twitter_username}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <StatCard icon={Users} label="Followers" value={profile.followers} colorClass="bg-blue-500" />
            <StatCard icon={UserPlus} label="Following" value={profile.following} colorClass="bg-purple-500" />
            <StatCard icon={BookOpen} label="Repositories" value={profile.public_repos} colorClass="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
