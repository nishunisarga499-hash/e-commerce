// Small helpers for saving/loading slices of state in localStorage.
const PREFIX = "shopsphere:";

export const loadState = (key, fallback) => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const saveState = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full - ignore.
  }
};
