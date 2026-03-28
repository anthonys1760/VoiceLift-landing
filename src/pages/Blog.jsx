import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

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
      font-size: 9px;
      padding: 6px 10px;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
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
    .hamburger {
      display: block;
    }
  }
`;

export default function Blog() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link to="/#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
        <Link to="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
        <Link to="/#roadmap" onClick={() => setMobileMenuOpen(false)}>Roadmap</Link>
        <Link to="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
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
          overflow: hidden;
        }
        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .blog-page {
            padding: 80px 20px 60px;
          }
          .blog-card {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }
          .blog-card-image {
            width: 100%;
            height: 200px;
          }
          .blog-header h1 {
            font-size: clamp(28px, 6vw, 40px);
          }
          .blog-header p {
            font-size: 16px;
          }
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
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} onError={(e) => {
                e.target.style.display = 'none';
              }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
