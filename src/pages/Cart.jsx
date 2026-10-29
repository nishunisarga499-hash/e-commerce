import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem.jsx";
import CartSummary from "../components/CartSummary.jsx";
import { clearCart } from "../store/cartSlice.js";
import { selectCartItems } from "../store/selectors.js";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced && items.length === 0) {
    return (
      <div className="container page">
        <div className="state-box state-box--success">
          <h2>🎉 Order placed!</h2>
          <p>Thank you for shopping with us. This is a demo, so no real order was created.</p>
          <Link to="/products" className="btn btn--primary" onClick={() => setOrderPlaced(false)}>
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container page">
        <div className="state-box">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn--primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page__title">Shopping Cart</h1>
      <div className="cart">
        <ul className="cart__list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
        <CartSummary onCheckout={handleCheckout} onClear={() => dispatch(clearCart())} />
      </div>
    </div>
  );
}

export default Cart;
