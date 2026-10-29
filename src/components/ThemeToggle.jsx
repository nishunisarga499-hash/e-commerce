import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice.js";
import { selectThemeMode } from "../store/selectors.js";

function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const isDark = mode === "dark";

  return (
    <button
      className="icon-btn"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
