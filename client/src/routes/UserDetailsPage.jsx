// src/routes/UserDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserDetailsPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Querying structural data profiles
        const res = await axios.get(`/api/users/profile/${username}`);
        setDetails(res.data);
      } catch (err) {
        console.error("Failed loading account detail node arrays:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [username]);

  if (loading) {
    return (
      <div className="p-6 text-center text-xs font-mono text-gray-500 animate-pulse">
        Polling target metadata node...
      </div>
    );
  }

  if (!details) {
    return (
      <div className="p-6 text-center text-xs text-red-400 font-mono">
        Error: Profile account target block unresolved.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      <div className="bg-[#0C0A17] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div>
            <h1 className="text-sm font-black tracking-wider text-white uppercase">Account Matrix Meta</h1>
            <p className="text-[10px] text-gray-400 font-mono">ID: {details._id}</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-all"
          >
            ← Escape Route
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Identity handle</span>
            <p className="text-xs font-mono text-white">@{details.username}</p>
          </div>

          <div className="bg-black/20 p-4 border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Biographical String</span>
            <p className="text-xs text-gray-300 italic">{details.profile?.bio || 'No structural payload found.'}</p>
          </div>

          <div className="bg-black/20 p-4 border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Network Interactions</span>
            <div className="flex gap-4 mt-1 text-xs font-mono text-white">
              <div><span className="text-gray-500">Followers:</span> {details.followers?.length || 0}</div>
              <div><span className="text-gray-500">Following:</span> {details.following?.length || 0}</div>
            </div>
          </div>

          <div className="bg-black/20 p-4 border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Timestamp Log</span>
            <p className="text-xs font-mono text-gray-400">
              {new Date(details.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}