import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "auth",
  initialState: {
    hasStore: false,
    storeId: null,
    storeDetail: null,
  },
  reducers: {
    setStore: (state, action) => {
      state.hasStore = true;
      state.storeId = action.payload.storeId;
      state.storeDetail = action.payload.storeDetail;
    },
    clearStore: (state) => {
      state.hasStore = false;
      state.storeId = null;
      state.storeDetail = null;
    },
  },
});

export const { setStore, clearStore } = storeSlice.actions;
export default storeSlice.reducer;
