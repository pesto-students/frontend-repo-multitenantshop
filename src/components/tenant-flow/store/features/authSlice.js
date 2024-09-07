import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    tenant: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.tenant = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.tenant = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
