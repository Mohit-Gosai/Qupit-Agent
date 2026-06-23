// src/routes/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ◄ Grabs parameters from main.jsx routing definitions
import { useAuth } from '../context/AuthContext';
import ProfilePostGrid from '../components/feed/ProfilePostGrid';

const ProfilePage = () => {
    const { username } = useParams(); // ◄ Extracts the target profile username from the browser URL bar
    const { token, user } = useAuth(); // Globally logged-in account identity context
    
    const [profileData, setProfileData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [caption, setCaption] = useState('');
    const [posting, setPosting] = useState(false);

    // CRITICAL: Force target to look up the path param first. Fall back to logged-in user if parameter is missing.
    const targetUsername = username || user?.username;

    const fetchProfile = async () => {
        if (!targetUsername) return;
        setLoading(true);
        try {
            // Pointing directly to your clean CommonJS /api/users/:username backend endpoint loop
            const response = await fetch(`/api/users/${targetUsername}`);
            const data = await response.json();
            if (data.success) {
                setProfileData(data.profile);
                setUserPosts(data.posts);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    // Re-run the fetch profile hook loop if either the target username in the route changes, or the user shifts pages
    useEffect(() => {
        fetchProfile();
    }, [targetUsername]); 

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!caption.trim()) return;

        setPosting(true);
        try {
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ contentType: 'text', caption })
            });

            const data = await response.json();
            if (data.success) {
                setCaption('');
                fetchProfile(); // Refresh personal grid mapping array state
            }
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setPosting(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500 text-sm">Synchronizing dashboard...</div>;
    if (!profileData) return <div className="text-center py-20 text-red-400">Profile data missing.</div>;

    return (
        <div className="w-full space-y-8 animate-fadeIn">
            
            {/* High-Fidelity Profile Banner Deck */}
            <div className="relative p-6 bg-[#141122] border border-purple-900/20 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-[#FFB7C5]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-2xl font-black tracking-tight text-white">{profileData.displayName}</h2>
                            <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase font-bold rounded-md tracking-wider">Creator</span>
                        </div>
                        <p className="text-sm text-gray-400 font-mono">@{profileData.username}</p>
                    </div>

                    {/* Metrics Block */}
                    <div className="flex gap-4 p-3 bg-[#0D0B14]/60 rounded-xl border border-white/5">
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{profileData.followingCount}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Following</div></div>
                        <div className="border-r border-white/5" />
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{profileData.followersCount}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Followers</div></div>
                        <div className="border-r border-white/5" />
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{userPosts.length}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Loops</div></div>
                    </div>
                </div>

                <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-xl font-sans">
                    {profileData.bio || "This creator hasn't established a matrix bio loop configuration yet."}
                </p>
            </div>

            {/* Quick Content Generator Terminal — Only renders if the logged-in user owns this specific profile page */}
            {token && user?.username === profileData.username && (
                <form onSubmit={handleCreatePost} className="p-4 bg-[#141122] border border-purple-900/20 rounded-2xl space-y-3">
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Configure a new thought layer..."
                        className="w-full h-16 p-3 bg-[#090710] border border-purple-900/40 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 resize-none text-xs font-mono transition-all"
                    />
                    <div className="flex justify-end">
                        <button type="submit" disabled={posting} className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-purple-600/10">
                            {posting ? "Broadcasting..." : "Publish Node"}
                        </button>
                    </div>
                </form>
            )}

            {/* Dynamic Asymmetric Grid Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <span className="text-sm font-bold tracking-wider uppercase text-gray-400">Nodes Repository</span>
                </div>
                <ProfilePostGrid posts={userPosts} />
            </div>
        </div>
    );
};

export default ProfilePage;