import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ForgotPasswordPage from './pages/ForgotPassword';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccessPage';
import ForgotPasswordResetPage from './pages/ForgotPasswordResetPage';

import Navbar from './components/NavBar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password-success" element={<ForgotPasswordSuccessPage />} />
        <Route path='/api/v1/auth/password-reset-confirm/:uidb64/:token/' element={<ForgotPasswordResetPage />} />
      </Routes>
    </>
  );
}

export default App;