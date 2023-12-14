
import { createSlice } from '@reduxjs/toolkit';

const fetchApiSlice = createSlice({
  name: 'data',
  initialState: {
    categories: [],
    products: [],
    users: [],
    custlogin: {},
    loading: false,
    success: null,
    error: null,
    resetToken: null, // Add resetToken to the initial state
  },
  reducers: {
    educers: {
      getSubcategoriesSuccess: (state, action) => {
        state.subcategories = action.payload;
      },
    getDataSuccess: (state, action) => {
      state.categories = action.payload;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    loginSuccess: (state, action) => {
      state.custlogin = action.payload;
    },
    logout: (state) => {
      state.userlogin = {};
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
      state.resetToken = null; // Reset resetToken when initiating the request
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.resetToken = action.payload.updatedResetToken; // Set resetToken from the action payload
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.resetToken = null; // Reset resetToken on failure
    },
    // Add the new reducers here
    registerRequest: (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.resetToken = action.payload.verificationToken;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.resetToken = null;
    },
  },
}});

export const {
  getDataSuccess,
  getProductSuccess,
  getSubcategoriesSuccess,
  getUsersSuccess,
  loginSuccess,
  logout,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  // Export the new reducers
  registerRequest,
  registerSuccess,
  registerFailure,
} = fetchApiSlice.actions;

export default fetchApiSlice.reducer;
