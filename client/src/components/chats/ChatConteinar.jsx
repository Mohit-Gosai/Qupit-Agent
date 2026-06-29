// src/components/chat/ChatContainer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import UserChatList from './UserChatList';
import MessageArea from './MessageArea';
import CryptoJS from 'crypto-js';

let socket;
export default function ChatContainer() {
  const location = useLocation();

  const getSecretKey = (id1, id2) => {
    if (!id1 || !id2) return '';
    // Sort them alphabetically so userA + userB and userB + userA generate the exact same string
    return [id1, id2].sort().join('_');
  };
  // 1. Change this from a static variable to a reactive state hook!
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('userId'));

  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // 2. Add a dynamic safety check to pull the ID if it was delayed during login redirect
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId && storedId !== "undefined" && storedId !== currentUserId) {
      setCurrentUserId(storedId);
    }
  }, [currentUserId]);

  // ==========================================
  // 1. DATA EFFECTS: Handles HTTP User Fetching
  // ==========================================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        let dynamicUsersList = res.data;

        if (location.state?.startChatWith) {
          const target = location.state.startChatWith;
          setActiveUser(target);
          if (!dynamicUsersList.some(u => u._id === target._id)) {
            dynamicUsersList = [target, ...dynamicUsersList];
          }
        }
        setUsers(dynamicUsersList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [location.state]);
  // ==========================================
  // 2. SOCKET CONNECTIONS: Restructured to wait for a valid 24-char hex string
  // ==========================================
  useEffect(() => {
    if (!currentUserId || currentUserId === "undefined" || currentUserId.length !== 24) {
      return;
    }
    socket = io('http://localhost:5000', { transports: ['websocket'] });
    socket.emit('registerUser', currentUserId);
    socket.on('receiveMessage', (newMsg) => {
      // Determine the secret key for whoever sent this incoming message
      const secretKey = getSecretKey(currentUserId, newMsg.sender);
      try {
        // Decrypt the incoming ciphertext bundle
        const bytes = CryptoJS.AES.decrypt(newMsg.text, secretKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedText) {
          newMsg.text = decryptedText; // Swap out ciphertext for clean readable text
        }
      } catch (error) {
        console.error("⚠️ Decryption failed. Message might be corrupted or unencrypted:", error);
      }
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [currentUserId]);
  // ==========================================
  // 3. HISTORY SYNC: Fetch chat logs on user selection
  // ==========================================
  useEffect(() => {
    if (!activeUser || !activeUser._id) return;

    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`/api/chat/history/${activeUser._id}`);
        const secretKey = getSecretKey(currentUserId, activeUser._id);
        // Map over database items and decrypt them on the fly for the UI
        const decryptedHistory = res.data.map(msg => {
          try {
            const bytes = CryptoJS.AES.decrypt(msg.text, secretKey);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            return { ...msg, text: decryptedText || "🔓 [Decryption Error]" };
          } catch {
            return msg; // Fallback for old plaintext messages
          }
        });

        setMessages(decryptedHistory);
      } catch (err) {
        console.error("Error loading historical chat arrays:", err);
      }
    };

    fetchChatHistory();
  }, [activeUser, currentUserId]);
  const handleSendMessage = (text) => {
  if (!socket || !activeUser || !text.trim()) return;
  
  if (!currentUserId || currentUserId === "undefined") {
    console.error("❌ Message blocked: currentUserId is invalid.");
    return;
  }

  const secretKey = getSecretKey(currentUserId, activeUser._id);
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();

  socket.emit('sendMessage', {
    senderId: currentUserId,
    recipientId: activeUser._id,
    text: encryptedText 
  });
  // ◄ FIXED: Optimistic UI insertion so bubble pops up instantly for sender
  const nativeMessageBlock = {
    _id: String(Date.now()), 
    sender: currentUserId,
    recipient: activeUser._id,
    text: text, 
    createdAt: new Date().toISOString()
  };
  setMessages((prev) => [...prev, nativeMessageBlock]);
};

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 max-w-5xl mx-auto h-[80vh] items-start p-2">
      <UserChatList users={users} activeUser={activeUser} onSelectUser={setActiveUser} />
      <MessageArea activeUser={activeUser} messages={messages} currentUserId={currentUserId} onSendMessage={handleSendMessage} />
    </div>
  );
}