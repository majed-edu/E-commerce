// src/components/ProductSlider.jsx
import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductSlider.css";

/**
 * ProductSlider
 * @param {string} title - section heading, e.g. "Trending Now"
 * @param {Array}  products - array of product objects for ProductCard
 * @param {Function} onAddToCart - optional callback(product)
 *
 * No carousel library is used on purpose: this is native horizontal
 * scroll (`overflow-x: auto` + `scroll-snap`) driven by two buttons that
 * call `scrollBy`. It's a good pattern to understand because it works
 * on trackpads/touch for free and needs zero extra dependencies.
 */
export default function ProductSlider({ title, products, onAddToCart }) {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrowState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrowState();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      el?.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, [products]);

  const scrollByAmount = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".product-card")?.offsetWidth ?? 260;
    el.scrollBy({ left: direction * (cardWidth + 20) * 2, behavior: "smooth" });
  };

  return (
    <section className="product-slider">
      <div className="product-slider__header container">
        <h2>{title}</h2>
        <div className="product-slider__controls">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollPrev}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollNext}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className="product-slider__track container" ref={trackRef}>
        {products.map((product) => (
          <div className="product-slider__item" key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </section>
  );
}