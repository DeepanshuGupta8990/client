
// import { useContext } from "react";
import {useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  const user = window.localStorage.getItem('user')

  return (
    user ? 
    <Outlet /> 
    : 
    <Navigate to="/" state={{from: location}} replace />
  )
}

export default ProtectedRoutes
