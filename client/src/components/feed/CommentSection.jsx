// src/components/feed/CommentSection.jsx
import React, { useState } from 'react';

export default function CommentSection({ comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment('');
    };
    console.log("Rendering CommentSection with comments:", comments);
    return (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-3 animate-fadeIn">
            {/* Existing Comments List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {comments?.map((c, idx) => (

                    <div key={c._id || idx} className="text-xs bg-black/20 p-2 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-purple-400">
                                @{c.user?.username || 'user'}
                            </span>
                            <span className="text-[9px] text-gray-500">
                                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{c.text}</p>
                    </div>
                ))}
                {comments?.length === 0 && (
                    <p className="text-[11px] text-gray-500 italic text-center py-2">No comments yet. Start the conversation!</p>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 rounded-xl border-none cursor-pointer transition-colors"
                >
                    Reply
                </button>
            </form>
        </div>
    );
}