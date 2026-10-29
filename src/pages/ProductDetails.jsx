import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage.jsx";
import ImageGallery from "../components/ImageGallery.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductsState from "../components/ProductsState.jsx";
import Rating from "../components/Rating.jsx";
import WishlistButton from "../components/WishlistButton.jsx";
import { addToCart } from "../store/cartSlice.js";
import { selectAllProducts, selectCartQuantityById, selectProductById } from "../store/selectors.js";
import { formatCategory, formatPrice } from "../utils/format.js";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => selectProductById(state, id));
  const allProducts = useSelector(selectAllProducts);
  const inCart = useSelector((state) => selectCartQuantityById(state, Number(id)));
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <ErrorMessage
        title="Product not found"
        message="The product you are looking for does not exist or is no longer available."
        onRetry={() => navigate("/products")}
      />
    );
  }

  const { title, description, price, category, rating, stock, brand, images } = product;
  const outOfStock = stock <= 0;
  const maxQuantity = outOfStock ? 0 : stock;
  const related = allProducts.filter((item) => item.category === category && item.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{title}</span>
      </nav>

      <div className="details">
        <ImageGallery images={images} title={title} />

        <div className="details__info">
          <span className="chip">{formatCategory(category)}</span>
          <h1>{title}</h1>
          {brand && <p className="muted">by {brand}</p>}
          <Rating value={rating} />

          <p className="details__price">{formatPrice(price)}</p>
          <p className="details__desc">{description}</p>

          <p className={outOfStock ? "stock stock--out" : stock <= 10 ? "stock stock--low" : "stock"}>
            {outOfStock ? "Out of stock" : stock <= 10 ? `Only ${stock} left in stock` : "In stock"}
          </p>

          <div className="details__buy">
            <div className="qty" role="group" aria-label="Choose quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} disabled={quantity >= maxQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button className="btn btn--primary btn--lg" onClick={handleAdd} disabled={outOfStock}>
              {justAdded ? "✓ Added to cart" : "Add to Cart"}
            </button>
            <WishlistButton productId={product.id} />
          </div>

          {inCart > 0 && (
            <p className="muted">
              {inCart} in your cart. <Link to="/cart" className="link">Go to cart →</Link>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-heading">
          <h2 id="related-heading" className="section__title">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}

function ProductDetails() {
  return (
    <div className="container page">
      <ProductsState>
        <Details />
      </ProductsState>
    </div>
  );
}

export default ProductDetails;
