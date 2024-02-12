import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kaizntree_be_challenge_fe/" element={<LoginPage />} />
        <Route path="/kaizntree_be_challenge_fe/signup" element={<SignupPage />} />
        <Route path="/kaizntree_be_challenge_fe/dashboard" element={<DashboardPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;