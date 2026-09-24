// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import { Button, Price, Rating } from "../ui";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { notify } = useToast();
  const wished = isWishlisted(product.id);
  const add = () => {
    addItem(product);
    onAddToCart?.(product);
    notify("Added to your cart");
  };
  const image = product.thumbnail || product.image;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__media">
        <img src={image} alt={product.title} loading="lazy" />
        {product.discountPercentage > 0 && (
          <span className="product-card__badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>
      <div className="product-card__body">
        <button
          type="button"
          className={`product-card__wishlist ${wished ? "is-active" : ""}`}
          aria-pressed={wished}
          aria-label="Toggle wishlist"
          onClick={() => {
            toggle(product);
            notify(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
        >
          ♥
        </button>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__title">{product.title}</h3>
        </Link>
        <Rating value={product.rating} count={product.reviews?.length} />
        <div className="product-card__footer">
          <Price value={product.price} discount={product.discountPercentage} />
          <Button
            type="button"
            onClick={add}
            aria-label={`Add ${product.title} to cart`}
          >
            +
          </Button>
        </div>
      </div>
    </article>
  );
}
