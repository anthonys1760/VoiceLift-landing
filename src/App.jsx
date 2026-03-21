import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "How It Works", "FAQ"];

const FEATURES = [
  {
    icon: "🎙️",
    title: "Just Say It",
    desc: 'Say "3 sets of bench at 185, last set was tough" and it\'s logged. No tapping, no scrolling.',
  },
  {
    icon: "🧠",
    title: "AI That Lifts",
    desc: "Understands gym slang, partial reps, supersets, and ambiguous sets. It thinks like a lifter.",
  },
  {
    icon: "📈",
    title: "Auto-Progress Tracking",
    desc: "Visualizes your PRs, volume trends, and weak points – without you lifting a finger to set it up.",
  },
  {
    icon: "⚡",
    title: "10-Second Log",
    desc: "Average log time under 10 seconds. Your rest timer can finally be the slowest thing in your session.",
  },
];

const STEPS = [
  { num: "01", label: "Open the app", detail: "Tap once. That's the hardest part." },
  { num: "02", label: "Say your set", detail: '"Hit 225 on squat for 5, felt easy."' },
  { num: "03", label: "Done", detail: "It's logged, tracked, and ready for next time." },
];

const TESTIMONIALS = [
  { handle: "@ironmike_lifts", text: "I've tried every logging app. This is the first one I didn't abandon after a week.", avatar: "M" },
  { handle: "@garagegym.daily", text: "Feels like having a training partner who actually takes notes.", avatar: "G" },
  { handle: "@sarahprs", text: "The AI understood 'Romanian deads, 4 plates, paused at bottom' perfectly.", avatar: "S" },
];

const PROBLEMS = [
  { icon: "⏱️", title: "Logging Between Sets Sucks", desc: "Put down the bar, fumble with your phone, type in a form. By the time you're done, your rest is over." },
  { icon: "😤", title: "Apps Don't Understand Lifters", desc: "\"Did you mean Bench Press?\" No, I said bench. Most apps are built by people who don't lift." },
  { icon: "📉", title: "You Skip Tracking When It's Hard", desc: "Supersets, partials, drop sets—too annoying to log. So you don't. Data dies." },
];

