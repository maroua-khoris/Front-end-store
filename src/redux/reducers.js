import { createSlice } from '@reduxjs/toolkit';

export const fetchApiSlice = createSlice({
  name: 'data',
  initialState: {
    products: {},
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const  {getProducts}  = fetchApiSlice.actions

export default fetchApiSlice.reducer