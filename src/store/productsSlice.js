import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../services/productService.js";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProducts();
});

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  source: null, // "api" | "static"
  searchQuery: "",
  category: "all",
  sortBy: "default", // default | price-asc | price-desc | rating
  currentPage: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCategory(state, action) {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = "";
      state.category = "all";
      state.sortBy = "default";
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.source = action.payload.source;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong while loading products.";
      });
  },
});

export const { setSearchQuery, setCategory, setSortBy, setPage, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
