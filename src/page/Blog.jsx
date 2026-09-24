import { Link } from "react-router-dom";

const posts = [
  { slug: "smart-home-essentials", title: "Smart home essentials that actually simplify everyday life", summary: "A few dependable upgrades that make home routines calmer and more efficient." },
  { slug: "gift-guide", title: "A cleaner gift guide for every season", summary: "Thoughtful presents for tech lovers, homebodies, and people who like to travel light." },
  { slug: "capsule-wardrobe", title: "How to build a capsule wardrobe without losing personality", summary: "A practical system for choosing pieces that mix well and feel personal." },
];

export default function Blog() {
  return (
    <div className="container page-shell blog-page">
      <div className="page-intro"><span>Journal</span><h1>Fresh ideas for better routines.</h1></div>
      <div className="blog-list">
        {posts.map((post) => (
          <article className="article-card" key={post.slug}>
            <span className="eyebrow">Editor’s pick</span>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <Link to={`/blog/${post.slug}`} className="btn btn--secondary">Read article</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
