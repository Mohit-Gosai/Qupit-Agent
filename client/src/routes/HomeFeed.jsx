// src/pages/HomeFeed.jsx
import React, { useState, useEffect } from 'react';
import PostCard from '../components/feed/PostCard';

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeed = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error("Error fetching social feed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-gray-400">Loading your feed timeline...</div>;
    }

    return (
        <div className="w-full space-y-4">
            {posts.length === 0 ? (
                <p className="text-center py-10 text-gray-500 text-sm">No posts on the timeline yet.</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} onRefresh={fetchFeed} />
                ))
            )}
        </div>
    );
};

export default HomeFeed;