import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.js";
import cartReducer from "./cartSlice.js";
import wishlistReducer from "./wishlistSlice.js";
import themeReducer from "./themeSlice.js";
import authReducer from "./authSlice.js";
import { saveState } from "./persist.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

// Persist cart, wishlist, theme and user whenever they change.
let previous = {};
store.subscribe(() => {
  const { cart, wishlist, theme, auth } = store.getState();
  if (cart.items !== previous.cart) saveState("cart", cart.items);
  if (wishlist.ids !== previous.wishlist) saveState("wishlist", wishlist.ids);
  if (theme.mode !== previous.theme) saveState("theme", theme.mode);
  if (auth.user !== previous.user) saveState("user", auth.user);
  previous = { cart: cart.items, wishlist: wishlist.ids, theme: theme.mode, user: auth.user };
});
