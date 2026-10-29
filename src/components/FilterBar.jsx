import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setCategory, setSortBy } from "../store/productsSlice.js";
import { selectCategories, selectCategory, selectSearchQuery, selectSortBy } from "../store/selectors.js";
import { formatCategory } from "../utils/format.js";

function FilterBar() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory);
  const sortBy = useSelector(selectSortBy);
  const query = useSelector(selectSearchQuery);

  const hasActiveFilters = category !== "all" || sortBy !== "default" || query !== "";

  return (
    <div className="filters">
      <label className="filters__field">
        <span>Category</span>
        <select className="input" value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
          <option value="all">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {formatCategory(name)}
            </option>
          ))}
        </select>
      </label>

      <label className="filters__field">
        <span>Sort by</span>
        <select className="input" value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </label>

      {hasActiveFilters && (
        <button className="btn btn--outline" onClick={() => dispatch(clearFilters())}>
          Clear filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
