// src/components/studio/image/ImageToolbox.jsx
import React from 'react';

const ImageToolbox = ({ 
  caption, setCaption, activeTab, setActiveTab, hasImage, isSubmitting, onShare,
  brightness, setBrightness, contrast, setContrast, blur, setBlur 
}) => {
  return (
    <div className="w-full lg:w-80 bg-[#0C0A17] border border-white/5 rounded-2xl p-5 shrink-0 flex flex-col justify-between gap-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">Write a caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a description or hashtags..."
            className="w-full h-16 p-2 bg-black/30 border border-white/10 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-4 border border-white/5 rounded-xl bg-black/20 p-1 text-center">
          {['filters', 'crop', 'doodle', 'text'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disabled={!hasImage}
              className={`text-[10px] font-bold py-1.5 rounded-lg capitalize border-none bg-transparent transition-all cursor-pointer ${
                activeTab === tab && hasImage ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-200 disabled:opacity-30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[160px] bg-black/20 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
          {activeTab === 'filters' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400"><span>Brightness</span><span className="text-purple-400">{brightness}%</span></div>
                <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400"><span>Contrast</span><span className="text-purple-400">{contrast}%</span></div>
                <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(e.target.value)} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400"><span>Soft Blur</span><span className="text-purple-400">{blur}px</span></div>
                <input type="range" min="0" max="10" value={blur} onChange={(e) => setBlur(e.target.value)} className="w-full accent-purple-500" />
              </div>
            </div>
          )}
          {activeTab === 'crop' && <div className="text-center text-xs text-gray-400">Crop Presets Active</div>}
          {activeTab === 'doodle' && <div className="text-center text-xs text-gray-400">Doodle Brushes Active</div>}
          {activeTab === 'text' && <div className="text-center text-xs text-gray-400">Text Overlays Active</div>}
        </div>
      </div>

      <button 
        onClick={onShare}
        disabled={!hasImage || isSubmitting}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm rounded-xl border-none cursor-pointer disabled:from-gray-800 disabled:to-gray-800"
      >
        {isSubmitting ? 'Sharing Post...' : 'Share Post'}
      </button>
    </div>
  );
};

export default ImageToolbox;