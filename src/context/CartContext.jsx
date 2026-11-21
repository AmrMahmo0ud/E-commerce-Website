'use client'

import { createContext, useContext, useSyncExternalStore } from "react";

// The design caps every quantity stepper at 10.
export const MAX_QUANTITY = 10;

const STORAGE_KEY = "white-friday-cart";
const EMPTY_CART = [];

function clampQuantity(quantity) {
  return Math.min(MAX_QUANTITY, quantity);
}

// The cart lives in localStorage so it survives reloads and stays in sync across tabs.
// React reads it through useSyncExternalStore: the server (and the first client render)
// sees an empty cart, then the saved one, which avoids hydration mismatches.
const cartStore = {
  items: null,
  listeners: new Set(),

  read() {
    if (this.items === null) {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        this.items = Array.isArray(saved)
          ? saved.filter((i) => i && i.id != null && Number.isFinite(i.price) && i.quantity > 0)
          : EMPTY_CART;
      } catch {
        this.items = EMPTY_CART;
      }
    }
    return this.items;
  },

  write(items) {
    this.items = items;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or blocked (private mode): the cart still works for this visit.
    }
    this.listeners.forEach((listener) => listener());
  },

  update(updater) {
    this.write(updater(this.read()));
  },

  subscribe(listener) {
    cartStore.listeners.add(listener);
    function onStorage(event) {
      if (event.key !== STORAGE_KEY) return;
      cartStore.items = null; // another tab changed the cart: re-read it
      listener();
    }
    window.addEventListener("storage", onStorage);
    return () => {
      cartStore.listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
};

const subscribeNoop = () => () => {};

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    () => cartStore.read(),
    () => EMPTY_CART
  );
  // false on the server and during hydration, true once the saved cart has been read.
  const isLoaded = useSyncExternalStore(subscribeNoop, () => true, () => false);

  function addToCart(product, quantity = 1) {
    cartStore.update((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: clampQuantity(i.quantity + quantity) } : i
        );
      }
      return [...prev, { ...product, quantity: clampQuantity(quantity) }];
    });
  }

  function removeFromCart(id) {
    cartStore.update((prev) => prev.filter((i) => i.id !== id));
  }

  // Going below 1 removes the item.
  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    cartStore.update((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: clampQuantity(quantity) } : i))
    );
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isLoaded, addToCart, removeFromCart, updateQuantity, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
