// src/components/studio/LetterBuilder.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LetterBuilder = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#120E21');
  const [fontStyle, setFontStyle] = useState('font-sans');

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Letter Customization Canvas</h2>
          <p className="text-xs text-gray-400 font-mono">Engine Hub v1.0.2</p>
        </div>
        <button onClick={() => navigate('/studio')} className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 transition-colors cursor-pointer border-none">
          Back to Dashboard
        </button>
      </div>

      {/* Real-time Visual Rendering Box */}
      <div 
        style={{ backgroundColor: bgColor }}
        className={`w-full min-h-[240px] rounded-2xl p-6 border border-white/10 flex items-center justify-center text-center shadow-2xl transition-all duration-300 ${fontStyle}`}
      >
        <p className="text-lg font-bold text-white whitespace-pre-wrap">
          {text || "Start typing in the control panel below to generate matrix vectors..."}
        </p>
      </div>

      {/* Control Configuration Board */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-black tracking-wider text-purple-400 font-mono">Broadcast Context Loop</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write the text of your specialized letter present node..."
            className="w-full h-20 p-3 bg-black/40 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black tracking-wider text-purple-400 font-mono">Core Canvas Deck Color</label>
            <select 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full p-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none"
            >
              <option value="#120E21">Deep Space Void</option>
              <option value="#2D1227">Crimson Nebula</option>
              <option value="#0B1C1E">Cyber Moss</option>
              <option value="#1A1A1A">Carbon Slate</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black tracking-wider text-purple-400 font-mono">Typography Metric</label>
            <select 
              value={fontStyle} 
              onChange={(e) => setFontStyle(e.target.value)}
              className="w-full p-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none"
            >
              <option value="font-sans">Standard Clean Pro</option>
              <option value="font-mono text-emerald-400 tracking-tight">System Terminal Mono</option>
              <option value="font-serif italic text-[#FFB7C5]">Classic Letter Elegance</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterBuilder;