import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { localDb } from "../lib/localDb";

export default function Confirmation() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const orders = user ? localDb.getOrders(user.id) : [];
  const order = orders.find((entry) => entry.id === orderId) || null;

  return <div className="container page-shell confirmation-page"><div className="confirmation-box"><span className="badge badge--success">Order confirmed</span><h1>Thank you for your purchase!</h1>{order ? <><p>Your order number is <strong>{order.id}</strong>.</p><ul className="simple-list">{order.items.map((item) => <li key={item.id}>{item.title} × {item.quantity}</li>)}</ul><p>Total: <strong>${Number(order.total).toFixed(2)}</strong></p></> : <p>We could not find this order in your account history yet.</p>}<Link className="btn btn--primary" to="/shop">Continue shopping</Link></div></div>;
}
