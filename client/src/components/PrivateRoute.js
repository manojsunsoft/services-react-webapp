import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { isLogin } from "./auth";
function PrivateRoute({ component: Component, ...rest }) {
  // const isAuthenticated = useAuth();

  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <Component {...props} />
        ) : (
          //<Redirect to="/" />
          (window.location.href = localStorage.Baseurl + "/login/")
        )
      }
    />
  );
}

export default PrivateRoute;
