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
import LandingPage from './pages/Landingpage';
import Navbar from './components/NavBar';
import LogoutPage from './pages/LogoutPage';


function App() {
  const access_token = sessionStorage.getItem('access_token');

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