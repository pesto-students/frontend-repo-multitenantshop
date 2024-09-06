import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  APP_NAME_REGULAR,
  TENANT_GET_STARTED_CONFIG,
} from "../../../utils/constants";
import { usePost } from "../../../utils/useRequest";
import { login } from "../store/features/authSlice";
import API_PATHS from "../tenantApiConfig";

const DEFAULT_USERNAME = "pestoproject-tenant.com";
const DEFAULT_PASSWORD = "1111111";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, data, executeApiCall } = usePost();

  const routeToStoreSetup = () => {
    navigate("/store/register");
  };

  const routeToDashboard = () => {
    navigate("/dashboard");
  };

  const loginTenant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const response = await executeApiCall(API_PATHS.TENANT_LOGIN, {
      username,
      password,
    });

    if (response.hasStore) {
      dispatch(
        login({
          username,
          tenantId: response?.tenantId,
          storeId: response?.storeId,
          mail: response.mail,
          role: response.role,
        })
      );
      routeToDashboard();
    } else {
      dispatch(
        login({
          username,
          tenantId: response?.tenantId,
          mail: response.mail,
          role: response.role,
        })
      );
      routeToStoreSetup();
    }
  };

  return (
    <section className="get-started-page">
      <h1 className="color-primary heading-2">
        {TENANT_GET_STARTED_CONFIG.headingLogin}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: TENANT_GET_STARTED_CONFIG.descriptionLogin.replaceAll(
            "{shopName}",
            APP_NAME_REGULAR
          ),
        }}
        className="color-secondary"
      ></p>

      <form onSubmit={loginTenant} className="form-container">
        <div className="form-group">
          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Username:</span>
                <input
                  type="text"
                  defaultValue={DEFAULT_USERNAME}
                  name="username"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label>
                <span className="color-secondary">Password:</span>
                <input
                  type="password"
                  defaultValue={DEFAULT_PASSWORD}
                  name="password"
                  required
                />
              </label>
            </div>
          </div>
        </div>
        {error && <p className="poppins-semibold error login-error">{error}</p>}

        <button
          style={{
            pointerEvents: loading && "none",
          }}
          type="submit"
          className="btn btn-secondary"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
