import { EmptyState, PageIntro, ProductGrid } from "../components/ui";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const { notify } = useToast();

  if (!items.length)
    return (
      <div className="container page-shell">
        <EmptyState
          title="No saved items"
          message="Browse products and save the ones you love."
          to="/shop"
          action="Discover products"
        />
      </div>
    );

  return (
    <div className="container page-shell">
      <PageIntro eyebrow="Saved for later" title="Your wishlist" />{" "}
      <ProductGrid
        products={items}
        onAdd={(product) => {
          addItem(product, 1);
          notify("Moved to cart");
        }}
      />{" "}
      <div className="wishlist-actions">
        <button
          className="text-btn"
          type="button"
          onClick={() => items.forEach((item) => remove(item.id))}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
