import { CircularProgress } from "@mui/material";
import React from "react";

function CenteredSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default CenteredSpinner;
