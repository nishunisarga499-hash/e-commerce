import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./persist.js";

// Authentication UI only (no real backend): we just remember a display user.
const authSlice = createSlice({
  name: "auth",
  initialState: { user: loadState("user", null) },
  reducers: {
    login(state, action) {
      state.user = action.payload; // { name, email }
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
