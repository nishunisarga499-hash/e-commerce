import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice.js";
import { selectWishlistIds } from "../store/selectors.js";

function WishlistButton({ productId, className = "" }) {
  const dispatch = useDispatch();
  const isWished = useSelector(selectWishlistIds).includes(productId);

  const handleClick = (event) => {
    event.preventDefault(); // allow use inside a clickable card
    event.stopPropagation();
    dispatch(toggleWishlist(productId));
  };

  return (
    <button
      className={`icon-btn wish-btn ${isWished ? "wish-btn--active" : ""} ${className}`}
      onClick={handleClick}
      aria-pressed={isWished}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWished ? "♥" : "♡"}
    </button>
  );
}

export default WishlistButton;
