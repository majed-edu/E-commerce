import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { FaSearch, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import "./header.css";

export default function TopHeader() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { count } = useCart();
  const { items } = useWishlist();
  const { user } = useAuth();
  const submit = (event) => {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };
  return (
    <header className="top-header">
      <div className="container top-header__inner">
        <Link to="/" className="brand">
          <img src={logo} alt="Reda Online Store" />
          <span>
            REDA<span>.</span>
          </span>
        </Link>
        <form className="search-box" onSubmit={submit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, categories..."
            aria-label="Search products"
          />
          <button aria-label="Submit search">
            <FaSearch />
          </button>
        </form>
        <div className="header-actions">
          <Link to="/wishlist" aria-label="Wishlist">
            <FaRegHeart />
            <b>{items.length}</b>
          </Link>
          <Link to="/cart" aria-label="Cart">
            <FaShoppingBag />
            <b>{count}</b>
          </Link>
          <Link to={user ? "/account" : "/login"} className="account-link">
            {user ? user.name.split(" ")[0] : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
}
