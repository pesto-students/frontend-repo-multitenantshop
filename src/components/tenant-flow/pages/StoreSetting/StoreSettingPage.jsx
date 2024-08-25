import React from "react";
import { STORE_SETTING_CONFIG } from "../../../../utils/constants";
import Profile from "./components/Profile";
import StoreDetails from "./components/StoreDetails";
import Products from "./components/Products";

const StoreSettingPage = () => {
  return (
    <main className="page store-setting-page">
      <aside className="side-nav">
        <a href="#">{STORE_SETTING_CONFIG["profile-tab"]}</a>
        <a href="#">{STORE_SETTING_CONFIG["store-details-tab"]}</a>
        <a href="#">{STORE_SETTING_CONFIG["products-tab"]}</a>
      </aside>
      {/* <Profile /> */}
      <StoreDetails />
      {/* <Products /> */}
    </main>
  );
};

export default StoreSettingPage;
