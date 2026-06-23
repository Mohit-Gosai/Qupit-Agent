// src/components/feed/ProfilePostGrid.jsx
import React from 'react';

const ProfilePostGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm border border-dashed border-white/5 rounded-2xl">
        No publications yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max">
      {posts.map((post) => {
        // Rule A: Text Posts span 2 columns, 16:9 ratio
        if (post.contentType === 'text') {
          return (
            <div 
              key={post._id} 
              className="md:col-span-2 aspect-[16/9] p-6 bg-[#161224] border border-purple-950/40 rounded-2xl flex flex-col justify-between hover:border-purple-500/40 transition-all group"
            >
              <p className="text-sm text-gray-200 line-clamp-5 leading-relaxed font-sans">
                {post.caption}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
                <span>📝 Text Loop</span>
                <span className="group-hover:text-purple-400 transition-colors">❤️ {post.likes?.length || 0}</span>
              </div>
            </div>
          );
        }

        // Rule B: Video Posts span 1 column, 9:16 vertical showcase ratio
        if (post.contentType === 'video') {
          return (
            <div 
              key={post._id} 
              className="md:col-span-1 aspect-[9/16] bg-[#161224] border border-purple-950/40 rounded-2xl overflow-hidden relative group flex flex-col justify-end p-4"
            >
              {post.contentUrl ? (
                <video src={post.contentUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" muted loop playsInline />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-black/40" />
              )}
              <div className="relative z-10 space-y-2">
                <p className="text-xs text-gray-300 line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>🎬 Video</span>
                  <span>❤️ {post.likes?.length || 0}</span>
                </div>
              </div>
            </div>
          );
        }

        // Rule C: Image Posts (or generic fallback) span 1 column, 1:1 square ratio
        return (
          <div 
            key={post._id} 
            className="md:col-span-1 aspect-square bg-[#161224] border border-purple-950/40 rounded-2xl overflow-hidden relative group flex flex-col justify-end p-4"
          >
            {post.contentUrl && (
              <img src={post.contentUrl} alt="Post asset" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B14] via-transparent to-transparent opacity-80" />
            <div className="relative z-10 space-y-1">
              <p className="text-xs text-gray-200 line-clamp-1">{post.caption}</p>
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>🖼️ Image</span>
                <span>❤️ {post.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePostGrid;