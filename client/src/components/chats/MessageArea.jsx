// src/components/chat/MessageArea.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function MessageArea({ activeUser, messages, currentUserId, onSendMessage }) {
    const [typedMessage, setTypedMessage] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!typedMessage.trim()) return;
        onSendMessage(typedMessage);
        setTypedMessage('');
    };

    if (!activeUser) {
        return (
            <div className="flex-1 bg-[#0C0A17]/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-6 h-[75vh]">
                <span className="text-3xl mb-2">💬</span>
                <p className="text-sm font-bold text-gray-300">Select a contact to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-[#0C0A17] border border-white/5 rounded-2xl flex flex-col justify-between h-[75vh] overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/5 bg-black/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h4 className="text-xs font-bold text-white">Chatting with @{activeUser.username}</h4>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {messages.map((msg, idx) => {
                    const isMe = msg.sender === currentUserId || msg.sender?._id === currentUserId;
                    return (
                        <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl text-xs leading-relaxed ${
                                isMe 
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-none' 
                                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                            }`}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 bg-black/20 border-t border-white/5 flex gap-2">
                <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    placeholder="Write message..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 rounded-xl border-none cursor-pointer transition-colors">
                    Send
                </button>
            </form>
        </div>
    );
}