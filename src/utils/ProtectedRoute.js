import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.auth.value);

  return (

    <Route
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        } else {

          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
