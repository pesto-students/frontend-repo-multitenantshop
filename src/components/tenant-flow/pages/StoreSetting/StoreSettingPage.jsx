import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { STORE_SETTING_CONFIG } from "../../../../utils/constants";
import { useGet } from "../../../../utils/useRequest";
import Loader from "../../../Loader";
import { setStore } from "../../store/features/storeSlice";
import API_PATHS from "../../tenantApiConfig";

const StoreSettingPage = () => {
  const { tenant } = useSelector((state) => state.auth);
  const { storeDetail } = useSelector((state) => state.store);
  console.log(storeDetail);
  const dispatch = useDispatch();
  const location = useLocation();

  const { tenant: profileData, isAuthenticated: profileLoading } = useSelector(
    (state) => state.auth
  );

  const {
    data: storeDetails,
    loading: storeDetailsLoading,
    error: storeDetailsError,
    executeApiCall: executeStoreDetailsApiCall,
  } = useGet();

  const {
    data: allProducts,
    loading: allProductsLoading,
    error: allProductsError,
    executeApiCall: executeAllProductsApiCall,
  } = useGet();

  useEffect(() => {
    getStoreDetails();
    getAllProducts();
  }, []);

  const getStoreDetails = async () => {
    const storeDetailApi = await executeStoreDetailsApiCall(
      API_PATHS.STORE_GET(tenant?.tenantId, storeDetail?.storeId)
    );

    if (storeDetailApi) {
      dispatch(setStore({ storeId: storeDetail?.storeId, storeDetail }));
    }
  };

  const getAllProducts = async () => {
    await executeAllProductsApiCall(
      API_PATHS.PRODUCT_GET_ALL(storeDetail?.storeId)
    );
  };

  if (!profileLoading || storeDetailsLoading || allProductsLoading) {
    return <Loader />;
  }

  if (storeDetailsError || allProductsError) {
    return (
      <h2 className="color-secondary poppins-semibold">
        Something went wrong! Please try after sometime
      </h2>
    );
  }

  return (
    <div>
      {storeDetails && allProducts ? (
        <main className="page store-setting-page">
          <aside className="side-nav">
            <NavLink
              to="profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {STORE_SETTING_CONFIG["profile-tab"]}
            </NavLink>
            <NavLink
              to="store-details"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {STORE_SETTING_CONFIG["store-details-tab"]}
            </NavLink>
            <NavLink
              to="store-products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {STORE_SETTING_CONFIG["products-tab"]}
            </NavLink>
          </aside>
          <Outlet context={{ tenant, storeDetails, allProducts }} />
        </main>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default StoreSettingPage;
