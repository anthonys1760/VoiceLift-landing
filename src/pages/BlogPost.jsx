import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getBlogPostBySlug, blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | VoiceLift Blog`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Post not found</h2>
          <Link to="/blog" style={{ color: "var(--lime)", marginTop: "20px", display: "inline-block" }}>
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <style>{`
        .blog-post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 40px 80px;
        }
        .blog-post-header {
          margin-bottom: 50px;
        }
        .blog-post-category {
          font-size: 12px;
          color: var(--lime);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }
        .blog-post-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .blog-post-meta {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: var(--muted);
          flex-wrap: wrap;
        }
        .blog-post-content {
          line-height: 1.8;
          font-size: 16px;
        }
        .blog-post-content h2 {
          font-size: 28px;
          font-weight: 600;
          margin: 50px 0 20px;
          color: var(--text);
        }
        .blog-post-content h3 {
          font-size: 22px;
          font-weight: 600;
          margin: 40px 0 16px;
          color: var(--text);
        }
        .blog-post-content p {
          margin-bottom: 20px;
          color: var(--muted);
        }
        .blog-post-content ul, .blog-post-content ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .blog-post-content li {
          margin-bottom: 12px;
          color: var(--muted);
        }
        .blog-post-content strong {
          color: var(--text);
          font-weight: 600;
        }
        .blog-post-content code {
          background: var(--card);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 14px;
        }
        .blog-post-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 80px 0;
        }
        .blog-post-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 80px;
        }
        .blog-post-nav a {
          text-decoration: none;
          color: inherit;
          padding: 24px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s;
        }
        .blog-post-nav a:hover {
          border-color: rgba(232,255,71,0.3);
          transform: translateY(-2px);
        }
        .blog-post-nav-label {
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .blog-post-nav-title {
          font-weight: 600;
          font-size: 16px;
        }
        @media (max-width: 640px) {
          .blog-post-container {
            padding: 80px 20px 60px;
          }
          .blog-post-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="blog-post-container">
        <Link to="/blog" style={{ color: "var(--lime)", textDecoration: "none", marginBottom: "40px", display: "inline-block" }}>
          ← Back to blog
        </Link>

        <div className="blog-post-header">
          <div className="blog-post-category">{post.category}</div>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <article className="blog-post-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />

        <hr className="blog-post-divider" />

        <div className="blog-post-nav">
          {prevPost && (
            <Link to={`/blog/${prevPost.slug}`}>
              <div className="blog-post-nav-label">← Previous Post</div>
              <div className="blog-post-nav-title">{prevPost.title}</div>
            </Link>
          )}
          {nextPost && (
            <Link to={`/blog/${nextPost.slug}`}>
              <div className="blog-post-nav-label">Next Post →</div>
              <div className="blog-post-nav-title">{nextPost.title}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple markdown parser for blog content
function parseMarkdown(md) {
  let html = md;

  // Headers
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // Lists
  html = html.replace(/<p>- (.*?)(<\/p>|<p>)/g, "<ul><li>$1</li></ul>$2");

  return html;
}
