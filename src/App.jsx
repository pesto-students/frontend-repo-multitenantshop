import { Provider } from "react-redux";
import Layout from "./components/tenant-flow/Layout";
import log from "loglevel";
// import Layout from "./components/user-flow/Layout";

log.setLevel("info");

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Tenant Components Import
import AddProducts from "./components/tenant-flow/pages/AddProducts";
import Landing from "./components/tenant-flow/pages/Landing";
import Login from "./components/tenant-flow/pages/Login";
import PrivateRoute from "./components/tenant-flow/pages/PrivateRoute";
import Register from "./components/tenant-flow/pages/Register";
import StoreSettingPage from "./components/tenant-flow/pages/StoreSetting/StoreSettingPage";
import Products from "./components/tenant-flow/pages/StoreSetting/components/Products";
import Profile from "./components/tenant-flow/pages/StoreSetting/components/Profile";
import StoreDetails from "./components/tenant-flow/pages/StoreSetting/components/StoreDetails";
import StoreSetup from "./components/tenant-flow/pages/StoreSetup";
import { tenantStore } from "./components/tenant-flow/store/tenantStore";
import EditProducts from "./components/tenant-flow/pages/EditProduct";

// Routes for main domain
const mainDomainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "store/register",
        element: (
          <PrivateRoute>
            <StoreSetup />
          </PrivateRoute>
        ),
      },
      {
        path: "store/products/edit/:productId",
        element: (
          <PrivateRoute>
            <EditProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "store/products/add",
        element: (
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <StoreSettingPage />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" /> },
          { path: "profile", element: <Profile /> },
          { path: "store-details", element: <StoreDetails /> },
          { path: "store-products", element: <Products /> },
        ],
      },
    ],
  },
]);

function App() {
  // Detect the current hostname
  const hostname = window.location.hostname;

  // Determine if we're on the main domain or a custom subdomain
  console.log(hostname);
  const isMainDomain = hostname === "localhost";

  return (
    <div className="main-container">
      <Provider store={tenantStore}>
        <RouterProvider router={mainDomainRoutes} />
        {/* <RouterProvider router={isMainDomain ? mainDomainRoutes : subdomainRoutes} /> */}
      </Provider>
    </div>
  );
}

export default App;
