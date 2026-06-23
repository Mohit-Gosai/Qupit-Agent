// src/components/studio/GeneralPostForm.jsx
import React, { useState } from 'react';
import { submitNewPost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';

const GeneralPostForm = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitNewPost({
        contentType: 'text',
        caption: content,
        tags: tags
      });
      navigate('/home'); 
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.response?.data?.message || "Something went wrong saving your post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white">Create a Post</h2>
        <p className="text-xs text-gray-400">Share your thoughts, updates, or stories with your followers.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0C0A17] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">What's on your mind?</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something interesting..."
            className="w-full h-32 p-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
            maxLength={500}
            required
          />
          <div className="text-right text-[10px] text-gray-500 font-mono">
            {content.length}/500
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Add Tags (Optional)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. photography, daily, life (separate with commas)"
            className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 text-white font-bold text-sm rounded-xl transition-all border-none cursor-pointer shadow-md"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default GeneralPostForm;