import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  // layout of the entire app
  // used since there are multiple parallel routes(login,register,dash) at root.
  return <Outlet />;
};

export default AppLayout;
