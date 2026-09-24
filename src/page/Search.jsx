import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import {
  PageIntro,
  ProductGrid,
  SkeletonGrid,
  EmptyState,
} from "../components/ui";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { data, loading, error } = useProducts({ search: query, limit: 24 });
  const { addItem } = useCart();
  const { notify } = useToast();
  return (
    <div className="container page-shell">
      <PageIntro
        eyebrow="Search results"
        title={query ? `Results for “${query}”` : "Search the store"}
      >
        {data.length} products matched your search.
      </PageIntro>
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <EmptyState
          title="Search is unavailable"
          message="Please try again in a moment."
        />
      ) : data.length ? (
        <ProductGrid
          products={data}
          onAdd={(product) => {
            addItem(product);
            notify("Added to your cart");
          }}
        />
      ) : (
        <EmptyState
          title="No products found"
          message="Try a broader search term."
          action="Browse all products"
        />
      )}
    </div>
  );
}
