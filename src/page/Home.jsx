// src/page/Home.jsx
import HeroSlider from "../components/header/HeroSlider";
import ProductSlider from "../components/header/ProductSlider";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { data: products, loading } = useProducts({ limit: 12 });
  const handleAddToCart = () => {};

  return (
    <>
      <HeroSlider />
      <section className="container home-categories">
        <div>
          <span className="eyebrow">Luxury essentials</span>
          <h2>Curated for a premium lifestyle</h2>
        </div>
        <div className="category-links">
          <Link to="/category/beauty">Beauty</Link>
          <Link to="/category/smartphones">Tech</Link>
          <Link to="/category/furniture">Home</Link>
          <Link to="/category/mens-shirts">Style</Link>
        </div>
      </section>
      <ProductSlider
        title="Trending Now"
        products={loading ? [] : products.slice(0, 6)}
        onAddToCart={handleAddToCart}
      />
      <ProductSlider
        title="Best Sellers"
        products={loading ? [] : [...products].reverse().slice(0, 6)}
        onAddToCart={handleAddToCart}
      />
      <section className="newsletter container">
        <div>
          <span className="eyebrow">The Majed edit</span>
          <h2>Premium finds, delivered beautifully.</h2>
          <p>Private drops, elevated essentials, and insider deals designed around your lifestyle.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email">Email address</label>
          <div>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <button className="btn btn--primary">Subscribe</button>
          </div>
        </form>
      </section>
      <section className="trust container">
        <div>
          <b>01</b>
          <h3>Thoughtful shipping</h3>
          <p>Fast delivery with clear tracking from checkout to your door.</p>
        </div>
        <div>
          <b>02</b>
          <h3>Easy returns</h3>
          <p>Changed your mind? Send eligible items back within 30 days.</p>
        </div>
        <div>
          <b>03</b>
          <h3>Human support</h3>
          <p>Real help when you need it, seven days a week.</p>
        </div>
      </section>
    </>
  );
}
