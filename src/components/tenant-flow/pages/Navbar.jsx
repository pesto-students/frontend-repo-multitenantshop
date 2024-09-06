import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_NAME_NAVBAR } from "../../../utils/constants";
import { usePost } from "../../../utils/useRequest";
import { logout } from "../store/features/authSlice";
import { clearStore } from "../store/features/storeSlice";
import API_PATHS from "../tenantApiConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { hasStore, storeDetail } = useSelector((state) => state.store);
  const isTenantRegistration = location?.pathname === "/register";
  const isLandingPage = location?.pathname === "/";

  const { loading, error, data, executeApiCall } = usePost();

  const routeToHome = () => {
    logoutTenant();
    navigate("/");
  };

  const routeToTenantRegistration = () => {
    navigate("/register");
  };

  const routeToTenantLogin = () => {
    navigate("/login");
  };

  const logoutTenant = async () => {
    await executeApiCall(API_PATHS.TENANT_LOGOUT);
    dispatch(logout());
    dispatch(clearStore());
    routeToTenantLogin();
  };

  const renderMainBranding = () => {
    return (
      <>
        <div className="logo"></div>
        <span
          className="poppins-bold brand-name"
          dangerouslySetInnerHTML={{ __html: APP_NAME_NAVBAR }}
        ></span>
      </>
    );
  };

  const renderStoreBranding = () => {
    return (
      <>
        <img src={storeDetail?.logoUrl} className="store-logo" />
        <span
          className="capitalize poppins-bold store-brand-name"
          style={{ color: storeDetail?.theme.primaryColor }}
        >
          {storeDetail?.name}
        </span>
      </>
    );
  };

  return (
    <nav className="navbar-container">
      <div onClick={routeToHome} className="branding">
        {hasStore ? renderStoreBranding() : renderMainBranding()}
      </div>

      <div className="btn-group">
        {isLandingPage && (
          <button
            onClick={routeToTenantRegistration}
            className="btn btn-register"
          >
            Register
          </button>
        )}
        {(isTenantRegistration || isLandingPage) && (
          <button onClick={routeToTenantLogin} className="btn btn-login">
            Login
          </button>
        )}
      </div>

      {isAuthenticated && (
        <div className="btn-group">
          <button onClick={logoutTenant} className="btn btn-login">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
