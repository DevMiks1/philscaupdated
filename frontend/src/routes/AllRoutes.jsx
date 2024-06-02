import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import DashBoard from "../pages/Dashboard";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import { useAuth } from "../components/context/Auth";
import PageNotFound from "../pages/PageNotFound";

const AllRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route
        path="/dashboard"
        element={user ? <DashBoard /> : <Navigate to="/" replace />}
      />
      <Route element={<ProtectedRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
