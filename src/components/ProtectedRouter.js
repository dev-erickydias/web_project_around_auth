import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({Children, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
        loggedIn ? Children : <Redirect to="/signin" />
      )}
    />
  );
};

export default ProtectedRoute;