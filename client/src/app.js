import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './context/ColorModeContext.jsx';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage/MainPage.jsx';
import EventPage from './components/EventPage.jsx';
import Layout from './components/Layout.jsx';
import AuthForm from './pages/Auth/AuthForm.jsx';
import AdminDashboard from './pages/AdminDash/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<MainPage />} />
              <Route path="login" element={<AuthForm isRegister={false} />} />
              <Route path="register" element={<AuthForm isRegister={true} />} />
              <Route path="events/:id" element={<EventPage />} />
              
              {/* Protected admin routes */}
              <Route
                path="admin/*"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;