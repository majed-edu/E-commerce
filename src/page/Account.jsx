import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { localDb } from "../lib/localDb";

export default function Account() {
  const { user, updateProfile, changePassword } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address?.street || "",
  });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const orders = user ? localDb.getOrders(user.id) : [];

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile({
      name: profile.name,
      phone: profile.phone,
      address: { ...user?.address, street: profile.address },
    });
    setMessage("Profile updated");
  };

  const savePassword = (event) => {
    event.preventDefault();
    if (password.length < 6) return setMessage("Use at least 6 characters");
    changePassword(password);
    setPassword("");
    setMessage("Password updated");
  };

  return (
    <div className="container page-shell account-page">
      <div className="account-grid">
        <section className="account-card">
          <h2>Profile</h2>
          <form onSubmit={saveProfile}>
            <label>
              Name
              <input
                value={profile.name}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Phone
              <input
                value={profile.phone}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              Address
              <input
                value={profile.address}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
              />
            </label>
            <button className="btn btn--primary" type="submit">
              Save profile
            </button>
            {message && <p className="account-message">{message}</p>}
          </form>
        </section>
        <section className="account-card">
          <h2>Orders</h2>
          {orders.length ? (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order.id}>
                  <strong>#{order.id.slice(-6)}</strong>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span>${Number(order.total).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet.</p>
          )}
        </section>
        <section className="account-card">
          <h2>Change password</h2>
          <form onSubmit={savePassword}>
            <label>
              New password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button className="btn btn--primary" type="submit">
              Update password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
