import { Users, UserPlus, BookOpen } from 'lucide-react';

const UserProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-github-gray rounded-xl border border-github-border p-6 shadow-sm flex flex-col md:flex-row gap-8 items-start mb-8 transition-all hover:border-github-muted/50">
      <div className="flex-shrink-0 mx-auto md:mx-0 relative group">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-github-dark object-cover shadow-md transition-transform group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex-grow w-full text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
          {profile.name || profile.login}
        </h1>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-github-muted hover:text-github-blue transition-colors mb-4 block"
        >
          @{profile.login}
        </a>

        {profile.bio && (
          <p className="text-github-text text-lg mb-6 max-w-2xl leading-relaxed">
            {profile.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-4 border-t border-github-border/50">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Users className="w-5 h-5 text-github-muted group-hover:text-github-blue transition-colors" />
            <div>
              <span className="font-bold text-white group-hover:text-github-blue transition-colors">{profile.followers}</span>
              <span className="text-github-muted ml-1 text-sm">followers</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <UserPlus className="w-5 h-5 text-github-muted group-hover:text-github-blue transition-colors" />
            <div>
              <span className="font-bold text-white group-hover:text-github-blue transition-colors">{profile.following}</span>
              <span className="text-github-muted ml-1 text-sm">following</span>
            </div>
          </div>

          <div className="flex items-center gap-2 group cursor-pointer">
            <BookOpen className="w-5 h-5 text-github-muted group-hover:text-github-blue transition-colors" />
            <div>
              <span className="font-bold text-white group-hover:text-github-blue transition-colors">{profile.public_repos}</span>
              <span className="text-github-muted ml-1 text-sm">repositories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
