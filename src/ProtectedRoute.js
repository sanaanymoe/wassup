

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { StateContext } from "./StateProvider"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(StateContext);
  // debugger
  return (
    <Route
      {...rest}
      render={(props) =>
        !!user ? (
          <Component {...props} />
        ) : (
            <Redirect to={"/login"} />
          )
      }
    />
  );
};

export default ProtectedRoute;