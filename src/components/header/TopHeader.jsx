import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { FaSearch, FaRegHeart, FaShoppingBag, FaUserAlt } from "react-icons/fa";
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

  useEffect(() => {
    if (!query.trim()) return undefined;

    const timer = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 220);

    return () => clearTimeout(timer);
  }, [query, navigate]);

  const submit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="top-header">
      <div className="container top-header__inner">
        <Link to="/" className="brand" aria-label="Majed home">
          <span className="brand-mark">M</span>
          <img src={logo} alt="Majed store" className="brand-logo" />
          <span className="brand-name">MAJED</span>
        </Link>

        <form className="search-box" onSubmit={submit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, brands, categories..."
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            <FaSearch />
          </button>
        </form>

        <div className="header-actions" aria-label="Account and cart actions">
          <Link to="/wishlist" className="header-action" aria-label="Wishlist">
            <FaRegHeart />
            <b>{items.length}</b>
          </Link>

          <Link to="/cart" className="header-action" aria-label="Shopping cart">
            <FaShoppingBag />
            <b>{count}</b>
          </Link>

          <Link to={user ? "/account" : "/login"} className="account-link">
            <FaUserAlt />
            <span>{user ? user.name.split(" ")[0] : "Sign in"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
