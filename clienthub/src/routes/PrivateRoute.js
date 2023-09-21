import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../assets/inline.css";
import "../assets/style.css";
import { AppLayout } from "../themes/layout";
import { setCookie, getQueryParams, getCookie } from "../xhr/auth";
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("this is working out");
        if (getQueryParams("auth_token")) {
          console.log("this is working");
          setCookie("auth_token", getQueryParams("auth_token"), 1);
        }
        return (
          <>
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          </>
        );
      }}
    />
  );
}

export default PrivateRoute;
