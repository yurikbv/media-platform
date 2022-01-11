import React from 'react';
import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from 'react-router-dom';
import {isLoggedInVar} from "../apollo";
import routes from "../routes_var";

const RequireAuth = () => {
  
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login}/>
};

export default RequireAuth;
