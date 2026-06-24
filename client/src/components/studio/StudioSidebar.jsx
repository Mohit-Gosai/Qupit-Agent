// src/components/studio/StudioSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoveLeft, LetterText, Mountain, Video, StarPlus, PanelRightIcon } from "lucide-react"

const StudioSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'letter', label: 'Make Letter', path: '/studio/letter', icon: <LetterText color='pink' /> },
    { id: 'image', label: 'Image Canvas', path: '/studio/image', icon: <Mountain color='pink' /> },
    { id: 'video', label: 'Video Sequencer', path: '/studio/video', icon: <Video color='pink' /> },
    { id: 'post', label: 'General Post', path: '/studio/post', icon: <StarPlus color='pink' /> },
    { id: 'stories', label: 'Stories Node', path: '/studio/stories', isDraft: true, icon: <PanelRightIcon color='pink'/> },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0F0C1B] border-b md:border-b-0 md:border-r border-purple-900/20 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 select-none">
      <div className="hidden md:block px-3 py-2 border-b border-white/5 mb-2">
        <h3 className="text-[10px] uppercase tracking-widest font-black text-purple-400 font-mono">Engine Control Panel</h3>
      </div>
      
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer whitespace-nowrap w-full text-left ${
              isActive 
                ? 'bg-gradient-to-r from-purple-600/30 to-pink-500/10 text-[#FFB7C5] border border-purple-500/40 shadow-inner' 
                : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
              </span>
            {item.isDraft && (
              <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded uppercase font-mono font-black ml-2 tracking-wider">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};

export default StudioSidebar;