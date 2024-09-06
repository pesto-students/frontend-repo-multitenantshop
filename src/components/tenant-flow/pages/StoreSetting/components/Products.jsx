import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDelete } from "../../../../../utils/useRequest";
import API_PATHS from "../../../tenantApiConfig";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "../../../../../utils/utils";

const Products = () => {
  const { allProducts } = useOutletContext();
  const [productList, setProductList] = useState(allProducts);
  const navigate = useNavigate();

  const { loading, executeApiCall } = useDelete();

  const handleEdit = (productId) => {
    navigate(`/store/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await executeApiCall(
        API_PATHS.PRODUCT_DELETE_ONE(productId)
      );
      if (response) {
        setProductList((prev) => prev.filter((_) => _._id !== productId));
        notifySuccess("Product deleted successfully");
        navigate("/dashboard/store-products");
      }
    } catch (err) {}
  };

  const routeToAddProducts = () => {
    navigate("/store/products/add");
  };

  return (
    <div className="product-listing-page">
      <header>
        <h1 className="heading-2 color-primary">Products</h1>
        <button onClick={routeToAddProducts} className="btn btn-secondary">
          Add more products
        </button>
      </header>
      <p className="color-secondary">Total Products: {productList.length}</p>
      <div className="product-grid">
        {productList.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
            <h2 className="color-primary poppins-semibold heading-3 capitalize">
              {product.name}
            </h2>
            <p className="color-secondary capitalize">{product.description}</p>
            <p className="color-primary capitalize">Rs. {product.price}</p>
            <div className="btn-group">
              <button
                onClick={() => handleEdit(product._id)}
                className="edit-button"
                title="Edit Product"
              >
                <span className="edit material-symbols-outlined">edit</span>
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="delete-button"
                title="Delete Product"
              >
                <span className="delete material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
