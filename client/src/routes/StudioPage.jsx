// src/routes/StudioPage.jsx
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StudioSidebar from '../components/studio/StudioSidebar';

const StudioPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === '/studio';

  return (
    <div className="w-screen h-screen flex flex-col bg-[#05040A] text-gray-100 overflow-hidden font-sans select-none">
      
      {/* 1. Studio Header Toolbar Dashboard Strip */}
      <header className="h-14 w-full bg-[#090712] border-b border-white/5 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer border-none bg-transparent flex items-center justify-center"
          >
            🏠
          </button>
          <div className="w-[1px] h-4 bg-white/10" />
          <span className="text-xs font-black tracking-widest font-mono uppercase bg-gradient-to-r from-purple-400 to-[#FFB7C5] bg-clip-text text-transparent">
            CREATIVE.TERMINAL
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-purple-400">
            v1.2.0-Alpha
          </span>
        </div>
      </header>

      {/* 2. Full-Bleed Split Workspace Layout Grid Panel */}
      <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Navigation Deck Sidebar */}
        <StudioSidebar />

        {/* Immersive Main Rendering Canvas Target Viewport */}
        <main className="flex-1 h-full bg-[#07050F] overflow-y-auto relative p-6">
          {isRoot ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-500/10 border border-purple-500/30 flex items-center justify-center text-3xl shadow-xl shadow-purple-900/40">
                🎛️
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-wide">Studio Deck Online</h2>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Select a customization node tool profile from the system control layout interface on the left deck panel to begin formatting visual rendering streams.
                </p>
              </div>
              <button 
                onClick={() => navigate('/studio/letter')}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/30 transition-all border-none cursor-pointer"
              >
                ⚡ Initialize Letter Canvas Engine
              </button>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

      </div>
    </div>
  );
};

export default StudioPage;