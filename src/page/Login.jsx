import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { localDb } from "../lib/localDb";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login } = useAuth();
  const { notify } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const user = login(email, password);
      const guestCart = JSON.parse(
        localStorage.getItem("store_guest_cart") || "[]",
      );
      if (guestCart.length && !localDb.getCart(user.id).length) {
        localDb.saveCart(user.id, guestCart);
      }
      setError("");
      notify("Logged in successfully");
      navigate(from, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
      notify(submitError.message, "error");
    }
  };

  return (
    <div className="auth-landing">
      <div className="auth-landing__panel auth-landing__panel--brand">
        <div className="auth-brand-mark">REDA</div>
        <span className="eyebrow">Welcome back</span>
        <h1>Shop smarter. Save more.</h1>
        <p>
          Access premium deals, exclusive discounts, and a seamless shopping
          experience that feels like a modern marketplace.
        </p>
        <ul>
          <li>Free shipping on selected orders</li>
          <li>Smart cart and wishlist personalization</li>
          <li>Secure local session save for your next visit</li>
        </ul>
      </div>

      <div className="auth-card">
        <span className="eyebrow auth-card__eyebrow">Login</span>
        <h2>Access your account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="btn btn--primary btn--block" type="submit">
            Login to your account
          </button>
        </form>

        <p className="auth-switch">
          New to REDA? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}
