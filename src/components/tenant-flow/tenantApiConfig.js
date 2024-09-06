// const API_BASE_URL = "https://backend-repo-multitenantshop.onrender.com/api";
const API_BASE_URL = "http://localhost:3000/api";

const API_PATHS = {
  TENANT_REGISTER: `${API_BASE_URL}/tenants/registerTenant`,
  TENANT_LOGIN: `${API_BASE_URL}/tenants/login`,
  TENANT_LOGOUT: `${API_BASE_URL}/tenants/logout`,
  STORE_ADD: (tenantId) => `${API_BASE_URL}/stores/${tenantId}/store/add`,
  STORE_GET: (tenantId, storeId) =>
    `${API_BASE_URL}/stores/${tenantId}/store/${storeId}`,
  STORE_MODIFY: (tenantId, storeId) =>
    `${API_BASE_URL}/stores/${tenantId}/store/${storeId}`,
  STORE_DELETE: (tenantId, storeId) =>
    `${API_BASE_URL}/stores/${tenantId}/store/${storeId}`,
  PRODUCT_ADD: (tenantId, storeId) =>
    `${API_BASE_URL}/products/${tenantId}/${storeId}/add`,
  PRODUCT_GET_ONE: (storeId, productId) =>
    `${API_BASE_URL}/products/${storeId}/${productId}`,
  PRODUCT_DELETE_ONE: (productId) => `${API_BASE_URL}/products/${productId}`,
  PRODUCT_UPDATE: (storeId, productId) =>
    `${API_BASE_URL}/products/${storeId}/${productId}`,
  PRODUCT_GET_ALL: (storeId) =>
    `${API_BASE_URL}/products/${storeId}/allProducts`,
};

export default API_PATHS;
