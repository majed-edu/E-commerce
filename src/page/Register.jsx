import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      notify("Password must be at least 6 characters long.", "error");
      return;
    }
    try {
      register(form.name, form.email, form.password);
      setError("");
      notify("Account created successfully");
      navigate("/account", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
      notify(submitError.message, "error");
    }
  };

  return (
    <div className="container page-shell auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} required />
          </label>
          <label>
            Password
            <div className="password-field">
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} required />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn--primary btn--block" type="submit">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
