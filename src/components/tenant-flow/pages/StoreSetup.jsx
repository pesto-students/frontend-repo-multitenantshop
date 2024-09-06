import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TENANT_STORE_SETUP_CONFIG } from "../../../utils/constants";
import { usePost } from "../../../utils/useRequest";
import { setStore } from "../store/features/storeSlice";
import API_PATHS from "../tenantApiConfig";
import { login } from "../store/features/authSlice";

const StoreSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tenant } = useSelector((state) => state.auth);

  const { loading, error, data, executeApiCall } = usePost();

  const routeToUserProductAddition = () => {
    navigate("/store/products/add");
  };

  const handleStoreSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("storeName");
    const subdomain = formData.get("storeSubdomain");
    const description = formData.get("storeDescription");
    const file = formData.get("storeLogo");
    const theme = JSON.parse(formData.get("storeTheme"));
    const contact = formData.get("storeContact");
    const address = formData.get("storeAddress");
    const mail = formData.get("storeMail");
    const returnPolicy = formData.get("storeReturnPolicy");
    const shippingPolicy = formData.get("storeShippingPolicy");

    const payload = {
      storeId: uuidv4(),
      name,
      subdomain,
      description,
      file,
      theme,
      contact,
      address,
      mail,
      returnPolicy,
      shippingPolicy,
    };

    addStore(payload);
  };

  const addStore = async (payload) => {
    const { tenantId } = tenant;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await executeApiCall(
      API_PATHS.STORE_ADD(tenantId),
      payload,
      headers
    );
    if (response) {
      dispatch(setStore({ storeId: response?.storeId, storeDetail: response }));
      dispatch(
        login({
          ...tenant,
          storeId: response?.store,
        })
      );
      routeToUserProductAddition();
    }
  };

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

      <form onSubmit={handleStoreSubmission} className="form-container">
        <div className="form-group">
          <h2 className="color-primary heading-3">
            {TENANT_STORE_SETUP_CONFIG["step-one-text"]}
          </h2>

          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Store name:</span>
                <input required type="text" name="storeName" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Sub domain:</span>
                <input required type="text" name="storeSubdomain" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Description:</span>
                <input required type="text" name="storeDescription" />
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
                <input required type="file" accept="png" name="storeLogo" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Theme color:</span>
                <select
                  defaultValue={JSON.stringify({
                    primaryColor: "red",
                    secondaryColor: "green",
                  })}
                  name="storeTheme"
                >
                  <option
                    value={JSON.stringify({
                      primaryColor: "red",
                      secondaryColor: "green",
                    })}
                  >
                    Red & Green
                  </option>
                  <option
                    value={JSON.stringify({
                      primaryColor: "blue",
                      secondaryColor: "yellow",
                    })}
                  >
                    Blue & Yellow
                  </option>
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
                <input required type="tel" name="storeContact" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Address:</span>
                <input required type="text" name="storeAddress" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Mail:</span>
                <input required type="mail" name="storeMail" />
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
                <textarea
                  required
                  rows={6}
                  type="tel"
                  name="storeReturnPolicy"
                />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Shipping policy:</span>
                <textarea
                  required
                  rows={6}
                  type="text"
                  name="storeShippingPolicy"
                />
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
