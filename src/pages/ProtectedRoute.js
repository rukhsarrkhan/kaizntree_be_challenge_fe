import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const accessToken = sessionStorage.getItem('access_token');

    if (!accessToken) {
        // Redirect to the login page if there's no access token
        return <Navigate to="/login" />;
    }

    return children;
};
