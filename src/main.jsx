// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Order matters: variables.css defines the CSS custom properties
// (--color-primary, etc.), so it must load BEFORE index.css/App.css
// which consume them.
import "./styles/variables.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter must wrap the whole App — NavLink/Route only work
        inside a Router context. This is the #1 cause of a blank white
        screen + a console error mentioning "useHref" or "Router". */}
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
