// src/components/HeroSlider.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";

const SLIDES = [
  {
    id: 1,
    eyebrow: "Flash Deal",
    title: "Premium tech with up to 60% off",
    subtitle: "Smart devices, audio gear, and lifestyle essentials built for everyday performance.",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80",
    cta: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: 2,
    eyebrow: "New Collection",
    title: "Style upgrades for your everyday routine",
    subtitle: "Seasonal fashion, travel essentials, and elevated must-haves for every moment.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
    cta: "Explore Deals",
    ctaLink: "/category/fashion",
  },
  {
    id: 3,
    eyebrow: "Limited Time",
    title: "Transform your space with smart home picks",
    subtitle: "Discover home essentials, decor, and wellness upgrades designed around your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    cta: "Browse Home",
    ctaLink: "/category/home-kitchen",
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
