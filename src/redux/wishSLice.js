import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.wishList.push(action.payload);
    },

    deleteWishItem: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item._id !== action.payload
      );
    },
    resetList: (state) => {
      state.wishList = [];
    },
  },
});

export const { addToList, deleteWishItem, resetList } = wishSlice.actions;
export default wishSlice.reducer;
