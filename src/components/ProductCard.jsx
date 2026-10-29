import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./Rating.jsx";
import WishlistButton from "./WishlistButton.jsx";
import { addToCart } from "../store/cartSlice.js";
import { formatCategory, formatPrice } from "../utils/format.js";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, title, price, category, rating, thumbnail, stock } = product;
  const outOfStock = stock <= 0;

  return (
    <article className="card">
      <div className="card__media">
        <Link to={`/products/${id}`} aria-label={`View ${title}`}>
          <img src={thumbnail} alt={title} loading="lazy" className="card__img" />
        </Link>
        <WishlistButton productId={id} className="card__wish" />
      </div>

      <div className="card__body">
        <span className="chip">{formatCategory(category)}</span>
        <h3 className="card__title">
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>
        <Rating value={rating} />
        <div className="card__footer">
          <span className="price">{formatPrice(price)}</span>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => dispatch(addToCart({ product }))}
            disabled={outOfStock}
          >
            {outOfStock ? "Sold out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
