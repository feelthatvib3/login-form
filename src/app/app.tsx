import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthErrorPage } from 'pages/auth-error';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';

import { ProtectedRoute } from 'widgets/routes/protected-route';
import { PublicRoute } from 'widgets/routes/public-route';

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/error"
          element={
            <PublicRoute>
              <AuthErrorPage />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}
