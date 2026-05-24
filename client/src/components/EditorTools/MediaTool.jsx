import React from 'react';
import { Image, Film, Music, Type } from 'lucide-react';

export const MediaTool = ({ section, onUpdate }) => {
  const handleModuleUpdate = (index, updates) => {
    const newModules = [...section.modules];
    newModules[index] = { ...newModules[index], ...updates };
    onUpdate({ modules: newModules });
  };

  return (
    <div className="space-y-6">
      {section.modules?.map((module, i) => (
        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-[#FFB7C5] uppercase tracking-widest">
              Module {i + 1} Content Type
            </span>
            
            {/* Toggle Content Type */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => handleModuleUpdate(i, { contentType: 'text' })}
                className={`px-2 py-1 rounded flex items-center gap-1 text-[9px] font-bold uppercase transition-all ${
                  module.contentType !== 'media' ? 'bg-[#FFB7C5] text-black' : 'text-white/40'
                }`}
              >
                <Type size={10} /> Text
              </button>
              <button
                onClick={() => handleModuleUpdate(i, { contentType: 'media' })}
                className={`px-2 py-1 rounded flex items-center gap-1 text-[9px] font-bold uppercase transition-all ${
                  module.contentType === 'media' ? 'bg-[#FFB7C5] text-black' : 'text-white/40'
                }`}
              >
                <Image size={10} /> Media
              </button>
            </div>
          </div>

          {module.contentType === 'media' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Media Type Selector */}
              <div>
                <label className="text-[8px] font-black uppercase text-white/30 block mb-2">Media Type</label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { type: 'image', icon: <Image size={12} />, label: 'Photo' },
                    { type: 'video', icon: <Film size={12} />, label: 'Video' },
                    { type: 'audio', icon: <Music size={12} />, label: 'Audio' }
                  ].map((m) => (
                    <button
                      key={m.type}
                      onClick={() => handleModuleUpdate(i, { mediaType: m.type, mediaUrl: '' })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        (module.mediaType || 'image') === m.type ? 'bg-white/10 text-[#FFB7C5] border border-[#FFB7C5]/30' : 'bg-white/5 text-white/30 border border-transparent'
                      }`}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Input */}
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-white/30 block">Source URL</label>
                <input
                  type="text"
                  value={module.mediaUrl || ''}
                  onChange={(e) => handleModuleUpdate(i, { mediaUrl: e.target.value })}
                  placeholder={
                    module.mediaType === 'audio' ? 'e.g., MP3 link, Soundcloud track link' :
                    module.mediaType === 'video' ? 'e.g., MP4 link, YouTube/Vimeo raw embed' : 'e.g., Unsplash/Imgur image link'
                  }
                  className="w-full bg-white/5 border border-white/5 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-[#FFB7C5] outline-none"
                />
              </div>

              {/* Caption/Subtitle Field */}
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-white/30 block">Overlay Subtext (Optional)</label>
                <input
                  type="text"
                  value={module.mediaCaption || ''}
                  onChange={(e) => handleModuleUpdate(i, { mediaCaption: e.target.value })}
                  placeholder="A romantic note, description, or subtitle..."
                  className="w-full bg-white/5 border border-white/5 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-[#FFB7C5] outline-none"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};