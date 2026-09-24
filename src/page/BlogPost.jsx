import { Link, useParams } from "react-router-dom";

const posts = [
  { slug: "smart-home-essentials", title: "Smart home essentials that actually simplify everyday life", summary: "A few dependable upgrades that make home routines calmer and more efficient.", body: "From lighting controls to better charging stations, smart devices work best when they solve a real problem. The goal is comfort, not clutter. We focused on pieces that integrate cleanly, feel intuitive, and save time rather than adding extra complexity to the home." },
  { slug: "gift-guide", title: "A cleaner gift guide for every season", summary: "Thoughtful presents for tech lovers, homebodies, and people who like to travel light.", body: "The best gift is practical and personal. Start with the person’s habits: how they work, what they carry, what they love to do after work. A well-chosen item feels considered, not noisy. Small upgrades often land better than big surprises because they fit seamlessly into daily life." },
  { slug: "capsule-wardrobe", title: "How to build a capsule wardrobe without losing personality", summary: "The easiest way to create a wardrobe that feels simple, stylish, and easy to repeat.", body: "A capsule wardrobe isn’t about being minimal for the sake of it. It’s about building a system where each piece works harder. Choose versatile colors, strong textures, and a few standout accessories that help your outfits feel personal without requiring constant shopping." },
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug) || posts[0];
  return <div className="container page-shell blog-post"><Link to="/blog" className="back-link">← Back to blog</Link><article className="article-card"><span className="eyebrow">Editorial</span><h1>{post.title}</h1><p className="article-summary">{post.summary}</p><div className="article-body"><p>{post.body}</p><p>{post.body}</p></div></article></div>;
}
