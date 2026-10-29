import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./persist.js";

const getInitialMode = () => {
  const saved = loadState("theme", null);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialMode() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
