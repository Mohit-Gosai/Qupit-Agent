// src/components/common/LeftSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Local states to track link label and path
  const [profileLabel, setProfileLabel] = useState('Profile is loading...');
  const [profilePath, setProfilePath] = useState('#');
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const hasToken = localStorage.getItem('token');

    if (!hasToken) {
      // Case 1: Genuinely not logged in
      setProfileLabel('My Profile');
      setProfilePath('/auth');
      setIsProfileLoading(false);
    } else if (user?.username) {
      // Case 2: Token exists and user data has successfully arrived!
      setProfileLabel('My Profile');
      setProfilePath(`/profile/${user.username}`);
      setIsProfileLoading(false);
    } else {
      // Case 3: Token exists, but backend request is still in-flight
      setProfileLabel('Profile is loading...');
      setProfilePath('#');
      setIsProfileLoading(true);
    }
  }, [user]); // Fires instantly whenever the global user context state changes

  const handleLogout = () => {
    logout(); 
    navigate('/auth');
  };

  return (
    <aside className="hidden md:block md:col-span-1 space-y-4">
      <nav className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 sticky top-24">
        
        {/* Home Feed */}
        <Link 
          to="/home" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium transition-all group"
        >
          <span className="text-[#FFB7C5] transition-transform group-hover:scale-110">🏠</span>
          <span>Home Feed</span>
        </Link>

        {/* Create Letter */}
        <Link 
          to="/studio" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFB7C5]/10 border border-[#FFB7C5]/20 hover:bg-[#FFB7C5]/20 text-sm font-bold text-[#FFB7C5] transition-all group"
        >
          <span className="transition-transform group-hover:rotate-12">✨</span>
          <span>Create Letter</span>
        </Link>
        <Link 
          to="/messages" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFB7C5]/10 border border-[#FFB7C5]/20 hover:bg-[#FFB7C5]/20 text-sm font-bold text-[#FFB7C5] transition-all group"
        >
          <span className="transition-transform group-hover:rotate-12">✨</span>
          <span>Chats</span>
        </Link>

        {/* Dynamic My Profile Link */}
        <Link 
          to={profilePath} 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium transition-all group ${
            isProfileLoading ? 'opacity-50 pointer-events-none animate-pulse font-mono text-xs' : ''
          }`}
        >
          <span className="text-[#FFB7C5] transition-transform group-hover:scale-110">👤</span>
          <span>{profileLabel}</span>
        </Link>

        {/* Sign Out */}
        <button 
          onClick={handleLogout}
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm font-medium text-red-400 transition-all group border-none bg-transparent text-left cursor-pointer w-full"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>

      </nav>
    </aside>
  );
};

export default LeftSidebar;