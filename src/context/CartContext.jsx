/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { localDb } from "../lib/localDb";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "load":
      return action.items;
    case "add": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing)
        return state.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        );
      return [...state, { ...action.product, quantity: action.quantity }];
    }
    case "update":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item,
      );
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const saved = localDb.getCart(user?.id);
    const guest = user ? localDb.getCart() : [];
    const merged = [...saved];
    guest.forEach((guestItem) => {
      const existing = merged.find((item) => item.id === guestItem.id);
      if (existing) existing.quantity += guestItem.quantity;
      else merged.push(guestItem);
    });
    dispatch({ type: "load", items: merged });
    if (user && guest.length) localDb.saveCart(user.id, merged);
  }, [user]);
  useEffect(() => {
    localDb.saveCart(user?.id, items);
  }, [items, user]);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const value = {
    items,
    subtotal,
    count,
    addItem: (product, quantity = 1) =>
      dispatch({ type: "add", product, quantity }),
    updateQuantity: (id, quantity) =>
      dispatch({ type: "update", id, quantity }),
    removeItem: (id) => dispatch({ type: "remove", id }),
    clearCart: () => dispatch({ type: "clear" }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
