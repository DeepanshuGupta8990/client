
// import { useContext } from "react";
import {useLocation, Navigate, Outlet } from "react-router-dom";

const UnProtectedRoutes = () => {
  const location = useLocation();
  const user = window.localStorage.getItem('user')
  
  return (
    !user ? 
    <Outlet /> 
    : 
    <Navigate to="/home" state={{from: location}} replace />
  )
}

export default UnProtectedRoutes
