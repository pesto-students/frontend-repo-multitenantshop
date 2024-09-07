import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import storeReducer from "./features/storeSlice";

export const tenantStore = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
  },
});
