import React from 'react';
import { Image, Film, Music } from 'lucide-react';

export const MediaTool = ({ module, onUpdate }) => {
  // Note: we now receive 'module' directly, no more .map() inside here!
  
  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Media Type Selector */}
      <div className="grid grid-cols-3 gap-1">
        {[
          { type: 'image', icon: <Image size={12} />, label: 'Photo' },
          { type: 'video', icon: <Film size={12} />, label: 'Video' },
          { type: 'audio', icon: <Music size={12} />, label: 'Audio' }
        ].map((m) => (
          <button
            key={m.type}
            onClick={() => onUpdate({ mediaType: m.type, mediaUrl: '' })}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
              (module.mediaType || 'image') === m.type ? 'bg-[#FFB7C5]/10 text-[#FFB7C5] border border-[#FFB7C5]/30' : 'bg-white/5 text-white/30 border border-transparent hover:bg-white/10'
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* URL Input */}
      <div className="space-y-1">
        <label className="text-[8px] font-black uppercase text-white/30">Source URL</label>
        <input
          type="text"
          value={module.mediaUrl || ''}
          onChange={(e) => onUpdate({ mediaUrl: e.target.value })}
          className="w-full bg-black/20 border border-white/5 rounded-lg p-2 text-xs text-white outline-none focus:border-[#FFB7C5]/50"
          placeholder="Paste link here..."
        />
      </div>
      
      {/* Subtext Input */}
      <div className="space-y-1">
        <label className="text-[8px] font-black uppercase text-white/30">Overlay Caption</label>
        <input
          type="text"
          value={module.mediaCaption || ''}
          onChange={(e) => onUpdate({ mediaCaption: e.target.value })}
          className="w-full bg-black/20 border border-white/5 rounded-lg p-2 text-xs text-white outline-none focus:border-[#FFB7C5]/50"
          placeholder="Add a sweet note..."
        />
      </div>
    </div>
  );
};