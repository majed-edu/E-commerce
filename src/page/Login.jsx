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
      const guestCart = JSON.parse(localStorage.getItem("store_guest_cart") || "[]");
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
    <div className="container page-shell auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <div className="password-field">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn--primary btn--block" type="submit">Login</button>
        </form>
        <p className="auth-switch">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
