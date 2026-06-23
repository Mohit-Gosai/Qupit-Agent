// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ensures frontend waits gracefully

    useEffect(() => {
        const loadCurrentUser = async () => {
            // If there's no token in localStorage at all, stop loading right away
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/users/me', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();

                if (data.success && data.profile) {
                    // This state change forces React to immediately re-render your LeftSidebar!
                    setUser({ username: data.profile.username });
                } else {
                    // Only wipe session if the backend explicitly tells us the token is invalid/expired
                    console.warn("Session token rejected by backend validation server.");
                    logout();
                }
            } catch (err) {
                console.error("Network synchronization delay encountered:", err);
                // CRITICAL: Do NOT call logout() here on simple network lag or slow responses,
                // otherwise any slow load will wipe out the user's login state completely!
            } finally {
                // Once the request finishes (success or failure), flip loading to false
                setLoading(false);
            }
        };

        // Inside your AuthContext checkAuth function or useEffect block:
        const checkUserSession = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Set user profile state if successful...
            } catch (err) {
                console.warn("Session invalid, clearing state.");
            }
        };
        loadCurrentUser();
    }, [token]); // Re-runs instantly if a new token is set via login()

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setLoading(true); // Flip back to true so components wait for the new user fetch
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);