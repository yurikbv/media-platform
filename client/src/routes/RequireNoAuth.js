import React from 'react';
import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from 'react-router-dom';
import {isLoggedInVar} from "../apollo";
import routes from "../routes_var";

const RequireNoAuth = () => {
  
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return !isLoggedIn ? <Outlet /> : <Navigate to={routes.home}/>
};

export default RequireNoAuth;
