
import React from 'react';

export default function UserChatList({ users, activeUser, onSelectUser }) {
  return (
    <div className="w-full md:w-64 bg-[#0C0A17] border border-white/5 rounded-2xl p-4 flex flex-col gap-2 h-[75vh] overflow-y-auto">
      <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Conversations</h3>
      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border-none text-left cursor-pointer ${
            activeUser?._id === user._id ? 'bg-purple-600/30 border border-purple-500/30 text-white' : 'bg-black/20 text-gray-400 hover:bg-black/40'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300">
            {user.username?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-bold text-white">@{user.username}</p>
            <p className="text-[10px] text-gray-500">Tap to chat</p>
          </div>
        </button>
      ))}
    </div>
  );
}