// src/components/studio/video/VideoToolbox.jsx
import React from 'react';

const VideoToolbox = ({ caption, setCaption, playbackRate, onSpeedChange, hasVideo, isSubmitting, onShare, rawFile }) => {
  return (
    <div className="w-full lg:w-80 bg-[#0C0A17] border border-white/5 rounded-2xl p-5 shrink-0 flex flex-col justify-between gap-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">Write a production description</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add video details or references..."
            className="w-full h-20 p-2.5 bg-black/30 border border-white/10 rounded-xl text-white text-xs resize-none focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Sequence Speed Rate</label>
          <div className="grid grid-cols-4 border border-white/5 rounded-xl bg-black/20 p-1 text-center">
            {[0.5, 1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                disabled={!hasVideo}
                className={`text-[10px] font-mono font-bold py-1.5 rounded-lg border-none bg-transparent cursor-pointer ${
                  playbackRate === speed && hasVideo ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {rawFile && (
          <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-[11px] font-mono text-gray-400 flex justify-between">
            <span className="text-gray-500">Payload Size:</span>
            <span className="text-purple-400">{(rawFile.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        )}
      </div>

      <button 
        onClick={onShare}
        disabled={!hasVideo || isSubmitting}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm rounded-xl border-none cursor-pointer disabled:from-gray-800 disabled:to-gray-800"
      >
        {isSubmitting ? 'Processing Sequence...' : 'Publish Video Stream'}
      </button>
    </div>
  );
};

export default VideoToolbox;