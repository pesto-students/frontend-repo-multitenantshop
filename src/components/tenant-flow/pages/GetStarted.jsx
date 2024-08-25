import React from "react";
import {
  APP_NAME_REGULAR,
  TENANT_GET_STARTED_CONFIG,
} from "../../../utils/constants";

const GetStarted = () => {
  return (
    <section className="get-started-page">
      <h1 className="color-primary heading-2">
        {TENANT_GET_STARTED_CONFIG.heading}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: TENANT_GET_STARTED_CONFIG.description.replaceAll(
            "{shopName}",
            APP_NAME_REGULAR
          ),
        }}
        className="color-secondary"
      ></p>
      <button className="btn btn-google-login">
        {TENANT_GET_STARTED_CONFIG["get-started-login-btn"]}
      </button>
    </section>
  );
};

export default GetStarted;
