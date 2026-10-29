import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductsState from "../components/ProductsState.jsx";
import { clearFilters, setCategory } from "../store/productsSlice.js";
import { selectCategories, selectFeaturedProducts } from "../store/selectors.js";
import { formatCategory } from "../utils/format.js";

const PERKS = [
  { icon: "🚚", title: "Free shipping", text: "On all orders over $100" },
  { icon: "↩️", title: "Easy returns", text: "30-day hassle-free returns" },
  { icon: "🔒", title: "Secure checkout", text: "Your data stays protected" },
  { icon: "💬", title: "24/7 support", text: "We're here whenever you need us" },
];

function FeaturedSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const featured = useSelector(selectFeaturedProducts);
  const categories = useSelector(selectCategories);

  const browseCategory = (category) => {
    dispatch(setCategory(category));
    navigate("/products");
  };

  return (
    <>
      <section className="section container" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="section__title">Shop by category</h2>
        <div className="category-list">
          {categories.map((category) => (
            <button key={category} className="category-pill" onClick={() => browseCategory(category)}>
              {formatCategory(category)}
            </button>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="featured-heading">
        <div className="section__head">
          <h2 id="featured-heading" className="section__title">Featured products</h2>
          <Link to="/products" className="link">View all →</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}

function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="chip chip--light">New season sale</span>
            <h1>Everything you love, all in one place.</h1>
            <p>
              Discover top-rated phones, laptops, fragrances, furniture and more. Great prices and fast delivery on
              thousands of products.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--light btn--lg" onClick={() => dispatch(clearFilters())}>
                Shop now
              </Link>
              <Link to="/register" className="btn btn--ghost-light btn--lg">
                Create account
              </Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">🛍️</div>
        </div>
      </section>

      <section className="container perks" aria-label="Store benefits">
        {PERKS.map((perk) => (
          <div key={perk.title} className="perk">
            <span className="perk__icon" aria-hidden="true">{perk.icon}</span>
            <div>
              <strong>{perk.title}</strong>
              <p className="muted">{perk.text}</p>
            </div>
          </div>
        ))}
      </section>

      <ProductsState>
        <FeaturedSection />
      </ProductsState>
    </>
  );
}

export default Home;
