import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../components/FilterBar.jsx";
import Pagination from "../components/Pagination.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductsState from "../components/ProductsState.jsx";
import { clearFilters, setPage } from "../store/productsSlice.js";
import {
  selectCurrentPage,
  selectFilteredProducts,
  selectPaginatedProducts,
  selectProductsSource,
  selectSearchQuery,
  selectTotalPages,
} from "../store/selectors.js";

function ProductListing() {
  const dispatch = useDispatch();
  const products = useSelector(selectPaginatedProducts);
  const totalFound = useSelector(selectFilteredProducts).length;
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const query = useSelector(selectSearchQuery);
  const source = useSelector(selectProductsSource);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {source === "static" && (
        <p className="notice" role="status">
          Live product API is unreachable, so you are viewing the built-in sample catalogue.
        </p>
      )}

      <FilterBar />

      <p className="muted results-count" aria-live="polite">
        {totalFound} product{totalFound === 1 ? "" : "s"} found
        {query.trim() && <> for "{query.trim()}"</>}
      </p>

      {products.length === 0 ? (
        <div className="state-box">
          <h2>No products found</h2>
          <p>Try a different search term or category.</p>
          <button className="btn btn--primary" onClick={() => dispatch(clearFilters())}>
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}

function Products() {
  return (
    <div className="container page">
      <h1 className="page__title">All Products</h1>
      <ProductsState>
        <ProductListing />
      </ProductsState>
    </div>
  );
}

export default Products;
