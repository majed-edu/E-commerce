// src/App.jsx
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import TopHeader from "./components/header/TopHeader";
import BottomHeader from "./components/header/BottomHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./page/Home";
import About from "./page/About";
import Accessories from "./page/Accessories";
import ProductDetails from "./page/ProductDetails";
import Search from "./page/Search";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Confirmation from "./page/Confirmation";
import Blog from "./page/Blog";
import BlogPost from "./page/BlogPost";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Register from "./page/Register";
import Account from "./page/Account";
import Wishlist from "./page/Wishlist";
import NotFound from "./page/NotFound";
import { useAuth } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const showStoreShell = user && !authRoutes.includes(location.pathname);

  return (
    <>
      {showStoreShell && <TopHeader />}
      {showStoreShell && <BottomHeader />}
      <main className={showStoreShell ? "app-shell" : "auth-shell"}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Accessories />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/category/:slug" element={<Accessories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/order-confirmation/:orderId"
              element={<Confirmation />}
            />
          </Route>

          <Route
            path="*"
            element={user ? <NotFound /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </>
  );
}
