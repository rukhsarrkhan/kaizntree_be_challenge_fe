import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const access_token = sessionStorage.getItem('access_token');

    if (access_token) {
        // Redirect to the dashboard if logged in
        return <Navigate to="/dashboard" />;
    }

    return children;
};