import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { useData } from '../context/FetchAccountContext';

const ProtectedRoutes = () => {
  const { data, loading, setData } = useData();
  const auth = useAuth();
  const authId = auth.user._id;

  const accountLogin = () => {
    return data.find((d) => d._id === authId)
  }

  const sessionUser = accountLogin()



  // Check if the user is authenticated and their account exists in the data
  const isAuthenticatedUser = sessionUser

  return isAuthenticatedUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
