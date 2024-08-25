import React from "react";
import "./tenant.scss";
import GetStarted from "./pages/GetStarted";
import Landing from "./pages/Landing";
import Navbar from "./pages/Navbar";
import StoreSetup from "./pages/StoreSetup";
import AddProducts from "./pages/AddProducts";
import StoreSettingPage from "./pages/StoreSetting/StoreSettingPage";

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      {/* <Landing /> */}
      {/* <GetStarted />  */}
      {/* <StoreSetup /> */}
      {/* <AddProducts /> */}
      <StoreSettingPage />
    </div>
  );
};

export default Layout;
