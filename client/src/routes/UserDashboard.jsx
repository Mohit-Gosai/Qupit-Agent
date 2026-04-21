import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Links, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Now this will work
  };

  // Fetch only the letters belonging to this user
  useEffect(() => {
    const fetchMyLetters = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/api/my-letters', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) setLetters(result.data);
      } catch (err) {
        console.error("Failed to fetch letters", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyLetters();
  }, []);


  return (
    <div className="flex min-h-screen bg-[#0B0914] text-white">
      {/* Sidebar - Atlas Style */}
      <aside className="w-64 border-r border-white/5 bg-[#14111E] p-6 hidden md:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#FFB7C5] to-[#A78BFA] bg-clip-text text-transparent mb-10">
          Qupit Agent
        </h1>
        <nav className="space-y-4">
          <div className="text-xs uppercase text-white/30 tracking-widest mb-4">Deployment</div>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 text-[#FFB7C5]">
            <span>📬</span> My Letters
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 transition-all text-white/60">
            <span>🎨</span> Templates
          </button>
          <div className="text-xs uppercase text-white/30 tracking-widest mt-8 mb-4">Security</div>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 transition-all text-white/60">
            <span>🔑</span> Access Control
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-semibold">User Cluster</h2>
            <p className="text-white/40 text-sm">Overview of your heartfelt digital assets</p>
          </div>
          <div className="flex gap-4">

            <button className="bg-[#FFB7C5] text-[#14111E] px-6 py-2 rounded-full font-bold hover:scale-105 transition-all">
              + New Letter
            </button>
            <button onClick={() => handleLogout()} className="bg-[#FFB7C5] text-[#14111E] px-6 py-2 rounded-full font-bold hover:scale-105 transition-all">
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Letters', value: letters.length },
            { label: 'Read by Recipients', value: '0' },
            { label: 'Agent Status', value: 'Active' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1A1828] border border-white/10 p-6 rounded-2xl">
              <div className="text-white/40 text-xs uppercase mb-1">{stat.label}</div>
              <div className="text-2xl font-mono text-[#A78BFA]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Letters List (Atlas "Cluster" View) */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Active Letters</h3>
          {loading ? (
            <div className="animate-pulse h-20 bg-white/5 rounded-2xl" />
          ) : letters.length === 0 ? (
            <div className="border-2 border-dashed border-white/5 rounded-3xl p-20 text-center text-white/20">
              No letters deployed yet. Start your first mission.
            </div>
          ) : (
            letters.map((letter) => (
              <motion.div
                key={letter._id}
                whileHover={{ x: 10 }}
                className="bg-[#1A1828] border border-white/10 p-5 rounded-2xl flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-lg">{letter.title}</div>
                  <div className="text-sm text-white/40">Sent to: {letter.recipient}</div>
                </div>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                    Deployed
                  </span>
                  <button className="text-white/20 hover:text-white transition-colors">Edit</button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;