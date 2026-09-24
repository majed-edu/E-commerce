import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container page-shell contact-page">
      <div className="page-intro">
        <span>Contact</span>
        <h1>Need help with a product or order?</h1>
        <p>We usually reply within one business day.</p>
      </div>
      <div className="contact-layout">
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>
            Name
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message
            <textarea placeholder="Tell us how we can help" rows="6" required />
          </label>
          <button className="btn btn--primary" type="submit">
            Send message
          </button>
          {submitted && (
            <p className="form-success">Your message was sent successfully.</p>
          )}
        </form>
        <div className="contact-card">
          <h2>Store info</h2>
          <p>Email: hello@reda-store.com</p>
          <p>Phone: +966 55 123 4567</p>
          <p>Hours: Mon–Sat, 9am–8pm</p>
        </div>
      </div>
    </div>
  );
}
