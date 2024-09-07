import axios from "axios";
import React, { useEffect, useState } from "react";
import API_PATHS from "../../../tenantApiConfig";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, setStore } from "../../../store/features/storeSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDelete } from "../../../../../utils/useRequest";
import { notifySuccess } from "../../../../../utils/utils";
import Loader from "../../../../Loader";
import { logout } from "../../../store/features/authSlice";

const StoreDetails = () => {
  const { tenant } = useSelector((state) => state.auth);
  const { storeDetails } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, data, executeApiCall } = useDelete();

  const handleStoreEdit = () => {
    navigate(`/store/edit/${storeDetails.storeId}`);
  };

  const handleStoreDelete = async () => {
    const response = await executeApiCall(
      API_PATHS.STORE_DELETE(tenant?.tenantId, tenant?.storeId)
    );
    if (response) {
      notifySuccess(response?.message);
      dispatch(clearStore());
      dispatch(logout());
      navigate("/login");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="info-container">
      <div className="info-group">
        <span className="color-secondary label">Name:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.name}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">URL:</span>
        <a
          href={`https://www.${storeDetails?.subdomain}`}
          target="_blank"
          className="capitalize color-primary value poppins-semibold"
        >
          {storeDetails?.subdomain}
        </a>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Description:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.description}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Address:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.address}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Return policy:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.returnPolicy}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Shipping policy:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.shippingPolicy}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Owner:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {tenant?.username}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Theme:</span>
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.theme?.primaryColor} &{" "}
          {storeDetails?.theme?.secondaryColor}
        </span>
      </div>

      <div className="btn-group">
        <button onClick={handleStoreEdit} className="btn btn-primary-outline">
          Edit
        </button>
        <button onClick={handleStoreDelete} className="btn btn-danger-outline">
          Delete
        </button>
      </div>
    </section>
  );
};

export default StoreDetails;
