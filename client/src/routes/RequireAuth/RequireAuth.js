import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  
  const isLoggedIn = false;
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login"/>
};

export default RequireAuth;
