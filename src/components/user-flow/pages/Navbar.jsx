import React from "react";
import { USER_LANDING_PAGE } from "../userConstants";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="branding">
        <div className="logo"></div>
        <span
          className="poppins-bold brand-name"
          dangerouslySetInnerHTML={{ __html: USER_LANDING_PAGE["app-name"] }}
        ></span>
      </div>
      <div className="btn-group">
        <span className="color-secondary material-symbols-outlined">
          favorite
        </span>
        <span className="color-secondary material-symbols-outlined">
          shopping_cart
        </span>
        <button className="btn btn-login">Login/Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
