import React, { useEffect } from 'react';

import './App.css';
import {
  Routes,
  Route, useNavigate
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ForgotPasswordPage from './pages/ForgotPassword';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccessPage';
import ForgotPasswordResetPage from './pages/ForgotPasswordResetPage';
import LandingPage from './pages/Landingpage';
import Navbar from './components/NavBar';
import LogoutPage from './pages/LogoutPage';


function App() {
  const access_token = sessionStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      // Clear session storage
      sessionStorage.clear();

      alert("You have been logged out.");

      // Redirect to login page
      navigate('/login');
    }, 600000); // 600,000  milliseconds = 10 minutes

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password-success" element={<ForgotPasswordSuccessPage />} />
        <Route path='/api/v1/auth/password-reset-confirm/:uidb64/:token/' element={<ForgotPasswordResetPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        // page not found page
      </Routes>
    </>
  );
}

export default App;