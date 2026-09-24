const KEYS = { users: "store_users", session: "store_session", guestCart: "store_guest_cart" };

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function remove(key) {
  try { localStorage.removeItem(key); } catch { /* Storage can be unavailable in restricted previews. */ }
}

export const localDb = {
  getUsers: () => read(KEYS.users, []),
  saveUsers: (users) => write(KEYS.users, users),
  getSession: () => read(KEYS.session, null),
  saveSession: (user) => write(KEYS.session, user),
  clearSession: () => remove(KEYS.session),
  getCart: (userId) => read(userId ? `store_cart_${userId}` : KEYS.guestCart, []),
  saveCart: (userId, cart) => write(userId ? `store_cart_${userId}` : KEYS.guestCart, cart),
  getWishlist: (userId) => read(`store_wishlist_${userId}`, []),
  saveWishlist: (userId, wishlist) => write(`store_wishlist_${userId}`, wishlist),
  getOrders: (userId) => read(`store_orders_${userId}`, []),
  saveOrders: (userId, orders) => write(`store_orders_${userId}`, orders),
};

export function obfuscatePassword(password) {
  // Demo-only obfuscation. This is NOT secure and must never store real passwords in production.
  return btoa(unescape(encodeURIComponent(`majed-demo:${password}`)));
}

export function createId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}