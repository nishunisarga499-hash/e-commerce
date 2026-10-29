# ShopSphere – E-commerce Frontend (React + Redux Toolkit)

**Web Development – Week 05 Minor Project**
Topic: *E-commerce Frontend with Redux/Context*

## Project Overview

ShopSphere is a responsive e-commerce frontend that simulates a real online
shopping experience. Visitors can browse products, search, filter and sort them,
view product details with an image gallery, manage a shopping cart, save items to
a wishlist, and switch between light and dark themes.

Global state is managed with **Redux Toolkit**, and navigation uses **React Router**.
Product data comes from the **DummyJSON API**, with an automatic fallback to bundled
static JSON if the API is unreachable (so the app always works offline).

## Features Implemented

### Required
| Area | What's included |
| --- | --- |
| **Home page** | Hero landing section, store perks, shop-by-category pills, featured products (top rated), navigation menu, search bar |
| **Product listing** | Responsive grid with image, name, price, category and star rating |
| **Product details** | Image gallery with thumbnails, description, price, stock status, quantity picker, Add to Cart, related products |
| **Shopping cart** | Add, remove, increase/decrease quantity (capped by stock), total items, total price, shipping calculation, clear cart, demo checkout |
| **State management** | Redux Toolkit store for products, cart, quantities and totals |
| **Search & filter** | Search by name, filter by category, sort by price / rating |
| **Responsive design** | Mobile, tablet and desktop layouts (collapsing nav, adaptive grids) |
| **Loading & error states** | Spinner while loading, error box with *Try again*, empty states, 404 page, "product not found" |

### Bonus
- **Wishlist** – heart button on every product, dedicated Wishlist page
- **Dark mode** – toggle in the navbar, respects system preference, remembered
- **Pagination** – 12 products per page
- **Authentication UI** – Login and Register pages with form validation (UI only, no backend)
- **Persistent cart** – cart, wishlist, theme and user are saved in Local Storage

## Technologies Used

- React 18 (functional components + hooks)
- Redux Toolkit and React-Redux
- React Router v6
- Vite 5
- Plain CSS (CSS variables, Grid, Flexbox, media queries)
- DummyJSON API (with static JSON fallback)

## React & State Management Concepts Demonstrated

| Concept | Where |
| --- | --- |
| Functional components, props, reusability | `src/components/*` (`ProductCard`, `ProductGrid`, `Rating`, `WishlistButton`, `Loader`, `ErrorMessage` are reused across pages) |
| `useState` | `Navbar`, `ProductDetails`, `ImageGallery`, `AuthForm`, `Cart` |
| `useEffect` | `App.jsx` (fetch catalogue, apply theme), `ScrollToTop.jsx` |
| Conditional rendering | loading/error/empty states, stock labels, logged-in vs logged-out navbar |
| Event handling | search input, selects, quantity buttons, forms, menu toggle |
| Routing (React Router) | `App.jsx` – routes, dynamic `/products/:id`, `NavLink`, `useParams`, `useNavigate`, 404 route |
| **Store configuration** | `src/store/store.js` (`configureStore`) |
| **Slices / actions / reducers** | `productsSlice`, `cartSlice`, `wishlistSlice`, `themeSlice`, `authSlice` |
| **Async thunk** | `fetchProducts` in `productsSlice.js` (`createAsyncThunk`) |
| **Dispatch** | `useDispatch` in components |
| **Selectors** | `src/store/selectors.js` (memoized with `createSelector`: filtering, sorting, pagination, cart totals) |

## Folder Structure

```
ecommerce-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # entry: Provider + BrowserRouter
    ├── App.jsx                   # layout + routes
    ├── index.css                 # design tokens, light/dark themes, base styles
    ├── App.css                   # component and page styles
    ├── assets/                   # favicon
    ├── components/               # reusable UI (Navbar, ProductCard, FilterBar, ...)
    ├── pages/                    # Home, Products, ProductDetails, Cart, Wishlist, Login, Register, NotFound
    ├── store/                    # Redux Toolkit store, slices, selectors, persistence
    ├── services/
    │   └── productService.js     # API call + fallback to static data
    ├── data/
    │   └── products.json         # static fallback catalogue
    └── utils/                    # price/category formatting, placeholder images
```

## Setup Instructions

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# open the URL shown (usually http://localhost:5173)

# 3. Create a production build
npm run build

# 4. Preview the production build
npm run preview
```

## How It Works

1. On startup `App.jsx` dispatches `fetchProducts()`.
2. `productService.js` requests products from DummyJSON (8 s timeout). If the request
   fails, it loads `data/products.json` instead and the product page shows a small notice.
3. Components read state with selectors. For example, the product list uses
   `selectPaginatedProducts`, which is derived from search text, category, sort order and page.
4. Cart, wishlist, theme and the logged-in user are written to Local Storage by a
   `store.subscribe` listener and restored when the store is created.

## Notes

- Login/Register are UI-only: any valid email and a password of 6+ characters will "log in".
- Checkout is a demo – it clears the cart and shows a confirmation; no payment is processed.

## Screenshots

_Add screenshots of the Home, Products, Product Details, Cart and dark mode views here._
