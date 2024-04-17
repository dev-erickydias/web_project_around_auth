import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({children, loggedIn, ...rest }) => {
  console.log(children)

  return (
    <Route {...rest}>{loggedIn ? children : <Redirect to="/signin" />}</Route>
  );
};

export default ProtectedRoute;