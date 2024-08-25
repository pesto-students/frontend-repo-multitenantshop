import React from "react";
import { TENANT_ADD_PRODUCTS_CONFIG } from "../../../utils/constants";

const AddProducts = () => {
  return (
    <main className="page add-product-page">
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

      <form className="form-container">
        <div className="form-group">
          <div className="form-fields">
            <div className="form-input">
              <label>
                <span className="color-secondary">Product name:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Category:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Sub-category:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Price:</span>
                <input type="number" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary size-option">
                  <span>Size Options:</span>
                  <span>
                    (Provide comma separated e.g. "S","M","L","XL" or "28","32")
                  </span>
                </span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Color:</span>
                <input type="text" name="" />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">
                  Upload images for all colors:
                </span>
                <input type="file" accept="png" multiple />
              </label>
            </div>
            <div className="form-input">
              <label>
                <span className="color-secondary">Product description:</span>
                <textarea rows={6} type="text" name="" />
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-add-product">
          {TENANT_ADD_PRODUCTS_CONFIG["submit-btn"]}
        </button>
      </form>

      {/* <div className="product-add-confirmation">
        <span className="product-addition-icon material-symbols-outlined">
          check_circle
        </span>
        <span className="heading-1 poppins-bold product-addition-message">
          {TENANT_ADD_PRODUCTS_CONFIG["product-added-success-message"]}
        </span>
      </div> */}
    </main>
  );
};

export default AddProducts;
