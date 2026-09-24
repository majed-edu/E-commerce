// src/components/HeroSlider.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import "./HeroSlider.css";

// Replace image paths with real files from src/img/
const SLIDES = [
  {
    id: 1,
    eyebrow: "New Season",
    title: "Everyday tech, redesigned",
    subtitle: "Headphones, watches and chargers built for people on the move.",
    image: "https://picsum.photos/seed/hero1/1400/600",
    cta: "Shop Now",
    ctaLink: "/category/electronics",
  },
  {
    id: 2,
    eyebrow: "Up to 40% off",
    title: "Refresh your wardrobe",
    subtitle: "New arrivals across jackets, sneakers and accessories.",
    image: "https://picsum.photos/seed/hero2/1400/600",
    cta: "Shop Now",
    ctaLink: "/category/fashion",
  },
  {
    id: 3,
    eyebrow: "Limited stock",
    title: "Home essentials, sorted",
    subtitle: "Kitchen and living upgrades that don't break the bank.",
    image: "https://picsum.photos/seed/hero3/1400/600",
    cta: "Shop Now",
    ctaLink: "/category/home-kitchen",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  // useRef (not useState) for the timer id: changing it should NOT re-render
  // the component, it's just bookkeeping for setInterval/clearInterval.
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length); // wraps around both ends
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay: restart the timer whenever `active` changes so a manual click
  // doesn't get immediately overridden by a pending auto-advance.
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
              <a href={slide.ctaLink} className="hero-slide__cta">
                {slide.cta}
              </a>
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
