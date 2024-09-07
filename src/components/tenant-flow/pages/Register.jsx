import React from "react";
import { useNavigate } from "react-router-dom";
import {
  APP_NAME_REGULAR,
  TENANT_GET_STARTED_CONFIG,
} from "../../../utils/constants";
import { usePost } from "../../../utils/useRequest";
import API_PATHS from "../tenantApiConfig";

const DEFAULT_USERNAME = "pestoproject-tenant.com";
const DEFAULT_MAIL = "pestoproject-tenant@mail.com";
const DEFAULT_PASSWORD = "1111111";

const Register = () => {
  const navigate = useNavigate();

  const { loading, error, data, executeApiCall } = usePost();

  const routeToLogin = () => {
    navigate("/login");
  };

  const registerTenant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const mail = formData.get("mail");
    const password = formData.get("password");

    const response = await executeApiCall(API_PATHS.TENANT_REGISTER, {
      username,
      mail,
      password,
    });

    if (response) routeToLogin();
  };

  return (
    <section className="get-started-page">
      <h1 className="color-primary heading-2">
        {TENANT_GET_STARTED_CONFIG.headingRegister}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: TENANT_GET_STARTED_CONFIG.descriptionRegister.replaceAll(
            "{shopName}",
            APP_NAME_REGULAR
          ),
        }}
        className="color-secondary"
      ></p>

      <form onSubmit={registerTenant} className="form-container">
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
                <span className="color-secondary">Mail Id:</span>
                <input
                  type="mail"
                  defaultValue={DEFAULT_MAIL}
                  name="mail"
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

        <button type="submit" className="btn btn-primary">
          {loading ? "Registering Tenant..." : "Register"}
        </button>
      </form>
    </section>
  );
};

export default Register;
