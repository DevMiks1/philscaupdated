/** @format */


import { Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn";
import DashBoard from "../pages/Dashboard";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import { AuthProvider } from "../components/context/Auth";

const AllRoutes = ({userDetails}) => {
  console.log(userDetails);
  return (
    
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route element={<ProtectedRoutes userDetails={userDetails}/>}>
            <Route path="/dashboard" element={<DashBoard />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
  
  );
};

export default AllRoutes;
