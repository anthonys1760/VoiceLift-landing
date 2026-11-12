export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        marginTop: "60px",
        padding: "40px",
        textAlign: "center",
        fontSize: "13px",
        color: "var(--muted)",
      }}
    >
      <p>© 2026 VoiceLift</p>
      <p style={{ marginTop: "8px" }}>
        Built by{" "}
        <a href="https://anthonysdigital.net/" rel="author">
          Anthony Smith
        </a>
      </p>
    </footer>
  );
}
