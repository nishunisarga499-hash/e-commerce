import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../store/cartSlice.js";
import { formatCategory, formatPrice } from "../utils/format.js";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, title, price, thumbnail, category, quantity, stock } = item;
  const atMax = stock > 0 && quantity >= stock;

  return (
    <li className="cart-item">
      <Link to={`/products/${id}`} className="cart-item__img">
        <img src={thumbnail} alt={title} />
      </Link>

      <div className="cart-item__info">
        <Link to={`/products/${id}`} className="cart-item__title">
          {title}
        </Link>
        <span className="muted">{formatCategory(category)}</span>
        <span className="muted">{formatPrice(price)} each</span>
      </div>

      <div className="qty" role="group" aria-label={`Quantity for ${title}`}>
        <button onClick={() => dispatch(decreaseQuantity(id))} disabled={quantity <= 1} aria-label="Decrease quantity">
          −
        </button>
        <span aria-live="polite">{quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(id))} disabled={atMax} aria-label="Increase quantity">
          +
        </button>
      </div>

      <strong className="cart-item__total">{formatPrice(price * quantity)}</strong>

      <button className="btn btn--danger btn--sm" onClick={() => dispatch(removeFromCart(id))}>
        Remove
      </button>
    </li>
  );
}

export default CartItem;
