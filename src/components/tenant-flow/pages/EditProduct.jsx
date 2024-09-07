import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TENANT_EDIT_PRODUCT_CONFIG } from "../../../utils/constants";

import { useSelector } from "react-redux";
import { useGet, usePut } from "../../../utils/useRequest";
import { notifySuccess } from "../../../utils/utils";
import Loader from "../../Loader";
import API_PATHS from "../tenantApiConfig";
import ColorPicker from "./ColorPicker";

const EditProducts = () => {
  const navigate = useNavigate();
  const [colorValues, setColorValues] = useState([]);
  const { storeId } = useSelector((state) => state.store);
  const productImagesFile = useRef([]);

  const { loading, error, data, executeApiCall } = usePut();
  const {
    loading: isFetching,
    error: getError,
    data: productData,
    executeApiCall: executeGetProductApiCall,
  } = useGet();

  const { productId } = useParams();

  const routeToUserDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    async function getProduct() {
      const product = await executeGetProductApiCall(
        API_PATHS.PRODUCT_GET_ONE(storeId, productId)
      );
      if (product) {
        setColorValues(product.colors.split(","));
      }
    }
    getProduct();
  }, []);

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

    let payload = {
      productId: productData.productId,
      name,
      category,
      subcategory,
      price,
      sizeOptions,
      description,
      quantityAvailable,
      colors: colorValues.join(","),
    };
    let images = [];

    if (productImagesFile) {
      for (let i = 0; i < productImagesFile.current.files.length; i++) {
        images.push(productImagesFile.current.files[i]);
      }
      payload.images = [...images];
    }

    const response = await executeApiCall(
      API_PATHS.PRODUCT_UPDATE(storeId, productData.productId),
      payload,
      {
        "Content-Type": "multipart/form-data",
      }
    );

    if (response) {
      notifySuccess("Edited product saved successfully");
    }
  };

  if (isFetching || loading) {
    return <Loader />;
  }

  return (
    <main className="page product-page">
      <>
        <div className="flex header">
          <h2 className="heading-2 color-primary">
            {TENANT_EDIT_PRODUCT_CONFIG.heading}
          </h2>
          <p
            className="color-secondary add-product-description"
            dangerouslySetInnerHTML={{
              __html: TENANT_EDIT_PRODUCT_CONFIG.description,
            }}
          ></p>
        </div>

        {!isFetching && productData && (
          <form onSubmit={handleProductAddition} className="form-container">
            <div className="form-group">
              <div className="form-fields">
                <div className="form-input">
                  <label>
                    <span className="color-secondary">Product name:</span>
                    <input
                      required
                      type="text"
                      defaultValue={productData.name}
                      name="productName"
                    />
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">Category:</span>
                    <input
                      required
                      type="text"
                      defaultValue={productData.category}
                      name="productCategory"
                    />
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">Sub-category:</span>
                    <input
                      required
                      type="text"
                      defaultValue={productData.subcategory}
                      name="productSubCategory"
                    />
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">Price:</span>
                    <input
                      required
                      type="number"
                      defaultValue={productData.price}
                      name="productPrice"
                    />
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">Quantity:</span>
                    <input
                      required
                      type="number"
                      defaultValue={productData.quantityAvailable}
                      name="productQuantity"
                    />
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
                    <input
                      required
                      type="text"
                      defaultValue={productData.sizeOptions}
                      name="productSize"
                    />
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary color-picker-label">
                      Color:
                    </span>
                  </label>
                  <ColorPicker
                    colorValue={colorValues}
                    setColorValues={setColorValues}
                  />
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">
                      Upload images for all colors:
                    </span>
                    <input
                      ref={productImagesFile}
                      type="file"
                      accept=".png"
                      name="productImages"
                      multiple
                    />
                  </label>
                  <div className="image-container">
                    {productData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`product-img-${index}`}
                        className="display-image"
                      />
                    ))}
                  </div>
                </div>
                <div className="form-input">
                  <label>
                    <span className="color-secondary">
                      Product description:
                    </span>
                    <textarea
                      rows={6}
                      type="text"
                      name="productDescription"
                      defaultValue={productData.description}
                    />
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
                {TENANT_EDIT_PRODUCT_CONFIG["go-to-dashboard-btn"]}
              </button>
              <button type="submit" className="btn btn-primary">
                {TENANT_EDIT_PRODUCT_CONFIG["submit-btn"]}
              </button>
            </div>
          </form>
        )}
      </>
    </main>
  );
};

export default EditProducts;
