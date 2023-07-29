import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
