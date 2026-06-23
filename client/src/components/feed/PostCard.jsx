// src/components/feed/PostCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const { _id, author, contentType, contentUrl, caption, createdAt } = post;

  // Local state contexts keeping track of database array parameters safely
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Check if current user logged in has liked this post based on browser token payload tracking
  const currentUserId = localStorage.getItem('userId');
  const isLiked = likes.includes(currentUserId);

  // Interactivity 1: Handle Like/Unlike Syncing with backend endpoint put('/like/:id')
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await axios.put(`/api/posts/like/${_id}`);
      if (response.data.success) {
        // Backend handles pushing/pulling ID. If liked, we reflect it locally
        if (isLiked) {
          setLikes(likes.filter(id => id !== currentUserId));
        } else {
          setLikes([...likes, currentUserId]);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user._id); // ◄ Add this so the UI tracks your own like clicks!
        }
      }
    } catch (error) {
      console.error("Error toggling like state:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Interactivity 2: Handle Posting Comments to backend endpoint post('/comment/:id')
  // Inside src/components/feed/PostCard.jsx

  // Update your old handleAddComment function to this:
  const handleAddComment = async (text) => {
    try {
      const response = await axios.post(`/api/posts/comment/${_id}`, { text });

      if (response.data.success && response.data.comments) {
        // 🎯 Directly set the comments array with the fully populated 
        // backend server payload containing the nested username objects!
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Error publishing comment interaction:", error);
    }
  };

  return (
    <div className="bg-[#0C0A17] border border-white/5 rounded-2xl p-4 mb-4 shadow-lg space-y-3 animate-fadeIn">
      {/* Post Header */}
      <div className="flex items-center gap-3">
        <img
          src={author?.profile?.avatarUrl || 'https://via.placeholder.com/150'}
          alt="Avatar"
          className="w-9 h-9 rounded-full object-cover border border-purple-500/20"
        />
        <div>
          <h4 className="text-xs font-bold text-white">
            {author?.profile?.displayName || author?.username || 'Matrix Creator'}
          </h4>
          <p className="text-[10px] text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Caption Text Box */}
      {caption && <p className="text-gray-200 text-xs leading-relaxed whitespace-pre-wrap">{caption}</p>}

      {/* Display Media Assets safely based on content rules */}
      {contentUrl && (
        <div className="rounded-xl overflow-hidden bg-black/30 border border-white/5 max-h-[380px] flex items-center justify-center">
          {contentType === 'image' && <img src={contentUrl} alt="Post content" className="w-full h-full object-contain max-h-[380px]" />}
          {contentType === 'video' && <video src={contentUrl} controls loop muted className="w-full max-h-[380px] bg-black" />}
        </div>
      )}

      {/* Interactive Toolbar Deck */}
      <div className="flex items-center gap-6 pt-2 border-t border-white/5 text-[11px] font-mono text-gray-400">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors ${isLiked ? 'text-pink-500 font-bold' : 'hover:text-pink-400'}`}
        >
          {isLiked ? '❤️' : '🤍'} <span>{likes.length}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors ${showComments ? 'text-purple-400 font-bold' : 'hover:text-purple-400'}`}
        >
          💬 <span>{comments.length}</span>
        </button>
      </div>

      {/* Nested Comment Block View */}
      {showComments && (
        <CommentSection comments={comments} onAddComment={handleAddComment} />
      )}
    </div>
  );
}