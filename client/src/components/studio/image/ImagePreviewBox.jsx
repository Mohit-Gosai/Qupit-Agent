// src/components/studio/image/ImagePreviewBox.jsx
import React from 'react';

const ImagePreviewBox = ({ imagePreview, getRootProps, getInputProps, isDragActive, brightness, contrast, blur, onClear }) => {
  if (!imagePreview) {
    return (
      <div 
        {...getRootProps()} 
        className={`w-full h-full max-w-md border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all ${
          isDragActive ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/30'
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-3xl mb-2">🖼️</span>
        <p className="text-sm font-bold text-gray-200">Click or drag an image here to upload</p>
        <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, and WebP</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-full max-h-[60vh] rounded-xl overflow-hidden shadow-2xl">
      <img 
        src={imagePreview} 
        alt="Preview" 
        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px)` }}
        className="max-w-full max-h-[55vh] object-contain transition-all duration-75 ease-out"
      />
      <button 
        onClick={onClear}
        className="absolute top-3 right-3 w-7 h-7 bg-black/80 hover:bg-red-600 text-white border border-white/10 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors border-none"
      >
        ✕
      </button>
    </div>
  );
};

export default ImagePreviewBox;