import axios from "axios";
import React, { useEffect, useState } from "react";
import API_PATHS from "../../../tenantApiConfig";
import { useDispatch, useSelector } from "react-redux";
import { setStore } from "../../../store/features/storeSlice";
import { useOutletContext } from "react-router-dom";

const StoreDetails = () => {
  const { tenant } = useSelector((state) => state.auth);
  const { storeDetails } = useOutletContext();

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
        <span className="capitalize color-primary value poppins-semibold">
          {storeDetails?.subdomain}
        </span>
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
        <button className="btn btn-primary-outline">Edit</button>
        <button className="btn btn-danger-outline">Delete</button>
      </div>
    </section>
  );
};

export default StoreDetails;
