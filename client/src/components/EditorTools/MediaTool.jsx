import React, { useState } from 'react';
import { Image, Film, Music, Type, Upload, Loader2, Link } from 'lucide-react';

export const MediaTool = ({ section, onUpdate }) => {
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [sourceMode, setSourceMode] = useState('upload'); // 'upload' or 'url'
    
  const handleModuleUpdate = (index, updates) => {
    const newModules = [...section.modules];
    newModules[index] = { ...newModules[index], ...updates };
    onUpdate({ modules: newModules });
  };

  const handleLocalFileUpload = async (index, event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    // Create a client-side temporary preview URL so the user sees their changes instantly
    const clientPreviewUrl = URL.createObjectURL(uploadedFile);
    handleModuleUpdate(index, { mediaUrl: clientPreviewUrl });
    
    setUploadingIndex(index);

    // Prepare Multipart form-data payload
    const dataPayload = new FormData();
    dataPayload.append('media', uploadedFile);

    try {
      const activeToken = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeToken}`
        },
        body: dataPayload // Browser sets content-type boundary automatically
      });

      const serverReply = await response.json();
      if (serverReply.success) {
        // Swap out the temporary client URL with the permanent Cloudinary cloud link
        handleModuleUpdate(index, { mediaUrl: serverReply.url });
      } else {
        alert(serverReply.message || "Cloud upload verification failed.");
      }
    } catch (err) {
      console.error("Upload network pipeline failed:", err);
      alert("Could not establish communication with asset server.");
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {section.modules?.map((module, i) => (
        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-[#FFB7C5] uppercase tracking-widest">
              Module {i + 1} Content Type
            </span>
            
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
              {/* Media Type Grid Buttons */}
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

              {/* Source Input Mode Switches */}
              <div className="flex gap-4 border-b border-white/5 pb-2">
                <button
                  type="button"
                  onClick={() => setSourceMode('upload')}
                  className={`text-[9px] font-black uppercase tracking-wider ${sourceMode === 'upload' ? 'text-[#FFB7C5]' : 'text-white/30'}`}
                >
                  Local Device File
                </button>
                <button
                  type="button"
                  onClick={() => setSourceMode('url')}
                  className={`text-[9px] font-black uppercase tracking-wider ${sourceMode === 'url' ? 'text-[#FFB7C5]' : 'text-white/30'}`}
                >
                  Online Web Address
                </button>
              </div>

              {/* Dynamic Input Switching Container */}
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-white/30 block">Source Content</label>
                
                {sourceMode === 'upload' ? (
                  <div className="relative group border border-dashed border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all flex flex-col items-center justify-center cursor-pointer min-h-[70px]">
                    {uploadingIndex === i ? (
                      <div className="flex items-center gap-2 text-xs text-[#FFB7C5]">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Uploading to Cloudinary CDN...</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={14} className="text-white/40 group-hover:text-[#FFB7C5] mb-1 transition-colors" />
                        <span className="text-[10px] text-white/60">
                          {module.mediaUrl ? '✓ File Linked (Click to Change)' : 'Browse local files...'}
                        </span>
                        <input
                          type="file"
                          accept={module.mediaType === 'video' ? 'video/*' : module.mediaType === 'audio' ? 'audio/*' : 'image/*'}
                          onChange={(e) => handleLocalFileUpload(i, e)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg p-2">
                    <Link size={12} className="text-white/30" />
                    <input
                      type="text"
                      value={module.mediaUrl || ''}
                      onChange={(e) => handleModuleUpdate(i, { mediaUrl: e.target.value })}
                      placeholder="Paste link from Unsplash, Imgur, etc..."
                      className="w-full bg-transparent text-xs text-white outline-none border-none p-0 focus:ring-0"
                    />
                  </div>
                )}
              </div>

              {/* Subtext Fields */}
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