import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const ProtectedRoutes = () => {
  const auth = useAuth();

  const isAuthenticated = () => {
    return !!auth.user; // Check if the user is logged in
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
