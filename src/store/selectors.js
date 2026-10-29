import { createSelector } from "@reduxjs/toolkit";

// ---------- Products ----------
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsSource = (state) => state.products.source;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectCategory = (state) => state.products.category;
export const selectSortBy = (state) => state.products.sortBy;
export const selectCurrentPage = (state) => state.products.currentPage;

export const PAGE_SIZE = 12;

export const selectProductById = (state, id) =>
  state.products.items.find((product) => product.id === Number(id));

export const selectCategories = createSelector([selectAllProducts], (products) =>
  [...new Set(products.map((product) => product.category))].sort()
);

export const selectFeaturedProducts = createSelector([selectAllProducts], (products) =>
  [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
);

// Search + category filter + sort, all derived from state.
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchQuery, selectCategory, selectSortBy],
  (products, query, category, sortBy) => {
    const term = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch = !term || product.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }
);

export const selectTotalPages = createSelector([selectFilteredProducts], (products) =>
  Math.max(1, Math.ceil(products.length / PAGE_SIZE))
);

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectCurrentPage],
  (products, page) => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
);

// ---------- Cart ----------
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectCartQuantityById = (state, id) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

// ---------- Wishlist ----------
export const selectWishlistIds = (state) => state.wishlist.ids;

export const selectWishlistProducts = createSelector([selectAllProducts, selectWishlistIds], (products, ids) =>
  products.filter((product) => ids.includes(product.id))
);

// ---------- Theme & auth ----------
export const selectThemeMode = (state) => state.theme.mode;
export const selectUser = (state) => state.auth.user;
