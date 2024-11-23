import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook for authentication

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // If authenticated, render the component
        ) : (
          <Redirect to="/login" /> // If not authenticated, redirect to login page
        )
      }
    />
  );
};

export default PrivateRoute;