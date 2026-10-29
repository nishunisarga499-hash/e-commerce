import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./persist.js";

// Stores product ids only; full product data is looked up from the products slice.
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: loadState("wishlist", []) },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id) ? state.ids.filter((itemId) => itemId !== id) : [...state.ids, id];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
