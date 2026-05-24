// src/components/ArchitectPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { VisualCanvas } from './VisualCanvas';

export const ArchitectPreview = ({ config }) => {
  return (
    <div className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {config.sections?.map((section) => (

        <section className={`h-screen w-full relative overflow-hidden flex items-center justify-center ${section.background}`}>
          {section.canvas?.hasObject && <VisualCanvas section={section} />}


          {/* Inside ArchitectPreview.jsx grid iteration */}
          <div className={`w-full h-full p-10 z-10 grid gap-6 ${section.modules?.length === 2 ? 'grid-cols-2' :
              section.modules?.length === 3 ? 'grid-cols-3' : 'grid-cols-1'
            }`}>
            {section.modules?.map((module, i) => (
              <motion.div
                key={i}
                layout
                className={`relative flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 backdrop-blur-sm bg-black/10 overflow-hidden`}
              >
                {module.contentType === 'media' ? (
                  // --- MEDIA PRESENTATION MODULE ---
                  <div className="w-full h-full flex flex-col justify-center items-center relative">

                    {/* 1. PHOTO */}
                    {module.mediaType === 'image' && module.mediaUrl && (
                      <img
                        src={module.mediaUrl}
                        alt={module.mediaCaption || 'Scene Visual'}
                        className="w-full h-full object-cover rounded-2xl absolute inset-0 transition-transform duration-700 hover:scale-105"
                      />
                    )}

                    {/* 2. VIDEO */}
                    {module.mediaType === 'video' && module.mediaUrl && (
                      <video
                        src={module.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-2xl absolute inset-0"
                      />
                    )}

                    {/* 3. AUDIO */}
                    {module.mediaType === 'audio' && module.mediaUrl && (
                      <div className="z-10 p-4 bg-black/80 rounded-2xl border border-white/10 flex flex-col items-center gap-3 w-4/5 text-center">
                        <span className="animate-bounce">🎵</span>
                        <p className="text-[10px] text-[#FFB7C5] tracking-widest font-black uppercase">SYSTEM SOUNDTRACK ACTIVE</p>
                        <audio
                          src={module.mediaUrl}
                          controls
                          className="w-full h-8 accent-[#FFB7C5]"
                        />
                      </div>
                    )}

                    {/* Fallback layout for empty media blocks */}
                    {!module.mediaUrl && (
                      <div className="flex flex-col items-center text-white/20 gap-2">
                        <span className="text-2xl animate-pulse">📷</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest">Awaiting Media URL...</span>
                      </div>
                    )}

                    {/* Media Caption Overlay */}
                    {module.mediaCaption && module.mediaUrl && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 z-20">
                        <p className="text-white text-xs text-center font-sans tracking-wide">
                          {module.mediaCaption}
                        </p>
                      </div>
                    )}

                  </div>
                ) : (
                  // --- STANDARD TEXT PRESENTATION MODULE ---
                  <div className={`flex flex-col justify-center h-full w-full ${module.align || 'text-center'}`}>
                    <p
                      className={`${module.font || 'font-sans'} ${module.size || 'text-xl'} leading-tight`}
                      style={{ color: module.color || '#FFFFFF' }}
                    >
                      {module.text}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};