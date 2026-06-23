// src/components/studio/video/VideoPreviewBox.jsx
import React from 'react';

const VideoPreviewBox = ({ videoPreview, videoRef, getRootProps, getInputProps, isDragActive, isPlaying, isMuted, togglePlay, toggleMute, onClear }) => {
  if (!videoPreview) {
    return (
      <div 
        {...getRootProps()} 
        className={`w-full h-full max-w-md border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all ${
          isDragActive ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/30'
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-3xl mb-2">🎬</span>
        <p className="text-sm font-bold text-gray-200">Click or drag a video file here to upload</p>
        <p className="text-xs text-gray-500 mt-1">Supports MP4, WebM, and MOV</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl bg-black">
      <video
        ref={videoRef}
        src={videoPreview}
        className="w-full max-h-[55vh] object-contain"
        loop
        muted={isMuted}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-4 border border-white/10">
        <button onClick={togglePlay} className="text-white bg-transparent border-none cursor-pointer text-sm font-bold hover:text-purple-400">
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <span className="w-[1px] h-4 bg-white/20" />
        <button onClick={toggleMute} className="text-white bg-transparent border-none cursor-pointer text-sm font-bold hover:text-purple-400">
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      </div>
      <button 
        onClick={onClear}
        className="absolute top-3 right-3 w-7 h-7 bg-black/80 hover:bg-red-600 text-white border border-white/10 rounded-full flex items-center justify-center text-xs cursor-pointer border-none"
      >
        ✕
      </button>
    </div>
  );
};

export default VideoPreviewBox;