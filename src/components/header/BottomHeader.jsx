// src/components/BottomHeader.jsx
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

// Categories shown inside the "Browse Category" dropdown.
// Move this to a data file (e.g. src/data/categories.js) once it grows.
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
  { label: "About", to: "/about" },
  { label: "Accessories", to: "/accessories" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function BottomHeader() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoryRef = useRef(null);

  // Close the category dropdown when the user clicks anywhere outside it.
  // This is the "advanced" bit: refs + a document-level event listener,
  // cleaned up on unmount so we don't leak listeners between renders.
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll while the mobile menu is open, restore it on close/unmount.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bottom-header">
      <div className="bottom-header__inner container">
        {/* --- Browse Category dropdown --- */}
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

        {/* --- Main navigation (desktop) --- */}
        <ul className="main-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              {/* NavLink gives us the active route "for free": it adds the
                  "active" class automatically when its `to` matches the
                  current URL, so we don't track active state ourselves. */}
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

        {/* --- Right side: auth links + hamburger --- */}
        <div className="bottom-header__right">
          <NavLink to="/login" className="auth-link">
            <UserIcon />
            <span>Login</span>
          </NavLink>
          <span className="auth-divider" aria-hidden="true">
            /
          </span>
          <NavLink to="/register" className="auth-link">
            <span>Register</span>
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

      {/* --- Mobile slide-down menu --- */}
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
          <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

/* --- Small inline icon components (no extra dependency needed) --- */

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}