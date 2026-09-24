import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductSlider from "../components/header/ProductSlider";
import { Button, EmptyState, PageIntro, Rating, Price, SkeletonGrid } from "../components/ui";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { useProduct, useProducts } from "../hooks/useProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, loading, error } = useProduct(id);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { notify } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const related = useProducts({ category: data?.category || "", limit: 6 });
  const relatedProducts = useMemo(() => (related.data || []).filter((item) => String(item.id) !== String(id)).slice(0, 6), [related.data, id]);

  if (loading) return <div className="container page-shell"><SkeletonGrid count={1} /></div>;
  if (error || !data) return <div className="container page-shell"><EmptyState title="Product unavailable" message="This item could not be loaded right now." /></div>;

  const images = data.images && data.images.length ? data.images : [data.thumbnail, data.thumbnail];
  const onAdd = () => { addItem({ ...data, price: Number(data.price) }, quantity); notify("Added to cart"); };
  const wish = isWishlisted(data.id);

  return (
    <div className="container page-shell product-detail">
      <PageIntro eyebrow="Product overview" title={data.title} />
      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <img src={images[selectedImage]} alt={data.title} className="product-detail__main" />
          <div className="product-detail__thumbs">
            {images.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={selectedImage === index ? "is-active" : ""}
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`${data.title} preview ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="product-detail__info">
          <div className="product-detail__meta">
            <span className="badge badge--primary">{data.category}</span>
            <span className="badge">{data.stock > 0 ? `${data.stock} in stock` : "Out of stock"}</span>
          </div>
          <h2>{data.title}</h2>
          <div className="product-detail__rating-row">
            <Rating value={data.rating} count={data.reviews?.length || 0} />
          </div>
          <div className="product-detail__price-row">
            <Price value={Number(data.price)} discount={data.discountPercentage || 0} />
          </div>
          <p className="product-detail__description">{data.description}</p>
          <div className="quantity-picker">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <div className="product-detail__actions">
            <Button type="button" onClick={onAdd}>Add to cart</Button>
            <Button type="button" variant="secondary" onClick={() => { toggle(data); notify(wish ? "Removed from wishlist" : "Saved to wishlist"); }}>
              {wish ? "Saved" : "Wishlist"}
            </Button>
          </div>
        </div>
      </div>

      <div className="product-detail__tabs">
        <div className="tabs-nav">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button key={tab} type="button" className={activeTab === tab ? "is-active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div className="tabs-panel">
          {activeTab === 'description' && <p>{data.description}</p>}
          {activeTab === 'specifications' && <ul className="spec-list">{Object.entries({ brand: data.brand, model: data.title, origin: 'Global warehouse', warranty: '12 months' }).map(([key, value]) => <li key={key}><strong>{key}</strong><span>{value}</span></li>)}</ul>}
          {activeTab === 'reviews' && <div className="review-list">{(data.reviews || [{rating: 5, reviewerName: 'Verified buyer', comment: 'Excellent quality and a very smooth shopping experience.'}]).map((review, index) => <div key={`${review.reviewerName}-${index}`} className="review-item"><h4>{review.reviewerName}</h4><Rating value={review.rating} /><p>{review.comment}</p></div>)}</div>}
        </div>
      </div>

      {relatedProducts.length > 0 && <ProductSlider title="Related products" products={relatedProducts} onAddToCart={(product) => { addItem(product, 1); notify('Added to cart'); }} />}
      <div className="cta-row"><Link to="/shop" className="btn btn--secondary">Continue shopping</Link></div>
    </div>
  );
}
