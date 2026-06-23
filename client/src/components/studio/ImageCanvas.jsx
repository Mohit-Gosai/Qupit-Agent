// src/components/studio/ImageCanvas.jsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { submitNewPost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import ImagePreviewBox from './image/ImagePreviewBox';
import ImageToolbox from './image/ImageToolBox';

const ImageCanvas = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [rawFile, setRawFile] = useState(null); 
  const [caption, setCaption] = useState('');
  const [activeTab, setActiveTab] = useState('filters'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setRawFile(file); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  });

  const handleShareImagePost = async () => {
    if (!rawFile) return;
    setIsSubmitting(true);
    try {
      await submitNewPost({ contentType: 'image', caption, file: rawFile });
      navigate('/home');
    } catch (error) {
      alert("Error uploading image to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-fadeIn pb-12">
      <div className="flex-1 min-h-[350px] bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <ImagePreviewBox 
          imagePreview={imagePreview} getRootProps={getRootProps} getInputProps={getInputProps}
          isDragActive={isDragActive} brightness={brightness} contrast={contrast} blur={blur}
          onClear={() => { setImagePreview(null); setRawFile(null); }}
        />
      </div>
      <ImageToolbox 
        caption={caption} setCaption={setCaption} activeTab={activeTab} setActiveTab={setActiveTab}
        hasImage={!!imagePreview} isSubmitting={isSubmitting} onShare={handleShareImagePost}
        brightness={brightness} setBrightness={setBrightness} contrast={contrast} setContrast={setContrast} blur={blur} setBlur={setBlur}
      />
    </div>
  );
};

export default ImageCanvas;