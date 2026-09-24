import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container page-shell about-page">
      <div className="page-intro">
        <span>Our story</span>
        <h1>We build the kind of store people remember.</h1>
        <p>
          Majed was designed for premium shopping: refined essentials, smarter
          tech, and a boutique experience that feels intentional from the first click.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>What we stand for</h2>
          <p>
            We believe great online shopping feels simple: clear products,
            honest pricing, and reliable support when you need help.
          </p>
        </div>
        <div className="about-card">
          <h2>Why customers stay</h2>
          <p>
            From home upgrades to travel essentials, we curate products that add
            comfort without clutter.
          </p>
        </div>
        <div className="about-card">
          <h2>Our promise</h2>
          <p>
            Thoughtful shipping, straightforward returns, and a user experience
            that respects your time.
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
