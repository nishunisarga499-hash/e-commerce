import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "../store/selectors.js";
import { formatPrice } from "../utils/format.js";

const FREE_SHIPPING_OVER = 100;
const SHIPPING_FEE = 9.99;

function CartSummary({ onCheckout, onClear }) {
  const totalItems = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartTotal);

  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const grandTotal = subtotal + shipping;

  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Order Summary</h2>
      <dl className="summary__rows">
        <div>
          <dt>Total items</dt>
          <dd>{totalItems}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="summary__total">
          <dt>Total price</dt>
          <dd>{formatPrice(grandTotal)}</dd>
        </div>
      </dl>

      {shipping > 0 && (
        <p className="muted summary__hint">
          Add {formatPrice(FREE_SHIPPING_OVER - subtotal)} more for free shipping.
        </p>
      )}

      <button className="btn btn--primary btn--block" onClick={onCheckout}>
        Checkout
      </button>
      <button className="btn btn--outline btn--block" onClick={onClear}>
        Clear cart
      </button>
    </aside>
  );
}

export default CartSummary;
