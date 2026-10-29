import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { logout } from "../store/authSlice.js";
import { selectCartCount, selectUser, selectWishlistIds } from "../store/selectors.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistIds).length;
  const user = useSelector(selectUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  const linkClass = ({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`;

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={closeMenu}>
          <span className="nav__logo" aria-hidden="true">S</span>
          ShopSphere
        </Link>

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav__menu ${menuOpen ? "nav__menu--open" : ""}`}>
          <SearchBar onSearch={closeMenu} />

          <nav className="nav__links" aria-label="Main navigation">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/products" className={linkClass} onClick={closeMenu}>
              Products
            </NavLink>
            <NavLink to="/wishlist" className={linkClass} onClick={closeMenu}>
              Wishlist
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </NavLink>
            <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
              Cart
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </NavLink>
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            {user ? (
              <>
                <span className="nav__user">Hi, {user.name.split(" ")[0]}</span>
                <button className="btn btn--outline btn--sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn--primary btn--sm" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
