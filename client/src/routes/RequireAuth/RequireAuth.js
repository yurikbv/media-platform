import React from 'react';
import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from 'react-router-dom';
import {isLoggedInVar} from "../../apollo";

const RequireAuth = () => {
  
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login"/>
};

export default RequireAuth;
