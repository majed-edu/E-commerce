import { Link } from "react-router-dom";
import { EmptyState } from "../components/ui";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const shipping = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const discount = promo.trim().toUpperCase() === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  if (!items.length)
    return (
      <div className="container page-shell">
        <EmptyState
          title="Your cart is empty"
          message="Add a few essentials and come back here."
          action="Shop now"
          to="/shop"
        />
      </div>
    );

  return (
    <div className="container page-shell cart-page">
      <div className="cart-page__grid">
        <div className="cart-box">
          <h1>Shopping cart</h1>
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail || item.image || item.images?.[0]}
                alt={item.title}
              />
              <div className="cart-item__info">
                <Link to={`/product/${item.id}`}>{item.title}</Link>
                <strong>${Number(item.price).toFixed(2)}</strong>
              </div>
              <div className="quantity-picker">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="text-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <aside className="summary-box">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>${shipping.toFixed(2)}</strong>
          </div>
          <div className="promo-box">
            <label htmlFor="promo">Promo code</label>
            <div>
              <input
                id="promo"
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
                placeholder="SAVE10"
              />
              <button type="button" onClick={() => setPromo("SAVE10")}>
                Apply
              </button>
            </div>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <strong>-${discount.toFixed(2)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link className="btn btn--primary btn--block" to="/checkout">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
