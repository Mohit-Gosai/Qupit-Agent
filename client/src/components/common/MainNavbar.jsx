// src/components/common/MainNavbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CreateFAB from './CreateFAB';
import { HomeIcon, MessageCircleIcon, NotebookPen, User, SquareArrowRightExitIcon } from "lucide-react"

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, token } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleMobileAction = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;
  const userProfilePath = user?.username ? `/profile/${user.username}` : '/auth';

  return (
    <>
      {/* TOP DESKTOP HEADER PANEL */}
      <header className="sticky top-0 z-[100] w-full bg-[#0A0712]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 group decoration-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-[#FFB7C5] flex items-center justify-center font-black text-white text-sm shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            Q
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-white font-mono bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            QUPIT<span className="text-purple-500 font-sans">.</span>AGENT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {token && user && (
            <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-gray-300">@{user.username}</span>
            </div>
          )}
        </div>
      </header>

      {/* BOTTOM NAVIGATION TAB BAR WITH INTEGRATED FAB */}
      {token && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0C0916]/95 backdrop-blur-lg border-t border-purple-900/20 px-4 py-2 flex items-center justify-between z-[9999]" ref={menuRef}>

          {/* Left Action Elements */}
          <Link to="/home" className={`flex flex-col items-center gap-0.5 w-14 ${isActive('/home') ? 'text-[#FFB7C5]' : 'text-gray-500'}`}>
            <span className="text-lg"><HomeIcon color='pink'/></span>
            <span className="text-[9px] uppercase font-bold tracking-wider font-mono">Home</span>
          </Link>

          <Link to="/studio" className={`flex flex-col items-center gap-0.5 w-14 ${isActive('/studio') ? 'text-[#FFB7C5]' : 'text-gray-500'}`}>
            <span className="text-lg"><NotebookPen color='pink' /></span>
            <span className="text-[9px] uppercase font-bold tracking-wider font-mono">Studio</span>
          </Link>

          {/* ==========================================
              INTEGRATED CENTER FAB CONTROLLER
             ========================================== */}
          <CreateFAB />

          <Link to={userProfilePath} className={`flex flex-col items-center gap-0.5 w-14 ${location.pathname.startsWith('/profile') ? 'text-[#FFB7C5]' : 'text-gray-500'}`}>
            <span className="text-lg"><User color='pink' /></span>
            <span className="text-[9px] uppercase font-bold tracking-wider font-mono">Profile</span>
          </Link>

          <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 w-14 bg-transparent border-none text-red-400/70 cursor-pointer">
            <span className="text-lg"><SquareArrowRightExitIcon color='pink' /></span>
            <span className="text-[9px] uppercase font-bold tracking-wider font-mono">Exit</span>
          </button>

        </nav>
      )}
    </>
  );
};

export default MainNavbar;