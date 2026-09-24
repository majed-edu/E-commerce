import { Link } from "react-router-dom";

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <button className={`btn btn--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="page-intro">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  to = "/shop",
  action = "Browse products",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark">+</div>
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="btn btn--primary" to={to}>
        {action}
      </Link>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton--image" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--short" />
        </div>
      ))}
    </div>
  );
}

export function Rating({ value = 0, count }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span>★★★★★</span>
      <b style={{ width: `${Math.min(5, value) * 20}%` }}>★★★★★</b>
      {count !== undefined && <small>({count})</small>}
    </span>
  );
}

export function Price({ value, discount = 0 }) {
  const old = discount ? value / (1 - discount / 100) : null;
  return (
    <span className="price">
      <strong>${value.toFixed(2)}</strong>
      {old && <del>${old.toFixed(2)}</del>}
    </span>
  );
}

export function ProductGrid({ products, onAdd }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductGridItem key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}

function ProductGridItem({ product, onAdd }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__media">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
        />
        <span className="product-card__tag">{product.category}</span>
      </Link>
      <div className="product-card__body">
        <Link to={`/product/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <Rating value={product.rating} count={product.reviews?.length} />
        <div className="product-card__bottom">
          <Price value={product.price} discount={product.discountPercentage} />
          <Button
            aria-label={`Add ${product.title} to cart`}
            onClick={() => onAdd?.(product)}
          >
            +
          </Button>
        </div>
      </div>
    </article>
  );
}
