import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { localDb, createId } from "../lib/localDb";

export default function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", address: "", city: "", zip: "", card: "", expiry: "", cvc: "" });

  const shipping = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const total = subtotal + shipping;
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const placeOrder = (event) => {
    event.preventDefault();
    if (!user) return notify("Please sign in to continue", "error");
    const order = { id: createId("order"), userId: user.id, createdAt: new Date().toISOString(), items, total, status: "Processing", shippingAddress: { ...form } };
    const existing = localDb.getOrders(user.id);
    localDb.saveOrders(user.id, [...existing, order]);
    clearCart();
    notify("Order placed successfully");
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="container page-shell checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={placeOrder}>
        <div className="checkout-grid">
          <section className="checkout-card">
            <h2>Shipping details</h2>
            <div className="field-grid">
              <label>Full name<input value={form.name} onChange={update("name")} required /></label>
              <label>Email<input type="email" value={form.email} onChange={update("email")} required /></label>
              <label className="span-2">Address<input value={form.address} onChange={update("address")} required /></label>
              <label>City<input value={form.city} onChange={update("city")} required /></label>
              <label>ZIP<input value={form.zip} onChange={update("zip")} required /></label>
            </div>
          </section>
          <section className="checkout-card">
            <h2>Payment</h2>
            <div className="field-grid">
              <label className="span-2">Card number<input value={form.card} onChange={update("card")} placeholder="1234 5678 9012 3456" required /></label>
              <label>Expiry<input value={form.expiry} onChange={update("expiry")} placeholder="MM/YY" required /></label>
              <label>CVC<input value={form.cvc} onChange={update("cvc")} placeholder="123" required /></label>
            </div>
          </section>
        </div>
        <aside className="checkout-summary">
          <h2>Review</h2>
          {items.map((item) => <div key={item.id} className="mini-item"><span>{item.title}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}
          <div className="summary-row"><span>Shipping</span><strong>${shipping.toFixed(2)}</strong></div>
          <div className="summary-row total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <Button type="submit">Place order</Button>
        </aside>
      </form>
    </div>
  );
}
