import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page-shell">
      <div className="empty-state">
        <div className="empty-state__mark">404</div>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link className="btn btn--primary" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
