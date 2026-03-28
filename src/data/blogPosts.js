export const blogPosts = [
  {
    id: "voice-logging-benefits",
    slug: "voice-logging-benefits",
    title: "Why Voice Logging is the Future of Workout Tracking",
    excerpt: "Discover how voice-first logging removes friction from your training and keeps you in the moment.",
    content: `
# Why Voice Logging is the Future of Workout Tracking

Between sets, the last thing you want to do is fumble with your phone and fill out forms. Yet that's exactly what traditional fitness apps require. Voice logging changes everything.

## The Problem with Typing Your Workouts

Most fitness apps force you to:
- Put down heavy weights or step away from equipment
- Pull out your phone (which is probably already sweaty)
- Navigate menus, dropdowns, and forms
- Type or select exercises, weights, and reps
- By the time you're done, your rest period is over

This friction is why people stop logging. You skip tracking complicated sets like supersets or drop sets because it's too annoying. Your data dies with your effort.

## How Voice Logging Works

With VoiceLift, you say: **"3 sets of bench at 185, last set was tough"** and it's logged instantly. The AI understands gym slang, partial reps, and complex movements. You don't need to be precise—just speak naturally, the way you'd tell a training partner.

### The Real Benefits

**1. You Stay in the Moment**
No phones, no forms. Speak and move on. Your brain stays on the next set, not on data entry.

**2. Better Data Capture**
Because it's effortless, you actually log everything. Supersets, drop sets, partials—all recorded. Your data now reflects your actual training.

**3. Voice is Faster**
Speaking is 3-5x faster than typing. You save minutes per workout that add up over time.

**4. Works for Everyone**
Prefer text? Fine. Prefer voice? Even better. VoiceLift is voice-first, but never voice-only. You choose your method each time.

## The AI Understands Lifters

VoiceLift's AI was trained on how lifters actually talk. Not how form designers think they talk.

- "Romanian deads, 4 plates, paused at bottom" → understood perfectly
- "225 bench, felt easy, could've gone heavier" → captured and contextualized
- "Supersets with curls and overhead press" → correctly parsed

Traditional fitness apps get confused by gym slang. VoiceLift speaks your language.

## Privacy & Your Data

Your workouts are yours. We use end-to-end encryption, never sell your data, and make money from subscriptions—not by harvesting your information.

## The Future is Voice-First

Logging your workouts shouldn't require leaving the gym floor. Voice logging gets you back to training faster, captures more complete data, and makes fitness tracking feel natural instead of tedious.

That's the VoiceLift difference.
    `,
    author: "VoiceLift Team",
    date: "2026-03-27",
    category: "Features",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
  },
  {
    id: "ai-understands-gym-slang",
    slug: "ai-understands-gym-slang",
    title: "How Our AI Learned to Speak Lifter",
    excerpt: "The technical story behind building an AI that understands the way lifters actually talk.",
    content: `
# How Our AI Learned to Speak Lifter

Most fitness apps are built by engineers who don't lift. That's why their AI gets confused by "Romanian deads," misunderstands "paused reps," and asks clarifying questions that waste your time.

VoiceLift's AI was trained differently. It learned from lifters, for lifters.

## The Problem We Solved

When you say "3 plates for 5," a standard speech-to-text API hears "three plates for five." But the context is missing. What exercise? How was that plate distributed? A lifter knows—but the app doesn't.

Our AI fills in the gaps using:
- Gym-specific vocabulary (compounds, accessories, RPE, AMRAP, etc.)
- Common rep ranges and load patterns for different exercises
- The relationship between exercises (e.g., if you say "heavy rows," it probably means strength work)
- Temporal context (e.g., "felt easy" implies you had more in the tank)

## How We Built It

1. **Collected Real Data**: We gathered thousands of voice logs from actual lifters describing their sets naturally
2. **Trained on Context**: Our model learned that "225 bench" means 225 pounds on the barbell, not 225 total plates
3. **Handled Ambiguity**: We trained it to ask clarifying questions when needed, but only when genuinely necessary
4. **Optimized for Speed**: The entire process—record, transcribe, parse, confirm—happens in under 10 seconds

## Real Examples of Our AI's Understanding

- **"Hit 5 reps at 8 RPE, could've done 2 more"** → Understands this was a controlled set with headroom
- **"Paused bench, 3 seconds bottom"** → Recognizes paused variations and their specific demands
- **"Supersets: curls into close-grip bench, 3 sets"** → Correctly parses the pair and set count
- **"Rack pulls, pins at mid-shin, felt strong"** → Understands the variation and your state

These aren't coincidences. They're the result of training on how lifters actually communicate.

## The Advantage

While other apps force you into rigid menus and dropdown selections, VoiceLift lets you speak naturally. The AI does the heavy lifting (pun intended) to understand you, not the other way around.

That's what it means to build for lifters.
    `,
    author: "VoiceLift Team",
    date: "2026-03-24",
    category: "Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  {
    id: "losing-data-hurts-progress",
    slug: "losing-data-hurts-progress",
    title: "The Hidden Cost of Skipping Workout Logs",
    excerpt: "Why incomplete tracking is silently killing your progress, and how to fix it.",
    content: `
# The Hidden Cost of Skipping Workout Logs

You know you should log everything. But supersets are annoying to enter. Drop sets require multiple entries. Partials don't fit the form fields. So you skip them.

Over months, your data becomes incomplete. Your insights become worthless. Your progress tracking becomes guesswork.

This is the tax of friction.

## What You're Missing

When you skip logging hard sets:

- **No Volume History**: You don't track total reps or tonnage. You can't see if you're actually making progress
- **No Pattern Recognition**: The AI can't identify your weak points if it doesn't have the data
- **No PR Alerts**: You might hit a new PR in a movement but never realize it because it wasn't logged
- **False Progress**: You think you're progressing based on incomplete data

Imagine training all year but only logging 60% of your work. That's what most lifters do.

## Why Traditional Apps Fail Here

Form-based logging creates friction. Each entry requires:
- Selecting the exercise (scrolling through a massive list)
- Choosing sets/reps
- Entering weight
- Confirming

For a superset with 3 movements? That's 3 times the friction. Most people quit halfway through.

## How VoiceLift Solves It

You say: **"Supersets: rows, dips, curls, 3 sets, 8, 6, 5 reps"**

Done. One log. Complete data capture.

The AI understands the structure, parses the movements, and records everything. No friction, no skipped data.

## The Math of Complete Tracking

If you train 4 days a week and skip 40% of your complex movements:

- **Missing Data**: ~80 sets per month
- **Lost Insights**: Can't track which movements are weak
- **Missed PRs**: No record of peak strength moments
- **Inaccurate Progress**: You think you're up 10% when you might be up 15%

Over a year, that's 960 sets of missing data. That's significant.

## Start Small, Build the Habit

You don't need to track perfectly from day one. But the easier logging becomes, the more you'll actually do it.

Voice logging removes the biggest barrier: friction.

## The Real Progress

Progress isn't just about lifting heavier. It's about *knowing* that you lifted heavier. And knowing requires data.

Complete, accurate, frictionless data.

That's what VoiceLift delivers.
    `,
    author: "VoiceLift Team",
    date: "2026-03-20",
    category: "Training",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
  },
];

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getFeaturedPosts = (count = 3) => {
  return blogPosts.slice(0, count);
};
