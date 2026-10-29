import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>ShopSphere</strong>
          <p className="muted">A demo e-commerce frontend built with React, Redux Toolkit and React Router.</p>
        </div>
        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} ShopSphere. Demo project - no real orders are placed.</p>
    </footer>
  );
}

export default Footer;
