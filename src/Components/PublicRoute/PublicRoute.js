import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../../Configs/APIAuth";

function PublicRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) {
      return navigate("/");
    }
  }, [navigate]);
  return !getToken() && <Outlet />;
}

export default PublicRoute;
