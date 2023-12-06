import { createSlice } from '@reduxjs/toolkit';

export const fetchApiSlice = createSlice({
  name: 'data',
  initialState: {
    products: [],
    subcategories: [],
  },
  reducers: {
    getProductSuccess: (state, action) => {
      state.products = action.payload;
    },
    getSubcategoriesSuccess: (state, action) => {
      state.subcategories = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const  {getProductSuccess,getSubcategoriesSuccess}  = fetchApiSlice.actions

export default fetchApiSlice.reducer