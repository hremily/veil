import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authValue = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
