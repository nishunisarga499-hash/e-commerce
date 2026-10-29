import fallbackProducts from "../data/products.json";
import { buildPlaceholder } from "../utils/placeholder.js";

// Primary data source: DummyJSON API.
// If the network request fails, the app falls back to the bundled static JSON.
const API_URL =
  "https://dummyjson.com/products?limit=100&select=title,description,category,price,rating,stock,brand,thumbnail,images";
const REQUEST_TIMEOUT_MS = 8000;

// Make API items and static items share the same shape.
const normalizeApiProduct = ({ id, title, description, category, price, rating, stock, brand, thumbnail, images }) => ({
  id,
  title,
  description,
  category,
  price,
  rating,
  stock: stock ?? 0,
  brand: brand ?? "",
  thumbnail,
  images: images?.length ? images : [thumbnail],
});

const normalizeStaticProduct = (product) => {
  const images = [0, 1, 2].map((variant) => buildPlaceholder(product.title, product.id, variant));
  return { ...product, thumbnail: images[0], images };
};

const fetchFromApi = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    return data.products.map(normalizeApiProduct);
  } finally {
    clearTimeout(timer);
  }
};

// Returns { products, source } where source is "api" or "static".
export const getProducts = async () => {
  try {
    const products = await fetchFromApi();
    return { products, source: "api" };
  } catch (error) {
    console.warn("API unavailable, using bundled product data:", error.message);
    return { products: fallbackProducts.map(normalizeStaticProduct), source: "static" };
  }
};
