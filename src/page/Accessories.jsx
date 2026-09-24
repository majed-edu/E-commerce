// src/page/Accessories.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import {
  PageIntro,
  ProductGrid,
  SkeletonGrid,
  EmptyState,
} from "../components/ui";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Accessories() {
  const { slug } = useParams();
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(0);
  const { addItem } = useCart();
  const { notify } = useToast();
  const { data, total, loading, error } = useProducts({
    limit: 12,
    skip: page * 12,
    category: slug || "",
  });
  const products = [...data].sort((a, b) =>
    sort === "low"
      ? a.price - b.price
      : sort === "high"
        ? b.price - a.price
        : sort === "rating"
          ? b.rating - a.rating
          : 0,
  );
  const add = (product) => {
    addItem(product);
    notify("Added to your cart");
  };
  return (
    <div className="container page-shell">
      <PageIntro
        eyebrow="The collection"
        title={slug ? slug.replace(/-/g, " ") : "All products"}
      >
        Find useful, beautiful things for everyday life.
      </PageIntro>
      <div className="shop-toolbar">
        <span>{total} products</span>
        <label htmlFor="sort">
          Sort by{" "}
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Recommended</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>
      {error ? (
        <EmptyState
          title="We could not load this collection"
          message="Check your connection and try again."
        />
      ) : loading ? (
        <SkeletonGrid />
      ) : products.length ? (
        <>
          <ProductGrid products={products} onAdd={add} />
          <div className="pagination">
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>Page {page + 1}</span>
            <button
              disabled={(page + 1) * 12 >= total}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          title="Nothing here yet"
          message="Try another collection or search term."
        />
      )}
    </div>
  );
}
