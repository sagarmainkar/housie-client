import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import * as ROUTES from "../../constants/routes";

const AuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector((state) => state.sessionState.authUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to={ROUTES.HOME} /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
