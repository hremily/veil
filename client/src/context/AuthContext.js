import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signin = async (email, password) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setIsAuthenticated(true);
                navigate('/');
            } else {
                navigate('/notfound');
            }
        } catch (error) {
            console.error('Error during signin:', error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, url) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setIsAuthenticated(true);
                navigate('/');
            } else {
                navigate('/notfound');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        } finally {
            setLoading(false);
        }
    };

    const signout = async () => {
        try {
            const response = await fetch('http://localhost:3000/signout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setUser('');
                setIsAuthenticated(false);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signupUser = (email, password) => signup(email, password, 'http://localhost:3000/signupuser');
    const signupTeacher = (email, password) => signup(email, password, 'http://localhost:3000/signupteacher');

    return {
        user,
        isAuthenticated,
        loading,
        signin,
        signupUser,
        signupTeacher,
        signout,
    };
};
