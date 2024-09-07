import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TENANT_EDIT_STORE_CONFIG } from "../../../utils/constants";
import { useGet, usePut } from "../../../utils/useRequest";
import { notifySuccess } from "../../../utils/utils";
import Loader from "../../Loader";
import { login } from "../store/features/authSlice";
import { setStore } from "../store/features/storeSlice";
import API_PATHS from "../tenantApiConfig";

const StoreEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tenant } = useSelector((state) => state.auth);
  const { storeId } = useParams();

  const { loading, error, data, executeApiCall } = usePut();

  const routeToDashboard = () => {
    navigate("/dashboard");
  };

  const {
    loading: isFetching,
    data: storeData,
    executeApiCall: executeGetStoreApiCall,
  } = useGet();

  useEffect(() => {
    const { tenantId } = tenant;
    async function getProduct() {
      const storeDetails = await executeGetStoreApiCall(
        API_PATHS.STORE_GET(tenantId, storeId)
      );
    }
    getProduct();
  }, []);

  const handleStoreSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("storeName");
    const subdomain = formData.get("storeSubdomain");
    const description = formData.get("storeDescription");
    const theme = JSON.parse(formData.get("storeTheme"));
    const contact = formData.get("storeContact");
    const address = formData.get("storeAddress");
    const mail = formData.get("storeMail");
    const returnPolicy = formData.get("storeReturnPolicy");
    const shippingPolicy = formData.get("storeShippingPolicy");

    const logoFile = formData.get("storeLogo");

    const payload = {
      storeId,
      name,
      subdomain,
      description,
      file: logoFile ? logoFile : {},
      theme,
      contact,
      address,
      mail,
      returnPolicy,
      shippingPolicy,
    };

    editStore(payload);
  };

  const editStore = async (payload) => {
    const { tenantId } = tenant;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await executeApiCall(
      API_PATHS.STORE_MODIFY(tenantId, storeId),
      payload,
      headers
    );
    if (response) {
      notifySuccess("Store updated successfully!");
      dispatch(
        login({
          ...tenant,
          storeId: response?.storeId,
        })
      );
      routeToDashboard();
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <main className="page store-setup-page">
      <div className="">
        <h2 className="heading-2 color-primary">
          {TENANT_EDIT_STORE_CONFIG.heading}
        </h2>
        <p
          className="color-secondary user-welcome"
          dangerouslySetInnerHTML={{
            __html: TENANT_EDIT_STORE_CONFIG["welcome-text"].replace(
              "{username}",
              tenant?.username
            ),
          }}
        ></p>
      </div>

      {!isFetching && storeData && (
        <form onSubmit={handleStoreSubmission} className="form-container">
          <div className="form-group">
            <h2 className="color-primary heading-3">
              {TENANT_EDIT_STORE_CONFIG["step-one-text"]}
            </h2>

            <div className="form-fields">
              <div className="form-input">
                <label>
                  <span className="color-secondary">Store name:</span>
                  <input
                    defaultValue={storeData.name}
                    required
                    type="text"
                    name="storeName"
                  />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Sub domain:</span>
                  <input
                    defaultValue={storeData.subdomain.split("--")[0]}
                    required
                    type="text"
                    name="storeSubdomain"
                  />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Description:</span>
                  <input
                    defaultValue={storeData.description}
                    required
                    type="text"
                    name="storeDescription"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h2 className="color-primary heading-3">
              {TENANT_EDIT_STORE_CONFIG["step-two-text"]}
            </h2>

            <div className="form-fields">
              <div className="form-input">
                <label>
                  <span className="color-secondary">Upload logo:</span>
                  <input type="file" accept=".png" name="storeLogo" />
                </label>
                <div className="image-container">
                  <img
                    src={storeData.logoUrl}
                    alt={`store-logo`}
                    className="display-image"
                  />
                </div>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Theme color:</span>
                  <select
                    defaultValue={
                      JSON.stringify(storeData.theme) ||
                      JSON.stringify({
                        primaryColor: "red",
                        secondaryColor: "green",
                      })
                    }
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
              {TENANT_EDIT_STORE_CONFIG["step-three-text"]}
            </h2>

            <div className="form-fields">
              <div className="form-input">
                <label>
                  <span className="color-secondary">Phone number:</span>
                  <input
                    defaultValue={storeData.contact}
                    required
                    type="tel"
                    name="storeContact"
                  />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Address:</span>
                  <input
                    defaultValue={storeData.address}
                    required
                    type="text"
                    name="storeAddress"
                  />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Mail:</span>
                  <input
                    defaultValue={storeData.mail}
                    required
                    type="mail"
                    name="storeMail"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h2 className="color-primary heading-3">
              {TENANT_EDIT_STORE_CONFIG["step-four-text"]}
            </h2>

            <div className="form-fields">
              <div className="form-input">
                <label>
                  <span className="color-secondary">Return policy:</span>
                  <textarea
                    defaultValue={storeData.returnPolicy}
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
                    defaultValue={storeData.shippingPolicy}
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
            {TENANT_EDIT_STORE_CONFIG["submit-store-info"]}
          </button>
        </form>
      )}
    </main>
  );
};

export default StoreEdit;
