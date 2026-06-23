// src/components/studio/VideoSequence.jsx
import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { submitNewPost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import VideoPreviewBox from './video/VideoPreviewBox';
import VideoToolbox from './video/VideoToolbox';

const VideoSequencer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [rawFile, setRawFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'video/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setRawFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setIsPlaying(false);
    }
  });

  const handleShareVideoPost = async () => {
    if (!rawFile || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitNewPost({ contentType: 'video', caption, file: rawFile });
      navigate('/home');
    } catch (error) {
      alert("Failed to finalize video processing pipeline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-fadeIn pb-12">
      <div className="flex-1 min-h-[350px] bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <VideoPreviewBox 
          videoPreview={videoPreview} videoRef={videoRef} getRootProps={getRootProps} getInputProps={getInputProps}
          isDragActive={isDragActive} isPlaying={isPlaying} isMuted={isMuted} togglePlay={togglePlay}
          toggleMute={() => { setIsMuted(!isMuted); if (videoRef.current) videoRef.current.muted = !isMuted; }}
          onClear={() => { setRawFile(null); setVideoPreview(null); setIsPlaying(false); }}
        />
      </div>
      <VideoToolbox 
        caption={caption} setCaption={setCaption} playbackRate={playbackRate} rawFile={rawFile}
        onSpeedChange={(speed) => { setPlaybackRate(speed); if (videoRef.current) videoRef.current.playbackRate = speed; }}
        hasVideo={!!videoPreview} isSubmitting={isSubmitting} onShare={handleShareVideoPost}
      />
    </div>
  );
};

export default VideoSequencer;