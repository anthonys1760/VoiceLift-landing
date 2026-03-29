import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Features", "How It Works", "Roadmap", "FAQ"];

const FEATURES = [
  {
    icon: "🎙️",
    title: "Just Say It",
    desc: 'Say "3 sets of bench at 185, last set was tough" and it\'s logged. Or type it—whatever fits the moment. Voice first, text always available.',
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
    icon: "⌨️",
    title: "Voice or Text, Your Call",
    desc: "Prefer to type? You can. VoiceLift is voice-first but never voice-only. Log however you want—no judgment, no friction.",
  },
];

const STEPS = [
  { num: "01", label: "Open the app", detail: "Tap once. That's the hardest part.", tag: null },
  { num: "02", label: "Say your set", detail: '"Hit 225 on squat for 5, felt easy."', tag: null },
  { num: "03", label: "Done", detail: "It's logged, tracked, and ready for next time.", tag: null },
  { num: "04", label: 'Say "Hey VoiceLift"', detail: "Skip the tap entirely. Wake the app with your voice and log hands-free, mid-session. Coming soon.", tag: "Coming Soon" },
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
    features: ["10 voice logs/month", "Basic exercise tracking", "30-day history"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    sub: "or $79.99/yr — save 33%",
    features: ["Unlimited voice logging", "Unlimited history", "PR tracking & alerts", "Volume analytics", "AI insights", "Priority support"],
    cta: "Upgrade",
    highlight: true,
  },
  {
    name: "Founding Member",
    price: "$69.99",
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
  {
    q: "What is wake-word triggering and when is it coming?",
    a: 'Wake-word triggering lets you say "Hey VoiceLift" to open the app and start logging without touching your phone. It\'s our top-priority feature after launch. Early access members will get it first.',
  },
  {
    q: "Do I have to use my voice? What if I'm in a loud gym or don't want to speak?",
    a: "Voice is the default, but typing always works. Tap the keyboard icon on any log screen and type your set exactly as you'd say it—the AI processes it the same way. Loud gym, headphones in, crowded space—whatever the situation, you're covered.",
  },
];

const ROADMAP = [
  { icon: "🗣️", title: "Wake-Word Triggering", desc: "Say 'Hey VoiceLift' to log hands-free, mid-session.", status: "coming-soon" },
  { icon: "📱", title: "Web App", desc: "Full web experience for logging from any device.", status: "coming-soon" },
  { icon: "⌚", title: "Apple Watch Support", desc: "Log your sets right from your wrist with native watchOS app.", status: "coming-soon" },
  { icon: "⚡", title: "Offline Mode", desc: "Log without internet. Sync when you're back online.", status: "planned" },
  { icon: "📊", title: "Advanced Analytics", desc: "AI-powered insights on your training patterns and peaks.", status: "planned" },
  { icon: "👥", title: "Social Sharing", desc: "Share PRs and training achievements with friends.", status: "planned" },
  { icon: "⚙️", title: "Custom Movements", desc: "Create custom exercises and tracking parameters.", status: "planned" },
];

function useInView(threshold) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

const CSS = [
  ":root { --bg: #0A0A0A; --text: #F5F5F5; --muted: #999; --border: #222; --card: #1a1a1a; --lime: #e8ff47; --black: #0A0A0A; --font-display: 'Inter', system-ui; --font-body: 'Inter', system-ui; }",
  "* { margin: 0; padding: 0; box-sizing: border-box; }",
  "html { scroll-behavior: smooth; }",
  "body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; }",
  "a { color: inherit; text-decoration: none; }",
  "button { font-family: inherit; }",
  "nav { display: flex; align-items: center; justify-content: space-between; padding: 0px 40px; background: transparent; transition: all 0.3s; position: fixed; width: 100%; top: 0; left: 0; right: 0; z-index: 1000; }",
  "nav.scrolled { background: rgba(10,10,10,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }",
  ".logo { display: inline-flex; align-items: center; font-weight: 700; font-size: 16px; transition: opacity 0.2s; cursor: pointer; }",
  ".logo:hover { opacity: 0.8; }",
  ".nav-links { list-style: none; display: flex; gap: 40px; }",
  ".nav-links a { font-size: 14px; color: var(--muted); transition: color 0.2s; }",
  ".nav-links a:hover { color: var(--text); }",
  ".nav-cta { background: var(--lime); color: var(--black); font-size: 12px; font-weight: 600; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.2s; }",
  ".nav-cta:hover { opacity: 0.88; transform: translateY(-2px); }",
  ".logo-img { display: block; height: 180px; width: auto; }",
  ".logo-text { display: none; font-weight: 700; font-size: 16px; white-space: nowrap; }",
  ".logo-text-lift { color: var(--lime); }",
  "section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }",
  ".hero { padding: 220px 40px 20px; max-width: 1200px; margin: 0 auto; text-align: center; position: relative; }",
  ".hero-bg { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(232,255,71,0.1) 0%, transparent 70%); border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }",
  ".grid-overlay { position: fixed; width: 100%; height: 100%; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; z-index: 0; top: 0; left: 0; }",
  ".hero-inner { position: relative; z-index: 1; }",
  ".eyebrow { font-size: 13px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }",
  ".eyebrow.visible { opacity: 1; transform: translateY(0); }",
  ".hero h1 { font-family: var(--font-display); font-size: clamp(48px, 10vw, 84px); font-weight: 700; margin: 24px 0; letter-spacing: -0.02em; line-height: 1.1; }",
  ".hero .subtitle { font-size: clamp(16px, 3vw, 20px); color: var(--muted); margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6; }",
  ".hero-phones { margin-top: 16px; display: flex; justify-content: center; }",
  ".phone-frame { position: relative; width: min(420px, 90vw); background: #1a1a1a; border-radius: 50px; padding: 10px; box-shadow: 0 0 0 2px #333, 0 0 0 5px #111, 0 50px 100px rgba(0,0,0,0.7), 0 0 60px rgba(232,255,71,0.06); }",
  ".phone-frame::before { content: ''; position: absolute; right: -5px; top: 110px; width: 4px; height: 55px; background: #2a2a2a; border-radius: 0 3px 3px 0; box-shadow: 0 70px 0 #2a2a2a; }",
  ".phone-frame::after { content: ''; position: absolute; left: -5px; top: 80px; width: 4px; height: 35px; background: #2a2a2a; border-radius: 3px 0 0 3px; box-shadow: 0 50px 0 #2a2a2a, 0 100px 0 #2a2a2a; }",
  ".phone-screen { border-radius: 42px; overflow: hidden; background: #000; aspect-ratio: 9/19.5; position: relative; }",
  ".phone-screen video { width: 100%; height: 100%; object-fit: cover; display: block; }",
  ".d1 { animation-delay: 0s; }",
  ".d2 { animation-delay: 0.1s; }",
  ".d3 { animation-delay: 0.2s; }",
  ".d4 { animation-delay: 0.3s; }",
  ".d5 { animation-delay: 0.4s; }",
  ".d6 { animation-delay: 0.5s; }",
  ".fade-up { opacity: 0; transform: translateY(20px); animation: fadeUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }",
  "@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }",
  ".pulse-dot { color: var(--lime); animation: pulse 2s ease-in-out infinite; }",
  "@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }",
  ".hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }",
  ".transcript-bubble { display: inline-flex; align-items: center; gap: 12px; background: rgba(232,255,71,0.06); border: 1px solid rgba(232,255,71,0.18); border-radius: 12px; padding: 14px 20px; margin-bottom: 12px; max-width: 520px; }",
  ".transcript-mic { font-size: 18px; flex-shrink: 0; animation: micPulse 1.4s ease-in-out infinite; }",
  "@keyframes micPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }",
  ".transcript-text { font-size: 15px; color: var(--text); text-align: left; line-height: 1.5; min-height: 22px; }",
  ".transcript-cursor { display: inline-block; width: 2px; height: 15px; background: var(--lime); margin-left: 2px; vertical-align: middle; animation: blink 0.8s step-end infinite; }",
  "@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }",
  ".transcript-thinking { display: inline-flex; gap: 3px; margin-left: 4px; vertical-align: middle; }",
  ".transcript-thinking span { display: inline-block; width: 5px; height: 5px; background: var(--lime); border-radius: 50%; animation: thinkDot 1s ease-in-out infinite; }",
  ".transcript-thinking span:nth-child(2) { animation-delay: 0.2s; }",
  ".transcript-thinking span:nth-child(3) { animation-delay: 0.4s; }",
  "@keyframes thinkDot { 0%,80%,100% { opacity: 0.2; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.2); } }",
  ".cta-primary { background: var(--lime); color: var(--black); font-weight: 600; padding: 16px 32px; border-radius: 8px; border: none; cursor: pointer; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s; }",
  ".cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }",
  ".cta-secondary { background: transparent; border: 1px solid var(--border); color: var(--text); font-weight: 600; padding: 16px 32px; border-radius: 8px; cursor: pointer; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s; }",
  ".cta-secondary:hover { border-color: rgba(232,255,71,0.3); }",
  ".feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }",
  ".feature-card { background: var(--card); padding: 40px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }",
  ".feature-card:nth-child(2n) { border-right: none; }",
  ".feature-card:nth-last-child(-n+2) { border-bottom: none; }",
  ".feature-icon { font-size: 32px; margin-bottom: 16px; }",
  ".feature-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; }",
  ".feature-desc { font-size: 15px; color: var(--muted); line-height: 1.6; }",
  ".steps-container { max-width: 900px; margin: 0 auto; }",
  ".step-row { display: grid; grid-template-columns: 80px 1fr; gap: 40px; align-items: start; margin-bottom: 40px; }",
  ".step-num { font-family: var(--font-display); font-size: 64px; font-weight: 700; color: var(--lime); line-height: 1; }",
  ".step-content { }",
  ".step-label { font-size: 20px; font-weight: 600; margin-bottom: 8px; }",
  ".step-detail { font-size: 15px; color: var(--muted); margin-bottom: 8px; }",
  ".testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }",
  ".testimonial-card { background: var(--card); border: 1px solid var(--border); padding: 28px; border-radius: 12px; }",
  ".testimonial-text { font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; font-style: italic; }",
  ".testimonial-author { display: flex; align-items: center; gap: 12px; }",
  ".testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--lime), #a8e6cf); display: flex; align-items: center; justify-content: center; color: var(--black); font-weight: 700; font-size: 16px; }",
  ".testimonial-handle { font-size: 13px; color: var(--muted); }",
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
  ".price-amount { font-family: var(--font-display); font-size: 36px; letter-spacing: 1px; color: var(--lime); margin-bottom: 8px; }",
  ".price-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }",
  ".price-features { flex: 1; margin-bottom: 24px; }",
  ".price-features li { font-size: 14px; color: var(--muted); margin-bottom: 12px; line-height: 1.5; }",
  ".price-cta { background: var(--lime); color: var(--black); font-family: var(--font-body); font-weight: 600; font-size: 13px; padding: 14px 24px; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.2s; }",
  ".price-cta:hover { opacity: 0.88; transform: translateY(-2px); }",
  ".faq-container { max-width: 900px; margin: 0 auto; display: grid; gap: 12px; }",
  ".faq-item { background: linear-gradient(135deg, rgba(232,255,71,0.03) 0%, transparent 100%); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; transition: all 0.3s; }",
  ".faq-item:hover { border-color: rgba(232,255,71,0.4); background: linear-gradient(135deg, rgba(232,255,71,0.08) 0%, transparent 100%); }",
  ".faq-q { font-size: 16px; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; color: var(--text); background: transparent; border: none; font-family: inherit; width: 100%; text-align: left; padding: 20px; }",
  ".faq-q:hover { color: var(--lime); }",
  ".faq-toggle { font-size: 18px; transition: transform 0.3s ease; color: var(--lime); flex-shrink: 0; margin-left: 16px; }",
  ".faq-toggle.open { transform: rotate(180deg); }",
  ".faq-a { font-size: 15px; color: var(--muted); line-height: 1.7; padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }",
  ".faq-a.open { max-height: 500px; padding: 0 20px 20px; }",
  ".coming-soon-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--black); background: var(--lime); padding: 3px 9px; border-radius: 100px; vertical-align: middle; }",
  ".step-row--upcoming { opacity: 0.7; border-left: 2px solid rgba(232,255,71,0.25); padding-left: 20px; margin-left: -22px; }",
  ".step-row--upcoming:hover { opacity: 1; }",
  ".roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }",
  ".roadmap-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 32px 28px; transition: border-color 0.3s, transform 0.3s; }",
  ".roadmap-card:hover { transform: translateY(-4px); }",
  ".roadmap-card--coming-soon { border-color: rgba(232,255,71,0.25); background: linear-gradient(135deg, rgba(232,255,71,0.04) 0%, var(--card) 60%); }",
  ".roadmap-card--coming-soon:hover { border-color: rgba(232,255,71,0.5); }",
  ".roadmap-card--planned { border-color: var(--border); }",
  ".roadmap-card--planned:hover { border-color: rgba(232,255,71,0.2); }",
  ".roadmap-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }",
  ".roadmap-icon { font-size: 28px; }",
  ".roadmap-badge { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }",
  ".roadmap-badge--coming-soon { color: var(--black); background: var(--lime); }",
  ".roadmap-badge--planned { color: var(--muted); background: transparent; border: 1px solid var(--border); }",
  ".roadmap-title { font-size: 17px; font-weight: 600; margin-bottom: 10px; }",
  ".roadmap-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }",
  ".hamburger { display: none; background: transparent; border: none; color: var(--text); font-size: 24px; cursor: pointer; padding: 0; width: 28px; height: 28px; }",
  ".mobile-menu { display: none; position: fixed; top: 60px; right: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); border-left: 1px solid var(--border); width: min(280px, calc(100vw - 20px)); z-index: 999; }",
  ".mobile-menu.open { display: block; }",
  ".mobile-menu a { display: block; width: 100%; padding: 16px 20px; color: var(--muted); text-align: left; text-decoration: none; font-size: 15px; cursor: pointer; transition: color 0.2s; }",
  ".mobile-menu a:hover { color: var(--text); }",
  ".mobile-menu-cta { background: var(--lime); color: var(--black); font-weight: 600; margin: 12px; padding: 12px 16px; border: none; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; width: calc(100% - 24px); }",
  ".mobile-menu-cta:hover { opacity: 0.88; }",
  "@media (max-width: 640px) { nav { padding: 8px 10px; } .logo-img { display: none; } .logo-text { display: block; font-size: 13px; } .hamburger { display: block; } .nav-links { display: none; } .nav-cta { display: none; } .hero { padding: 120px 20px 60px; } section { padding: 70px 20px; } .waitlist-form, .cta-form { flex-direction: column; } .step-num { font-size: 48px; width: 60px; } .step-row--upcoming { margin-left: 0; padding-left: 16px; } footer { flex-direction: column; gap: 12px; text-align: center; } .feature-card { border-right: none; border-bottom: 1px solid var(--border); } .feature-card:last-child { border-bottom: none; } .price-card.highlight { transform: scale(1); } .hero h1 { font-size: clamp(32px, 8vw, 48px); } .hero .subtitle { font-size: clamp(14px, 2.5vw, 16px); } .hero-phones { flex-direction: column; gap: 20px; } .hero-phone-item { width: 100%; } .hero-phone-item img { max-width: 130vw; } .problem-grid { grid-template-columns: 1fr; } .feature-grid { grid-template-columns: 1fr; } .testimonial-grid { grid-template-columns: 1fr; } .roadmap-grid { grid-template-columns: 1fr; } .pricing-grid { grid-template-columns: 1fr; } }",
].join("\n");

export default function Home() {
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
  const [roadmapRef, roadmapIn] = useInView(0.1);

  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);

  const PHRASES = [
    "3 sets of bench at 185, last set was tough",
    "Romanian deads, 4 plates, paused at the bottom",
    "Hit 225 on squat for 5, felt easy",
    "Superset: pull-ups and dips, 4 rounds",
    "Overhead press 135, 3 sets of 8",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    let timeout;
    if (!deleting && !processing && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && !processing && displayed.length === phrase.length) {
      timeout = setTimeout(() => setProcessing(true), 1000);
    } else if (processing) {
      timeout = setTimeout(() => { setProcessing(false); setDeleting(true); }, 7000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, processing, phraseIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

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
        <Link to="/" className="logo">
          <img src={import.meta.env.BASE_URL + "voicelift-logo.png"} alt="VoiceLift" className="logo-img" />
          <span className="logo-text">Voice<span className="logo-text-lift">Lift</span></span>
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={"#" + l.toLowerCase().replace(/ /g, "-")}>{l}</a>
            </li>
          ))}
          <li>
            <Link to="/blog">Blog</Link>
          </li>
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
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      <div className={mobileMenuOpen ? "mobile-menu open" : "mobile-menu"}>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={"#" + l.toLowerCase().replace(/ /g, "-")}
            onClick={() => setMobileMenuOpen(false)}
          >
            {l}
          </a>
        ))}
        <Link to="/blog" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", padding: "16px 20px", color: "var(--muted)", textDecoration: "none" }}>
          Blog
        </Link>
        <button
          className="mobile-menu-cta"
          onClick={() => {
            const el = document.getElementById("cta");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
          }}
        >
          Get Early Access
        </button>
      </div>

      <div className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className={cls("eyebrow fade-up d1", heroIn)}>
            <span className="pulse-dot">●</span> Now accepting early access
          </div>
          <h1 className={cls("fade-up d2", heroIn)}>Train. Don't Type.</h1>
          <p className={cls("subtitle fade-up d3", heroIn)}>
            VoiceLift is voice-first. No forms, no friction. Say your set and it's logged instantly—AI understands gym slang, supersets, and edge cases.
          </p>

          <div className={cls("hero-ctas fade-up d4", heroIn)}>
            <button className="cta-primary" onClick={() => document.getElementById("cta").scrollIntoView({ behavior: "smooth" })}>
              Get Early Access
            </button>
            <button className="cta-secondary" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
              Learn More
            </button>
          </div>

          <div className={cls("fade-up d5", heroIn)} style={{ display: "flex", justifyContent: "center" }}>
            <div className="transcript-bubble">
              <span className="transcript-mic">🎙️</span>
              <span className="transcript-text">
                {displayed}<span className="transcript-cursor" />
              </span>
            </div>
          </div>

          <div className={cls("hero-phones fade-up d6", heroIn)}>
            <div className="phone-frame">
              <div className="phone-screen">
                <video ref={videoRef} autoPlay muted loop playsInline preload="auto">
                  <source src={import.meta.env.BASE_URL + "hero-demo.mp4"} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="problems-section" id="problems" ref={probRef}>
        <div style={{ maxWidth: "900px", margin: "0 auto", marginBottom: "60px" }}>
          <h2 className={cls("fade-up", probIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "16px" }}>
            The Problem
          </h2>
          <p className={cls("fade-up", probIn)} style={{ fontSize: "18px", color: "var(--muted)", lineHeight: "1.6" }}>
            Logging workouts sucks. Typing forms between sets kills your momentum. Apps don't understand how lifters talk. You skip tracking complicated sets, so your data dies with your effort.
          </p>
        </div>
        <div className="problem-grid">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="problem-card">
              <div className="problem-icon">{p.icon}</div>
              <h3 className="problem-title">{p.title}</h3>
              <p className="problem-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" ref={featRef}>
        <h2 className={cls("fade-up", featIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "40px", textAlign: "center" }}>
          How It Works
        </h2>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={cls("feature-card fade-up", featIn)} style={{ transitionDelay: `${delays[i]}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" ref={howRef}>
        <h2 className={cls("fade-up", howIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "60px", textAlign: "center" }}>
          The Process
        </h2>
        <div className="steps-container">
          {STEPS.map((step, i) => (
            <div key={i} className={cls(`step-row ${step.tag ? "step-row--upcoming" : ""} fade-up`, howIn)} style={{ transitionDelay: `${delays[i]}s` }}>
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <div className="step-label" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {step.label}
                  {step.tag && <span className="coming-soon-badge">{step.tag}</span>}
                </div>
                <p className="step-detail">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={testRef}>
        <h2 className={cls("fade-up", testIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "40px", textAlign: "center" }}>
          What Lifters Say
        </h2>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={cls("testimonial-card fade-up", testIn)} style={{ transitionDelay: `${delays[i]}s` }}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-handle">{t.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" ref={pricRef}>
        <h2 className={cls("fade-up", pricIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>
          Simple Pricing
        </h2>
        <p className={cls("fade-up", pricIn)} style={{ fontSize: "18px", color: "var(--muted)", lineHeight: "1.6", textAlign: "center", marginBottom: "40px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          Free forever for basic logging. Pro for power users. Founding Member for true believers.
        </p>
        <div className="pricing-grid">
          {PRICING.map((p) => (
            <div key={p.name} className={cls(`price-card fade-up ${p.highlight ? "highlight" : ""}`, pricIn)}>
              <h3 className="price-name">{p.name}</h3>
              <div className="price-amount">{p.price}</div>
              {p.sub && <div className="price-sub">{p.sub}</div>}
              <ul className="price-features">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <button className="price-cta">{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" ref={faqRef}>
        <h2 className={cls("fade-up", faqIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "40px", textAlign: "center" }}>
          Questions?
        </h2>
        <div className="faq-container">
          {FAQS.map((faq, i) => (
            <div key={i} className={cls("faq-item fade-up", faqIn)} style={{ transitionDelay: `${delays[i]}s` }}>
              <button
                className="faq-q"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                {faq.q}
                <span className={`faq-toggle ${expandedFaq === i ? "open" : ""}`}>∨</span>
              </button>
              <div className={`faq-a ${expandedFaq === i ? "open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" ref={roadmapRef}>
        <h2 className={cls("fade-up", roadmapIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "40px", textAlign: "center" }}>
          Roadmap
        </h2>
        <div className="roadmap-grid">
          {ROADMAP.map((item) => (
            <div key={item.title} className={cls(`roadmap-card roadmap-card--${item.status} fade-up`, roadmapIn)}>
              <div className="roadmap-card-header">
                <span className="roadmap-icon">{item.icon}</span>
                <span className={`roadmap-badge roadmap-badge--${item.status}`}>
                  {item.status === "coming-soon" ? "Coming Soon" : "Planned"}
                </span>
              </div>
              <h3 className="roadmap-title">{item.title}</h3>
              <p className="roadmap-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" ref={ctaRef}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <h2 className={cls("fade-up", ctaIn)} style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 600, marginBottom: "24px" }}>
            Join the Waitlist
          </h2>
          <p className={cls("fade-up", ctaIn)} style={{ fontSize: "16px", color: "var(--muted)", marginBottom: "40px", lineHeight: "1.6" }}>
            Early access members get exclusive perks, direct input on features, and lifetime pricing. We're selective—only 500 spots.
          </p>

          {submitted ? (
            <div className={cls("fade-up", ctaIn)} style={{ background: "rgba(232,255,71,0.1)", border: "1px solid rgba(232,255,71,0.3)", padding: "24px", borderRadius: "8px", color: "var(--lime)" }}>
              ✓ Thanks for joining! Check your email for early access details.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="waitlist-form" style={{ display: "flex", gap: "12px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  padding: "14px 16px",
                  borderRadius: "6px",
                  color: "var(--text)",
                  fontSize: "14px",
                }}
              />
              <button type="submit" className="cta-primary" disabled={loading}>
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}

          {error && <p style={{ color: "#ff6b6b", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
        </div>
      </section>

      <footer style={{ background: "var(--card)", border: "1px solid var(--border)", marginTop: "60px", padding: "40px", textAlign: "center", fontSize: "13px", color: "var(--muted)" }}>
        <p>
          © 2026 VoiceLift. Indie. Bootstrapped. Yours.{" "}
          <Link to="/blog" style={{ color: "var(--lime)", textDecoration: "underline" }}>
            Read our blog
          </Link>
        </p>
      </footer>
    </div>
  );
}
