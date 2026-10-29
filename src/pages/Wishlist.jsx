import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductsState from "../components/ProductsState.jsx";
import { selectWishlistProducts } from "../store/selectors.js";

function WishlistItems() {
  const products = useSelector(selectWishlistProducts);

  if (products.length === 0) {
    return (
      <div className="state-box">
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here for later.</p>
        <Link to="/products" className="btn btn--primary">
          Browse products
        </Link>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}

function Wishlist() {
  return (
    <div className="container page">
      <h1 className="page__title">My Wishlist</h1>
      <ProductsState>
        <WishlistItems />
      </ProductsState>
    </div>
  );
}

export default Wishlist;
