import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../../Configs/APIAuth";

function PrivateRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      return navigate("/login");
    }
  }, [navigate]);
  return getToken() && <Outlet />;
}

export default PrivateRoute;
