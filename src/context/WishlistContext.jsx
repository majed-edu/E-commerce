/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { localDb } from "../lib/localDb";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);
function reducer(state, action) {
  if (action.type === "load") return action.items;
  if (action.type === "toggle")
    return state.some((item) => item.id === action.product.id)
      ? state.filter((item) => item.id !== action.product.id)
      : [...state, action.product];
  if (action.type === "remove")
    return state.filter((item) => item.id !== action.id);
  return state;
}

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, dispatch] = useReducer(reducer, []);
  useEffect(
    () =>
      dispatch({
        type: "load",
        items: user ? localDb.getWishlist(user.id) : [],
      }),
    [user],
  );
  useEffect(() => {
    if (user) localDb.saveWishlist(user.id, items);
  }, [items, user]);
  const value = {
    items,
    isWishlisted: (id) => items.some((item) => item.id === id),
    toggle: (product) => dispatch({ type: "toggle", product }),
    remove: (id) => dispatch({ type: "remove", id }),
  };
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
