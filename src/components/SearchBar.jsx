import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../store/productsSlice.js";
import { selectSearchQuery } from "../store/selectors.js";

// Search products by name. Typing updates the Redux store; the user is taken
// to the product listing so the results are visible.
function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useSelector(selectSearchQuery);

  const handleChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
    if (pathname !== "/products") navigate("/products");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pathname !== "/products") navigate("/products");
    onSearch?.();
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        className="input search__input"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        aria-label="Search products by name"
      />
    </form>
  );
}

export default SearchBar;
