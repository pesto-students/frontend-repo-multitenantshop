import React from "react";
import {
  APP_NAME_NAVBAR,
} from "../../../utils/constants";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="branding">
        <div className="logo"></div>
        <span
          className="poppins-bold brand-name"
          dangerouslySetInnerHTML={{ __html: APP_NAME_NAVBAR }}
        ></span>
      </div>
      <div className="btn-group">
        <button className="btn btn-login">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
