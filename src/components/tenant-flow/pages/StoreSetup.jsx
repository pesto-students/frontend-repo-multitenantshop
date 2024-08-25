import React from "react";
import { TENANT_STORE_SETUP_CONFIG } from "../../../utils/constants";

const StoreSetup = () => {
  return (
    <main className="page store-setup-page">
      <div className="">
        <h2 className="heading-2 color-primary">
          {TENANT_STORE_SETUP_CONFIG.heading}
        </h2>
        <p
          className="color-secondary user-welcome"
          dangerouslySetInnerHTML={{
            __html: TENANT_STORE_SETUP_CONFIG["welcome-text"].replace(
              "{username}",
              "John"
            ),
          }}
        ></p>
      </div>

      <form className="form-container">
        <div className="form-group">
          <h2 className="color-primary heading-3">
            {TENANT_STORE_SETUP_CONFIG["step-one-text"]}
          </h2>

          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Store name:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Sub domain:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Description:</span>
                <input type="text" name="" />
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <h2 className="color-primary heading-3">
            {TENANT_STORE_SETUP_CONFIG["step-two-text"]}
          </h2>

          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Upload logo:</span>
                <input type="file" accept="png" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Theme color:</span>
                <select>
                  <option disabled selected>
                    Select:
                  </option>
                  <option value="">Color 1</option>
                  <option value="">Color 2</option>
                  <option value="">Color 3</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <h2 className="color-primary heading-3">
            {TENANT_STORE_SETUP_CONFIG["step-three-text"]}
          </h2>

          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Phone number:</span>
                <input type="tel" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Address:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Email:</span>
                <input type="mail" name="" />
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <h2 className="color-primary heading-3">
            {TENANT_STORE_SETUP_CONFIG["step-four-text"]}
          </h2>

          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Return policy:</span>
                <textarea rows={6} type="tel" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Shipping policy:</span>
                <textarea rows={6} type="text" name="" />
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-submit-store">
          {TENANT_STORE_SETUP_CONFIG["submit-store-info"]}
        </button>
      </form>
    </main>
  );
};

export default StoreSetup;
