// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ServerPrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.card.isServerAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ServerPrivateRoute;
