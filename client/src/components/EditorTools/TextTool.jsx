import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Notice we now receive 'module' and 'onUpdate' (singular) 
// instead of the whole section and index
export const TextTool = ({ module, onUpdate }) => {
  const [openPicker, setOpenPicker] = useState(false);

  const sizes = [
    { label: 'S', value: 'text-sm' },
    { label: 'M', value: 'text-xl' },
    { label: 'L', value: 'text-4xl' },
    { label: 'XL', value: 'text-6xl' }
  ];

  const colors = [
    { name: 'Pink', hex: '#FFB7C5' },
    { name: 'Cyan', hex: '#22D3EE' },
    { name: 'Amber', hex: '#FBBF24' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Muted', hex: '#6B7280' }
  ];

  return (
    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center relative">
        {/* COLOR DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setOpenPicker(!openPicker)}
            className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            <div 
              className="w-3 h-3 rounded-full border border-white/20" 
              style={{ backgroundColor: module.color || '#FFFFFF' }}
            />
            <span className="text-[9px] font-bold text-white/60 uppercase tracking-tighter">Color</span>
            <ChevronDown size={10} className={`text-white/40 transition-transform ${openPicker ? 'rotate-180' : ''}`} />
          </button>

          {openPicker && (
            <div className="absolute left-0 mt-2 p-2 bg-[#1A1625] border border-white/10 rounded-xl shadow-2xl z-50 grid grid-cols-5 gap-2 min-w-[140px] animate-in fade-in slide-in-from-top-2">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    onUpdate({ color: c.hex });
                    setOpenPicker(false);
                  }}
                  className="w-5 h-5 rounded-full border border-white/10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* SIZE SELECTOR */}
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
          {sizes.map((s) => (
            <button
              key={s.value}
              onClick={() => onUpdate({ size: s.value })}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-[10px] transition-all ${
                module.size === s.value ? 'bg-[#FFB7C5] text-black font-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* TEXT AREA */}
      <textarea
        value={module.text}
        onChange={(e) => onUpdate({ text: e.target.value })}
        className={`w-full bg-transparent border-none text-white focus:ring-0 resize-none p-0 ${module.font} ${module.size || 'text-xl'}`}
        placeholder="Enter content..."
        rows={3}
      />

      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        {/* FONT SELECT */}
        <select
          value={module.font}
          onChange={(e) => onUpdate({ font: e.target.value })}
          className="bg-transparent text-[10px] text-white/60 border-none focus:ring-0 p-0 uppercase font-black"
        >
          <option value="font-sans">Sans Serif</option>
          <option value="font-serif">Classic Serif</option>
          <option value="font-mono">Tech Mono</option>
        </select>

        {/* ALIGNMENT */}
        <div className="flex gap-2">
          {['text-left', 'text-center', 'text-right'].map((align) => (
            <button
              key={align}
              onClick={() => onUpdate({ align })}
              className={`text-[9px] font-bold ${module.align === align ? 'text-[#FFB7C5]' : 'text-white/20'}`}
            >
              {align.split('-')[1].toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};