// src/App.jsx
import { Routes, Route } from "react-router-dom";
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
import "./App.css";

export default function App() {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <main>
        <Routes>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route
            path="/order-confirmation/:orderId"
            element={<Confirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
