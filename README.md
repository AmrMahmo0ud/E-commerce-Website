# White Friday

A small online store built with Next.js: a product catalog with category filtering, product detail pages, and a shopping cart that is saved in the browser.

## Features

- Home page with featured products, categories and top-rated picks
- Product catalog at `/products` with search, category and price filters, and sorting
- Product detail pages with a quantity picker and related products
- Cart with quantity controls and an order summary
- Cart saved to `localStorage`, so it survives page reloads and stays in sync across tabs
- Responsive layout for mobile and desktop, with keyboard and screen-reader support

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- React 19
- Tailwind CSS 4
- [lucide-react](https://lucide.dev) and [react-icons](https://react-icons.github.io/react-icons/) for icons

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/                  Routes: /, /products, /products/[id], /cart
├── components/
│   ├── cart/             Cart rows, list, summary, add-to-cart button
│   ├── home/             Home page sections
│   ├── layout/           Navbar and footer
│   ├── filters/          Search, category, price and sort controls
│   ├── products/         Product card, grid, details
│   └── ui/               Shared UI pieces
├── context/CartContext.jsx   Cart state, saved to localStorage
├── data/products.json        Mock product data
├── lib/                      Filtering logic, price formatting, category colors
└── services/productService.js  The only place that reads product data
```

Pages never import `products.json` directly; they go through `productService`. When a real backend is added, only that file needs to change. `.env.example` shows the API URL variable it will use.

## Roadmap

- Checkout flow
- Backend API (FastAPI + PostgreSQL)
