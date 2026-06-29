// src/routes/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfilePostGrid from '../components/feed/ProfilePostGrid';

const ProfilePage = () => {
    const { username } = useParams();
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [caption, setCaption] = useState('');
    const [posting, setPosting] = useState(false);

    // --- Profile Editing States ---
    const [isEditing, setIsEditing] = useState(false);
    // FIXED: Casing adjusted from avatarURL to avatarUrl to sync with userController.js
    const [editForm, setEditForm] = useState({ displayName: '', bio: '', avatarUrl: '' });
    const [saving, setSaving] = useState(false);

    const targetUsername = username || user?.username;

    const fetchProfile = async () => {
        if (!targetUsername) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/users/${targetUsername}`);
            const data = await response.json();
            if (data.success) {
                setProfileData(data.profile);
                setUserPosts(data.posts);
                setEditForm({
                    displayName: data.profile.displayName || '',
                    bio: data.profile.bio || '',
                    avatarUrl: data.profile.avatarUrl || '' // FIXED: lower cased 'url'
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [targetUsername]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditForm({ ...editForm, avatarUrl: reader.result }); // Save local upload base64 string
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch('/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            const data = await response.json();
            if (data.success) {
                setIsEditing(false);
                fetchProfile();
            }
        } catch (err) {
            console.error("Failed to update profile configurations:", err);
        } finally {
            setSaving(false);
        }
    };

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
                fetchProfile();
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

            {/* Profile Header Deck */}
            <div className="relative p-6 bg-[#141122] border border-purple-900/20 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-[#FFB7C5]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* FIXED: Reading dynamic variable case mapping cleanly */}
                        <div className="w-16 h-16 rounded-full border-2 border-purple-500/40 bg-[#090710] flex items-center justify-center overflow-hidden shrink-0">
                            {profileData.avatarUrl ? (
                                <img 
                                    src={profileData.avatarUrl} 
                                    alt={profileData.displayName} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=" + profileData.username }}
                                />
                            ) : (
                                <div className="text-xl font-bold text-purple-400 uppercase font-mono">
                                    {profileData.displayName?.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2.5">
                                <h2 className="text-2xl font-black tracking-tight text-white">{profileData.displayName}</h2>
                                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase font-bold rounded-md tracking-wider">Creator</span>
                            </div>
                            <p className="text-sm text-gray-400 font-mono">@{profileData.username}</p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-[#0D0B14]/60 rounded-xl border border-white/5">
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{profileData.followingCount}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Following</div></div>
                        <div className="border-r border-white/5" />
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{profileData.followersCount}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Followers</div></div>
                        <div className="border-r border-white/5" />
                        <div className="text-center px-3"><div className="text-lg font-bold text-white">{userPosts.length}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Loops</div></div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    {user?.username !== profileData.username && (
                        <button
                            onClick={() => navigate('/messages', { state: { startChatWith: { _id: profileData.userId, username: profileData.username } } })}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl border-none cursor-pointer transition-colors"
                        >
                            Send Message
                        </button>
                    )}

                    {token && user?.username === profileData.username && (
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 font-bold text-xs px-4 py-2 rounded-xl border-none cursor-pointer transition-colors"
                        >
                            {isEditing ? "Close Panel" : "Edit Profile Data"}
                        </button>
                    )}
                </div>

                {!isEditing && (
                    <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-xl font-sans">
                        {profileData.bio || "This creator hasn't established a matrix bio loop configuration yet."}
                    </p>
                )}

                {/* 📝 EDIT FORM PANEL */}
                {isEditing && (
                    <form onSubmit={handleUpdateProfile} className="mt-6 p-4 bg-[#090710] border border-purple-900/30 rounded-xl space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-purple-400 tracking-wider mb-1 font-mono">Display Name</label>
                                <input 
                                    type="text" 
                                    value={editForm.displayName}
                                    onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                                    className="w-full p-2 bg-[#141122] border border-purple-900/40 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-purple-400 tracking-wider mb-1 font-mono">Avatar Image Configuration</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-xs text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-purple-600/20 file:text-purple-400 mb-2 cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Or paste an external image URL instead"
                                    value={editForm.avatarUrl.startsWith('data:') ? '' : editForm.avatarUrl}
                                    onChange={(e) => setEditForm({...editForm, avatarUrl: e.target.value})}
                                    className="w-full p-2 bg-[#141122] border border-purple-900/40 rounded-xl text-white text-[11px] font-mono focus:outline-none focus:border-purple-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-purple-400 tracking-wider mb-1 font-mono">Bio Terminal Statement</label>
                            <textarea 
                                value={editForm.bio}
                                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                className="w-full h-16 p-2 bg-[#141122] border border-purple-900/40 rounded-xl text-white text-xs font-mono resize-none focus:outline-none focus:border-purple-600"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={saving} className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer">
                                {saving ? "Saving Node..." : "Commit Variations"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Quick Content Generator Terminal */}
            {token && user?.username === profileData.username && !isEditing && (
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