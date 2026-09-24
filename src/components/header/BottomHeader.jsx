// src/components/BottomHeader.jsx
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Health",
  "Sports & Outdoors",
  "Toys & Games",
];

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Deals", to: "/category/electronics" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function BottomHeader() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bottom-header">
      <div className="bottom-header__inner container">
        <div className="category-dropdown" ref={categoryRef}>
          <button
            type="button"
            className={`category-dropdown__trigger ${isCategoryOpen ? "is-open" : ""}`}
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isCategoryOpen}
          >
            <MenuIcon />
            <span>Browse Category</span>
            <ChevronIcon className={isCategoryOpen ? "rotate" : ""} />
          </button>

          {isCategoryOpen && (
            <ul className="category-dropdown__panel" role="menu">
              {CATEGORIES.map((cat) => (
                <li key={cat} role="menuitem">
                  <NavLink
                    to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {cat}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="main-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="bottom-header__right" aria-label="Store utility links">
          <NavLink to="/account" className="auth-link">
            <UserIcon />
            <span>My account</span>
          </NavLink>

          <button
            type="button"
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__auth">
          <NavLink to="/account" onClick={() => setIsMobileMenuOpen(false)}>
            My account
          </NavLink>
          <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      className={`chevron ${className}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
