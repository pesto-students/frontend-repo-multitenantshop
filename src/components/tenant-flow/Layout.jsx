import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import "./tenant.scss";
import Loader from "../Loader";

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
