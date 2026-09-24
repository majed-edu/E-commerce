// src/components/HeroSlider.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";

const SLIDES = [
  {
    id: 1,
    eyebrow: "Trending now",
    title: "Style, tech, and essentials for everyday living",
    subtitle:
      "Curated premium finds for home, work, travel, and personal upgrades — all in one destination.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
    cta: "Shop now",
    ctaLink: "/shop",
  },
  {
    id: 2,
    eyebrow: "New arrivals",
    title: "Luxury upgrades for your daily routine",
    subtitle:
      "Discover elevated essentials, smart accessories, and carefully selected pieces designed to stand out.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
    cta: "Explore deals",
    ctaLink: "/category/electronics",
  },
  {
    id: 3,
    eyebrow: "Best sellers",
    title: "Elevated essentials for home, style, and comfort",
    subtitle:
      "Shop top-rated products chosen to bring quality, comfort, and modern style to every corner of life.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    cta: "Browse home",
    ctaLink: "/category/fashion",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };

  return (
    <section
      className="hero-slider"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-roledescription="carousel"
    >
      <div
        className="hero-slider__track"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div
            className="hero-slide"
            key={slide.id}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-slide__overlay" />
            <div className="hero-slide__content container">
              <p className="hero-slide__eyebrow">{slide.eyebrow}</p>
              <h1 className="hero-slide__title">{slide.title}</h1>
              <p className="hero-slide__subtitle">{slide.subtitle}</p>
              <div className="hero-slide__actions">
                <Link to={slide.ctaLink} className="hero-slide__cta">
                  {slide.cta}
                </Link>
                <Link to="/shop" className="hero-slide__secondary">
                  View catalog
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="hero-slider__arrow hero-slider__arrow--prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--next"
        onClick={next}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="hero-slider__dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className={`hero-slider__dot ${i === active ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
