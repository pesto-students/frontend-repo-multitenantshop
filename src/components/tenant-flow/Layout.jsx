import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import "./tenant.scss";
import Loader from "../Loader";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