const PRICING = [
  {
    name: "Free",
    price: "Forever",
    features: ["30-day history", "Voice logging", "Basic exercise tracking"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$7.99/mo",
    features: ["Unlimited history", "PR tracking & alerts", "Volume analytics", "AI insights", "Priority support"],
    cta: "Upgrade",
    highlight: true,
  },
  {
    name: "Founding Member",
    price: "$29.99",
    features: ["Lifetime Pro access", "Early adopter badge", "Direct input on roadmap"],
    cta: "Join (500 slots)",
  },
];

const FAQS = [
  {
    q: "What if the AI gets it wrong?",
    a: "You get a confirmation screen to edit before it saves. Takes 2 seconds. If it's way off, just re-record.",
  },
  {
    q: "Is my data private?",
    a: "Your workouts are yours. End-to-end encrypted, never sold, never shared. We make money from subscriptions, not data.",
  },
  {
    q: "Do I need internet to log?",
    a: "You need it to record (to hit Whisper API). But we're working on offline mode—voice data queued and synced when you're back online.",
  },
  {
    q: "What if I don't say all the details?",
    a: "The AI asks for clarification. E.g. if you say '225 bench' but no reps, it asks. Helps you log complete data.",
  },
  {
    q: "Can I use it without the app?",
    a: "Not yet. We're exploring web version, but the phone app is where the magic is—always in your pocket.",
  },
  {
    q: "Will you sell to a big fitness company?",
    a: "No. We're indie, bootstrapped, and staying that way. Your data and experience are sacred.",
  },
];

function useInView(threshold) {
  const t = threshold === undefined ? 0.15 : threshold;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function WaveformBar(props) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        borderRadius: 2,
        background: "#E8FF47",
        animation: "wave 1.1s ease-in-out infinite",
        animationDelay: props.delay + "s",
      }}
    />
  );
}

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');",
  "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
  ":root {",
  "  --black: #0A0A0A; --card: #111111; --border: #222222;",
  "  --lime: #E8FF47; --lime-dim: rgba(232,255,71,0.12);",
  "  --white: #F5F5F0; --muted: #666666;",
  "  --font-display: 'Bebas Neue', sans-serif;",
  "  --font-body: 'DM Sans', sans-serif;",
  "}",
  "html { scroll-behavior: smooth; }",
  "body { background: var(--black); color: var(--white); font-family: var(--font-body); overflow-x: hidden; }",
  "::selection { background: var(--lime); color: var(--black); }",
  "@keyframes wave { 0%, 100% { height: 8px; } 50% { height: 32px; } }",
  "@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }",
  "@keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }",
  "@keyframes floatAnim { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }",
  ".fade-up { opacity: 0; }",
  ".fade-up.visible { animation: fadeUp 0.65s ease forwards; }",
  ".fade-up.d1 { animation-delay: 0.05s; }",
  ".fade-up.d2 { animation-delay: 0.15s; }",
  ".fade-up.d3 { animation-delay: 0.25s; }",
  ".fade-up.d4 { animation-delay: 0.35s; }",
  ".fade-up.d5 { animation-delay: 0.45s; }",
  "nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 20px 40px; transition: background 0.3s, padding 0.3s; }",
  "nav.scrolled { background: rgba(10,10,10,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 14px 40px; }",
  ".logo { font-family: var(--font-display); font-size: 26px; letter-spacing: 2px; color: var(--white); text-decoration: none; }",
  ".logo span { color: var(--lime); }",
  ".nav-links { display: flex; gap: 32px; list-style: none; }",
  ".nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }",
  ".nav-links a:hover { color: var(--white); }",
  ".nav-cta { background: var(--lime); color: var(--black); font-family: var(--font-body); font-weight: 600; font-size: 13px; padding: 10px 22px; border: none; border-radius: 4px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.2s; }",
  ".nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }",
  ".hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 140px 40px 80px; position: relative; overflow: hidden; }",
  ".hero-bg { position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(232,255,71,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(232,255,71,0.03) 0%, transparent 60%); }",
  ".grid-overlay { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 60px 60px; }",
  ".hero-inner { position: relative; z-index: 1; max-width: 1100px; }",
  ".eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--lime); border: 1px solid rgba(232,255,71,0.3); padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; }",
  ".hero h1 { font-family: var(--font-display); font-size: clamp(72px, 10vw, 140px); line-height: 0.92; letter-spacing: 2px; color: var(--white); margin-bottom: 28px; }",
  ".hero h1 .accent { color: var(--lime); }",
  ".hero-sub { font-size: clamp(16px, 2.2vw, 20px); color: var(--muted); max-width: 520px; line-height: 1.65; margin-bottom: 44px; font-weight: 300; }",
  ".waitlist-form { display: flex; gap: 10px; max-width: 460px; }",
  ".waitlist-input { flex: 1; background: var(--card); border: 1px solid var(--border); color: var(--white); font-family: var(--font-body); font-size: 15px; padding: 14px 18px; border-radius: 6px; outline: none; transition: border-color 0.2s; }",
  ".waitlist-input:focus { border-color: var(--lime); }",
  ".waitlist-input::placeholder { color: var(--muted); }",
  ".waitlist-btn { background: var(--lime); color: var(--black); font-family: var(--font-body); font-weight: 700; font-size: 14px; padding: 14px 28px; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; transition: opacity 0.2s, transform 0.15s; }",
  ".waitlist-btn:hover { opacity: 0.88; transform: translateY(-2px); }",
  ".waitlist-btn:disabled { opacity: 0.6; cursor: not-allowed; }",
  ".success-msg { display: flex; align-items: center; gap: 12px; color: var(--lime); font-size: 16px; font-weight: 500; }",
  ".error-msg { display: flex; align-items: center; gap: 12px; color: #ff6b6b; font-size: 16px; font-weight: 500; }",
  ".waveform-demo { display: flex; align-items: center; gap: 5px; height: 44px; margin-top: 52px; }",
  ".mic-blob { position: relative; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--lime-dim); border: 1.5px solid rgba(232,255,71,0.3); margin-right: 16px; flex-shrink: 0; animation: floatAnim 3s ease-in-out infinite; }",
  ".mic-blob::before { content: ''; position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid rgba(232,255,71,0.15); animation: pulseRing 2s ease-out infinite; }",
  ".demo-text { font-size: 13px; color: var(--muted); margin-left: 16px; font-style: italic; }",
  "section { padding: 100px 40px; max-width: 1100px; margin: 0 auto; }",
  ".section-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--lime); font-weight: 600; margin-bottom: 16px; }",
  ".section-title { font-family: var(--font-display); font-size: clamp(40px, 5vw, 64px); letter-spacing: 1px; line-height: 1; margin-bottom: 60px; }",
  ".features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2px; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }",
  ".feature-card { background: var(--card); padding: 36px 32px; border-right: 1px solid var(--border); transition: background 0.3s; }",
  ".feature-card:last-child { border-right: none; }",
  ".feature-card:hover { background: #161616; }",
  ".feature-icon { font-size: 28px; margin-bottom: 18px; }",
  ".feature-title { font-size: 17px; font-weight: 600; margin-bottom: 10px; }",
  ".feature-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }",
  ".steps-wrap { display: flex; flex-direction: column; }",
  ".step-row { display: flex; align-items: flex-start; gap: 40px; padding: 40px 0; border-bottom: 1px solid var(--border); }",
  ".step-row:last-child { border-bottom: none; }",
  ".step-num { font-family: var(--font-display); font-size: 72px; color: var(--lime); line-height: 1; opacity: 0.25; flex-shrink: 0; width: 90px; transition: opacity 0.3s; }",
  ".step-row:hover .step-num { opacity: 1; }",
  ".step-label { font-size: 22px; font-weight: 600; margin-bottom: 8px; }",
  ".step-detail { font-size: 15px; color: var(--muted); font-style: italic; }",
  ".test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }",
  ".test-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 28px; transition: border-color 0.3s, transform 0.3s; }",
  ".test-card:hover { border-color: rgba(232,255,71,0.3); transform: translateY(-4px); }",
  ".test-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--lime-dim); border: 1px solid rgba(232,255,71,0.3); color: var(--lime); font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }",
  ".test-text { font-size: 15px; line-height: 1.6; margin-bottom: 14px; }",
  ".test-handle { font-size: 13px; color: var(--lime); font-weight: 500; }",
  ".cta-section { max-width: 100%; padding: 100px 40px; background: var(--card); border-top: 1px solid var(--border); text-align: center; }",
  ".cta-section h2 { font-family: var(--font-display); font-size: clamp(42px, 6vw, 80px); letter-spacing: 2px; margin-bottom: 20px; }",
  ".cta-sub { font-size: 17px; color: var(--muted); margin-bottom: 44px; }",
  ".cta-form { display: flex; gap: 10px; max-width: 460px; margin: 0 auto; }",
  "footer { padding: 40px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--muted); }",
  ".footer-logo { font-family: var(--font-display); font-size: 20px; color: var(--white); letter-spacing: 2px; }",
  ".footer-logo span { color: var(--lime); }",
  ".problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }",
  ".problem-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 28px; }",
  ".problem-icon { font-size: 32px; margin-bottom: 12px; }",
  ".problem-title { font-size: 17px; font-weight: 600; margin-bottom: 10px; }",
  ".problem-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }",
  ".waitlist-counter { text-align: center; padding: 60px 40px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 60px; }",
  ".counter-number { font-family: var(--font-display); font-size: clamp(48px, 8vw, 96px); color: var(--lime); line-height: 1; }",
  ".counter-text { font-size: 16px; color: var(--muted); margin-top: 12px; }",
  ".pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; }",
  ".price-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 32px; display: flex; flex-direction: column; transition: all 0.3s; }",
  ".price-card.highlight { border-color: var(--lime); background: linear-gradient(135deg, rgba(232,255,71,0.05) 0%, transparent 100%); transform: scale(1.05); }",
  ".price-card:hover { border-color: rgba(232,255,71,0.3); }",
  ".price-name { font-size: 20px; font-weight: 600; margin-bottom: 8px; }",
  ".price-amount { font-family: var(--font-display); font-size: 36px; letter-spacing: 1px; color: var(--lime); margin-bottom: 24px; }",
  ".price-features { flex: 1; margin-bottom: 24px; }",
  ".price-features li { font-size: 14px; color: var(--muted); margin-bottom: 12px; line-height: 1.5; }",
  ".price-cta { background: var(--lime); color: var(--black); font-family: var(--font-body); font-weight: 600; font-size: 13px; padding: 14px 24px; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.2s; }",
  ".price-cta:hover { opacity: 0.88; transform: translateY(-2px); }",
  ".faq-container { max-width: 760px; margin: 0 auto; }",
  ".faq-item { border-bottom: 1px solid var(--border); padding: 24px 0; }",
  ".faq-item:first-child { padding-top: 0; }",
  ".faq-item:last-child { border-bottom: none; padding-bottom: 0; }",
  ".faq-q { font-size: 17px; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }",
  ".faq-q:hover { color: var(--lime); }",
  ".faq-toggle { font-size: 20px; transition: transform 0.3s; }",
  ".faq-toggle.open { transform: rotate(180deg); }",
  ".faq-a { font-size: 15px; color: var(--muted); line-height: 1.6; margin-top: 12px; max-height: 0; overflow: hidden; transition: max-height 0.3s; }",
  ".faq-a.open { max-height: 500px; }",
  "@media (max-width: 640px) { nav { padding: 16px 20px; } .nav-links { display: none; } .hero { padding: 120px 20px 60px; } section { padding: 70px 20px; } .waitlist-form, .cta-form { flex-direction: column; } .step-num { font-size: 48px; width: 60px; } footer { flex-direction: column; gap: 12px; text-align: center; } .feature-card { border-right: none; border-bottom: 1px solid var(--border); } .feature-card:last-child { border-bottom: none; } .price-card.highlight { transform: scale(1); } }",
].join("\n");

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroIn] = useInView(0.1);
  const [probRef, probIn] = useInView(0.1);
  const [featRef, featIn] = useInView(0.1);
  const [howRef, howIn] = useInView(0.1);
  const [testRef, testIn] = useInView(0.1);
  const [pricRef, pricIn] = useInView(0.1);
  const [faqRef, faqIn] = useInView(0.1);
  const [ctaRef, ctaIn] = useInView(0.1);

  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      if (!formspreeId) {
        setError("Form not configured yet");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError("Failed to join waitlist. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const delays = [0, 0.1, 0.2, 0.3, 0.15, 0.05, 0.25, 0.35, 0.1, 0.2, 0.3, 0.05, 0.15, 0.25, 0.1];

  function cls(base, inV) {
    return base + (inV ? " visible" : "");
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">
          Voice<span>Lift</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={"#" + l.toLowerCase().replace(/ /g, "-")}>{l}</a>
            </li>
          ))}
        </ul>
        <button
          className="nav-cta"
          onClick={() => {
            const el = document.getElementById("cta");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Early Access
        </button>
      </nav>

      <div className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className={cls("eyebrow fade-up d1", heroIn)}>
            <span>●</span> Now accepting early access
          </div>
          <h1 className={cls("fade-up d2", heroIn)}>
            LOG YOUR<br />WORKOUT.<br />
            <span className="accent">SAY IT.</span>
          </h1>
          <p className={cls("hero-sub fade-up d3", heroIn)}>
            No more logging between sets. Voice-first AI workout tracking that understands how you actually talk about lifting.
          </p>
          {!submitted ? (
            <form className={cls("waitlist-form fade-up d4", heroIn)} onSubmit={handleSubmit}>
              <input
                className="waitlist-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                disabled={loading}
                required
              />
              <button className="waitlist-btn" type="submit" disabled={loading}>
                {loading ? "..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <div className={cls("success-msg fade-up", heroIn)}>
              <span style={{ fontSize: 22 }}>✓</span> You are on the list. We will be in touch.
            </div>
          )}
          {error && <div className={cls("error-msg fade-up", heroIn)}>⚠ {error}</div>}
          <div className={cls("waveform-demo fade-up d5", heroIn)}>
            <div className="mic-blob">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="#E8FF47" />
                <path d="M5 11a7 7 0 0 0 14 0" stroke="#E8FF47" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="#E8FF47" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="9" y1="22" x2="15" y2="22" stroke="#E8FF47" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            {delays.map((d, i) => (
              <WaveformBar key={i} delay={d} />
            ))}
            <span className="demo-text">"225 on squat, 3 sets, last one was a grind"</span>
          </div>
        </div>
      </div>

      <section id="the-problem" ref={probRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", probIn)}>The Problem</p>
        <h2 className={cls("section-title fade-up d2", probIn)}>
          Why logging sucks<br />right now.
        </h2>
        <div className={cls("problem-grid fade-up d3", probIn)}>
          {PROBLEMS.map((p) => (
            <div className="problem-card" key={p.title}>
              <div className="problem-icon">{p.icon}</div>
              <div className="problem-title">{p.title}</div>
              <div className="problem-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" ref={featRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", featIn)}>Why VoiceLift</p>
        <h2 className={cls("section-title fade-up d2", featIn)}>
          Built for how<br />lifters think.
        </h2>
        <div className={cls("features-grid fade-up d3", featIn)}>
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" ref={howRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", howIn)}>How It Works</p>
        <h2 className={cls("section-title fade-up d2", howIn)}>
          Three steps.<br />One is talking.
        </h2>
        <div className={cls("steps-wrap fade-up d3", howIn)}>
          {STEPS.map((s) => (
            <div className="step-row" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div>
                <div className="step-label">{s.label}</div>
                <div className="step-detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={testRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", testIn)}>Early Feedback</p>
        <h2 className={cls("section-title fade-up d2", testIn)}>
          Lifters who<br />tried it.
        </h2>
        <div className={cls("test-grid fade-up d3", testIn)}>
          {TESTIMONIALS.map((t) => (
            <div className="test-card" key={t.handle}>
              <div className="test-avatar">{t.avatar}</div>
              <p className="test-text">"{t.text}"</p>
              <span className="test-handle">{t.handle}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className={cls("waitlist-counter fade-up", testIn)}>
          <div className="counter-number">500+</div>
          <div className="counter-text">Lifters on the waitlist</div>
        </div>
      </section>

      <section id="pricing" ref={pricRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", pricIn)}>Pricing</p>
        <h2 className={cls("section-title fade-up d2", pricIn)}>
          Simple, transparent<br />pricing.
        </h2>
        <div className={cls("pricing-grid fade-up d3", pricIn)}>
          {PRICING.map((tier) => (
            <div className={`price-card ${tier.highlight ? "highlight" : ""}`} key={tier.name}>
              <div className="price-name">{tier.name}</div>
              <div className="price-amount">{tier.price}</div>
              <ul className="price-features">
                {tier.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <button className="price-cta">{tier.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" ref={faqRef} style={{ borderTop: "1px solid var(--border)" }}>
        <p className={cls("section-label fade-up d1", faqIn)}>FAQ</p>
        <h2 className={cls("section-title fade-up d2", faqIn)}>
          Questions answered.
        </h2>
        <div className={cls("faq-container fade-up d3", faqIn)}>
          {FAQS.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div
                className="faq-q"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className={`faq-toggle ${expandedFaq === idx ? "open" : ""}`}>▼</span>
              </div>
              <div className={`faq-a ${expandedFaq === idx ? "open" : ""}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-section" id="cta" ref={ctaRef}>
        <p className={cls("section-label fade-up d1", ctaIn)}>Early Access</p>
        <h2 className={cls("fade-up d2", ctaIn)}>
          Stop logging.<br />
          <span style={{ color: "var(--lime)" }}>Start lifting.</span>
        </h2>
        <p className={cls("cta-sub fade-up d3", ctaIn)}>
          Join the waitlist. First 500 get lifetime early-adopter pricing.
        </p>
        {!submitted ? (
          <form className={cls("cta-form fade-up d4", ctaIn)} onSubmit={handleSubmit}>
            <input
              className="waitlist-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
              required
            />
            <button className="waitlist-btn" type="submit" disabled={loading}>
              {loading ? "..." : "Join Now"}
            </button>
          </form>
        ) : (
          <div className={cls("success-msg fade-up", ctaIn)} style={{ justifyContent: "center" }}>
            <span style={{ fontSize: 22 }}>✓</span> You are on the list. We will be in touch.
          </div>
        )}
        {error && <div className={cls("error-msg fade-up", ctaIn)} style={{ justifyContent: "center" }}>⚠ {error}</div>}
      </div>

      <footer>
        <span className="footer-logo">
          Voice<span>Lift</span>
        </span>
        <span>2026 VoiceLift. Built for lifters, by lifters.</span>
        <span>Privacy · Terms</span>
      </footer>
    </div>
  );
}
