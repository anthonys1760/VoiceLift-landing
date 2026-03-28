import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogPostBySlug, blogPosts } from "../data/blogPosts";

const NAV_LINKS = ["Features", "How It Works", "Roadmap", "FAQ"];

const NAV_STYLES = `
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 40px;
    background: transparent;
    transition: all 0.3s;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  nav.scrolled {
    background: rgba(10,10,10,0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .logo {
    display: inline-flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    transition: opacity 0.2s;
    cursor: pointer;
  }
  .logo:hover {
    opacity: 0.8;
  }
  .logo-img {
    display: block;
    height: 180px;
    width: auto;
  }
  .logo-text {
    display: none;
    font-weight: 700;
    font-size: 16px;
    white-space: nowrap;
  }
  .logo-text-lift {
    color: var(--lime);
  }
  .nav-links {
    list-style: none;
    display: flex;
    gap: 40px;
  }
  .nav-links a {
    font-size: 14px;
    color: var(--muted);
    transition: color 0.2s;
  }
  .nav-links a:hover {
    color: var(--text);
  }
  .nav-cta {
    background: var(--lime);
    color: var(--black);
    font-size: 12px;
    font-weight: 600;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: opacity 0.2s, transform 0.2s;
  }
  .nav-cta:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }
  .grid-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 0;
    top: 0;
    left: 0;
  }
  .hamburger {
    display: none;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 28px;
    height: 28px;
  }
  .mobile-menu {
    display: none;
    position: fixed;
    top: 60px;
    right: 0;
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(10px);
    border-left: 1px solid var(--border);
    width: min(280px, calc(100vw - 20px));
    z-index: 999;
  }
  .mobile-menu.open {
    display: block;
  }
  .mobile-menu a {
    display: block;
    width: 100%;
    padding: 16px 20px;
    color: var(--muted);
    text-align: left;
    font-size: 15px;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;
  }
  .mobile-menu a:hover {
    color: var(--text);
  }
  .mobile-menu-cta {
    background: var(--lime);
    color: var(--black);
    font-weight: 600;
    margin: 12px;
    padding: 12px 16px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: none;
    cursor: pointer;
    width: calc(100% - 24px);
  }
  .mobile-menu-cta:hover {
    opacity: 0.88;
  }
  @media (max-width: 640px) {
    nav {
      padding: 8px 10px;
    }
    .logo-img {
      display: none;
    }
    .logo-text {
      display: block;
      font-size: 13px;
    }
    .nav-links {
      display: none;
    }
    .nav-cta {
      display: none;
    }
    .hamburger {
      display: block;
    }
  }
`;

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | VoiceLift Blog`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      <style>{NAV_STYLES}</style>
      <div className="grid-overlay" />
      <nav className={scrolled ? "scrolled" : ""}>
        <Link to="/" className="logo">
          <img src={import.meta.env.BASE_URL + "voicelift-logo.png"} alt="VoiceLift" className="logo-img" />
          <span className="logo-text">Voice<span className="logo-text-lift">Lift</span></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/#features">Features</Link></li>
          <li><Link to="/#how-it-works">How It Works</Link></li>
          <li><Link to="/#roadmap">Roadmap</Link></li>
          <li><Link to="/#faq">FAQ</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
        <button className="nav-cta" onClick={() => window.location.href = "/#cta"}>
          Get Early Access
        </button>
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      <div className={mobileMenuOpen ? "mobile-menu open" : "mobile-menu"}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l}
            to={"/#" + l.toLowerCase().replace(/ /g, "-")}
            onClick={() => setMobileMenuOpen(false)}
          >
            {l}
          </Link>
        ))}
        <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
        <button
          className="mobile-menu-cta"
          onClick={() => {
            window.location.href = "/#cta";
            setMobileMenuOpen(false);
          }}
        >
          Get Early Access
        </button>
      </div>
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
        .blog-post-featured-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          margin: 50px 0;
        }
        @media (max-width: 640px) {
          nav {
            padding: 8px 10px;
          }
          .logo-img {
            display: none;
          }
          .logo-text {
            display: block;
            font-size: 13px;
          }
          .nav-links {
            display: none;
          }
          .nav-cta {
            display: none;
          }
          .hamburger {
            display: block;
          }
          .blog-post-container {
            padding: 80px 20px 60px;
            max-width: 100%;
          }
          .blog-post-title {
            font-size: clamp(24px, 5vw, 32px);
          }
          .blog-post-content {
            font-size: 15px;
          }
          .blog-post-content h2 {
            font-size: 22px;
          }
          .blog-post-content h3 {
            font-size: 18px;
          }
          .blog-post-featured-image {
            height: 250px;
            margin: 30px 0;
          }
          .blog-post-nav {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .blog-post-nav a {
            padding: 16px;
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

        <img
          src={post.image}
          alt={post.title}
          className="blog-post-featured-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

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
    </>
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
