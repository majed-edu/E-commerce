import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container page-shell about-page">
      <div className="page-intro">
        <span>Our story</span>
        <h1>
          Majed is a modern online store built around quality and convenience.
        </h1>
        <p>
          We curate a diverse selection of products across electronics, home,
          fashion, beauty, and everyday essentials — all chosen to help our
          customers shop with confidence and enjoy a smooth, premium experience.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Curated variety</h2>
          <p>
            From practical daily essentials to standout lifestyle picks, Majed
            brings together products that suit modern life and different tastes.
          </p>
        </div>
        <div className="about-card">
          <h2>Quality first</h2>
          <p>
            We focus on trusted products and reliable quality so every order
            feels valuable, useful, and worth returning to.
          </p>
        </div>
        <div className="about-card">
          <h2>Simple shopping</h2>
          <p>
            Clear product discovery, secure checkout, and attentive service make
            shopping at Majed easy, enjoyable, and stress-free.
          </p>
        </div>
      </div>
      <div className="cta-row">
        <Link className="btn btn--primary" to="/shop">
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
