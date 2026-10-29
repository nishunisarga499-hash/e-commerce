import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./persist.js";

// Each cart item: { id, title, price, thumbnail, category, stock, quantity }
const initialState = {
  items: loadState("cart", []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      const maxQty = product.stock > 0 ? product.stock : Infinity;

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, maxQty);
      } else {
        const { id, title, price, thumbnail, category, stock } = product;
        state.items.push({ id, title, price, thumbnail, category, stock, quantity: Math.min(quantity, maxQty) });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item && (item.stock <= 0 || item.quantity < item.stock)) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
