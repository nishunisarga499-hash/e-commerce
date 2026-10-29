import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import { fetchProducts } from "../store/productsSlice.js";
import { selectProductsError, selectProductsStatus } from "../store/selectors.js";

// Handles the loading and error states for anything that needs the catalogue.
// Renders children only once the products have been loaded.
function ProductsState({ children }) {
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  if (status === "idle" || status === "loading") return <Loader message="Loading products..." />;

  if (status === "failed") {
    return (
      <ErrorMessage
        title="Could not load products"
        message={error}
        onRetry={() => dispatch(fetchProducts())}
      />
    );
  }

  return children;
}

export default ProductsState;
