import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TENANT_ADD_PRODUCTS_CONFIG } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { usePost } from "../../../utils/useRequest";
import Loader from "../../Loader";
import API_PATHS from "../tenantApiConfig";
import ColorPicker from "./ColorPicker";
import { notifySuccess } from "../../../utils/utils";

const AddProducts = () => {
  const navigate = useNavigate();
  const [colorValues, setColorValues] = useState([]);
  const productImagesFile = useRef([]);
  const { storeId } = useSelector((state) => state.store);
  const { tenant } = useSelector((state) => state.auth);
  const { loading, executeApiCall } = usePost();

  const routeToUserDashboard = () => {
    navigate("/dashboard");
  };

  const handleProductAddition = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("productName");
    const category = formData.get("productCategory");
    const subcategory = formData.get("productSubCategory");
    const price = formData.get("productPrice");
    const sizeOptions = formData.get("productSize");
    const description = formData.get("productDescription");
    const quantityAvailable = formData.get("productQuantity");

    let images = [];

    for (let i = 0; i < productImagesFile.current.files.length; i++) {
      images.push(productImagesFile.current.files[i]);
    }

    const response = await executeApiCall(
      API_PATHS.PRODUCT_ADD(tenant.tenantId, storeId),
      {
        productId: uuidv4(),
        name,
        category,
        subcategory,
        price,
        sizeOptions,
        description,
        images,
        quantityAvailable,
        colors: colorValues.join(","),
      },
      {
        "Content-Type": "multipart/form-data",
      }
    );

    if (response) {
      notifySuccess("Product added successfully!");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="page product-page">
      <>
        <div className="flex header">
          <h2 className="heading-2 color-primary">
            {TENANT_ADD_PRODUCTS_CONFIG.heading}
          </h2>
          <p
            className="color-secondary add-product-description"
            dangerouslySetInnerHTML={{
              __html: TENANT_ADD_PRODUCTS_CONFIG.description,
            }}
          ></p>
        </div>

        <form onSubmit={handleProductAddition} className="form-container">
          <div className="form-group">
            <div className="form-fields">
              <div className="form-input">
                <label>
                  <span className="color-secondary">Product name:</span>
                  <input required type="text" name="productName" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Category:</span>
                  <input required type="text" name="productCategory" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Sub-category:</span>
                  <input required type="text" name="productSubCategory" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Price:</span>
                  <input required type="number" name="productPrice" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Quantity:</span>
                  <input required type="number" name="productQuantity" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary size-option">
                    <span>Size Options:</span>
                    <span>
                      (Provide comma separated e.g. S, M, L, XL or 28, 32)
                    </span>
                  </span>
                  <input required type="text" name="productSize" />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary color-picker-label">
                    Color:
                  </span>
                </label>
                <ColorPicker setColorValues={setColorValues} />
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">
                    Upload images for all colors:
                  </span>
                  <input
                    ref={productImagesFile}
                    required
                    type="file"
                    accept=".png"
                    name="productImages"
                    multiple
                  />
                </label>
              </div>
              <div className="form-input">
                <label>
                  <span className="color-secondary">Product description:</span>
                  <textarea rows={6} type="text" name="productDescription" />
                </label>
              </div>
            </div>
          </div>
          <div className="btn-group">
            <button
              type="button"
              onClick={routeToUserDashboard}
              className="btn btn-secondary-outline"
            >
              {TENANT_ADD_PRODUCTS_CONFIG["go-to-dashboard-btn"]}
            </button>
            <button type="submit" className="btn btn-primary">
              {TENANT_ADD_PRODUCTS_CONFIG["submit-btn"]}
            </button>
          </div>
        </form>
      </>
    </main>
  );
};

export default AddProducts;
