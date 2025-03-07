import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';    
import RegisterPage from './pages/Register/RegisterPage';   
import AuthCallback from './pages/Auth/AuthCallback';
import ApplyListPage from './pages/Admin/ApplyListPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/api/auth/login" element={<AuthCallback />} />
        <Route path="/applylist" element={<ApplyListPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;