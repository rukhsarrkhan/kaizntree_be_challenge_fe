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
        {!access_token && <Route path="/" element={<LandingPage />} />}
        {!access_token && <Route path="/login" element={<LoginPage />} />}
        {!access_token && <Route path="/signup" element={<SignupPage />} />}
        {access_token && <Route path="/dashboard" element={<DashboardPage />} />}
        {!access_token && <Route path="/forgot-password" element={<ForgotPasswordPage />} />}
        {!access_token && <Route path="/forgot-password-success" element={<ForgotPasswordSuccessPage />} />}
        {!access_token && <Route path='/api/v1/auth/password-reset-confirm/:uidb64/:token/' element={<ForgotPasswordResetPage />} />}
        {access_token && <Route path="/logout" element={<LogoutPage />} />}
        // page not found page
      </Routes>
    </>
  );
}

export default App;