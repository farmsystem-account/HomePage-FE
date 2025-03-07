import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';    
import RegisterPage from './pages/Register/RegisterPage';   
import AuthCallback from './pages/Auth/AuthCallback';
import AdminApplications from './pages/Admin/AdminApplications';

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/api/auth/login" element={<AuthCallback />} />
          <Route path="/admin" element={<AdminApplications />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;