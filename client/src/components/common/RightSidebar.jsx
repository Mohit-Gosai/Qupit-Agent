// src/components/common/RightSidebar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RightSidebar = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSuggestedCreators = async () => {
      try {
        // Fetching existing users from your user/chat engine pipeline[cite: 2]
        const res = await axios.get('/api/users'); 
        // Exclude the logged-in user from suggestions and limit to 4 users
        const filtered = res.data.filter(user => user._id !== currentUserId).slice(0, 4);
        setCreators(filtered);
      } catch (err) {
        console.error("Error loading suggested creators:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedCreators();
  }, [currentUserId]);

  const handleStartChat = (user) => {
    // Navigate to the chat system and inject the user context into the location state channel[cite: 1]
    navigate('/messages', { 
      state: { startChatWith: { _id: user._id, username: user.username } } 
    });
  };

  const handleFollow = (username, e) => {
    e.stopPropagation(); // Prevents triggering the chat click
    alert(`Following @${username} (Endpoint connection pending followSchema binding)`);
  };

  return (
    <aside className="hidden md:block md:col-span-1">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 sticky top-24">
        <h3 className="text-xs uppercase font-black tracking-widest text-[#FFB7C5]">Suggested Creators</h3>
        
        {loading ? (
          <p className="text-[10px] font-mono text-white/40 animate-pulse">Loading nodes...</p>
        ) : creators.length === 0 ? (
          <p className="text-[10px] font-mono text-white/40">No new creators found.</p>
        ) : (
          <div className="space-y-4">
            {creators.map((user) => (
              <div 
                key={user._id} 
                onClick={() => handleStartChat(user)}
                className="flex items-center justify-between text-xs p-1.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                title={`Chat with @${user.username}`}
              >
                <div className="flex items-center gap-2 max-w-[65%]">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-[#FFB7C5] text-[10px] uppercase shrink-0">
                    {user.username?.substring(0, 2)}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-white group-hover:text-[#FFB7C5] transition-colors truncate">
                      @{user.username}
                    </p>
                    <p className="text-white/40 text-[9px] truncate">Available to chat</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleFollow(user.username, e)}
                    className="text-[#FFB7C5] font-bold text-[10px] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;