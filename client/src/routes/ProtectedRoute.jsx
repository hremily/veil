import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Route {...rest} element={<Component />} /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

