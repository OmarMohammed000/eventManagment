import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage";
import EventPage from "./components/EventPage";
import Layout from "./components/Layout";
import AuthForm from "./pages/Auth/AuthForm";
import AdminDashboard from "./pages/AdminDash/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import CustomThemeProvider from "./context/ColorModeContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <>ERROR</>,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/events/:id',
        element: <EventPage />
      },
      {
        path: '/login',
        element: <AuthForm />
      },
      {
        path: '/register',
        element: <AuthForm isRegister={true} />
      },
      {
        path: '/admin/*',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;