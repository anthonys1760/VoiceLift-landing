import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <div className="blog-page">
      <style>{`
        .blog-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 120px 40px 80px;
        }
        .blog-header {
          max-width: 900px;
          margin: 0 auto 80px;
          text-align: center;
        }
        .blog-header h1 {
          font-family: var(--font-display);
          font-size: clamp(36px, 8vw, 56px);
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--text);
        }
        .blog-header p {
          font-size: 18px;
          color: var(--muted);
          line-height: 1.6;
        }
        .blog-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          gap: 40px;
        }
        .blog-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: start;
        }
        .blog-card:hover {
          border-color: rgba(232,255,71,0.3);
          transform: translateY(-2px);
        }
        .blog-card-content h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text);
        }
        .blog-card-excerpt {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .blog-card-meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--muted);
          flex-wrap: wrap;
        }
        .blog-card-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .blog-card-image {
          width: 200px;
          height: 160px;
          background: linear-gradient(135deg, rgba(232,255,71,0.1) 0%, rgba(232,255,71,0.05) 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .blog-page {
            padding: 80px 20px 60px;
          }
          .blog-card {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .blog-card-image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>

      <div className="blog-header">
        <h1>VoiceLift Blog</h1>
        <p>Insights on voice-first fitness tracking, gym psychology, and training data that actually matters.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
            <div className="blog-card-content">
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", color: "var(--lime)", fontWeight: 600, textTransform: "uppercase" }}>
                  {post.category}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
            </div>
            <div className="blog-card-image">📝</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
