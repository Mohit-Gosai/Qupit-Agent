// src/components/common/CreateFAB.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreateFAB = () => {
  const { token, user } = useAuth(); // ◄ Extract active authenticated user state
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!token) return null;

  const activeUsername = user?.username || 'matrix';

  const handleAction = (routePath) => {
    setIsOpen(false);
    navigate(routePath);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans" ref={menuRef}>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-56 bg-[#161224] border border-purple-900/40 rounded-2xl p-2 shadow-2xl shadow-black/80 space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-black tracking-wider text-purple-400 border-b border-white/5 mb-1">
            Core Node Broadcaster
          </div>
          
          <button 
            onClick={() => handleAction(`/profile/${activeUsername}`)} // ◄ Dynamic Profile Route
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-gray-200 hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer"
          >
            <span className="text-sm">📝</span>
            <div>
              <p className="font-bold">Write Text Post</p>
              <p className="text-[10px] text-gray-500">Publish a text loop to profile</p>
            </div>
          </button>

          <button 
            onClick={() => handleAction(`/profile/${activeUsername}`)} // ◄ Dynamic Profile Route
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-gray-200 hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer"
          >
            <span className="text-sm">🖼️</span>
            <div>
              <p className="font-bold">Post Image / Video</p>
              <p className="text-[10px] text-gray-500">Upload mixed visual media</p>
            </div>
          </button>

          <button 
            onClick={() => handleAction('/studio')} 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-amber-300 hover:bg-amber-500/5 transition-colors bg-transparent border-none cursor-pointer"
          >
            <span className="text-sm">✨</span>
            <div>
              <p className="font-bold text-[#FFB7C5]">Make Letter</p>
              <p className="text-[10px] text-purple-400/60">Launch canvas engine builder</p>
            </div>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-900/40 border transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 ${
          isOpen ? 'rotate-45 border-pink-500 scale-95' : 'border-purple-500/30 hover:scale-105'
        }`}
      >
        ➕
      </button>

    </div>
  );
};

export default CreateFAB;