# VoiceLift Landing Page

Voice-first AI workout logging landing page. Built with Vite + React, deployed to GitHub Pages.

## Setup

### 1. Prerequisites
- Node.js 16+
- GitHub repository with Pages enabled

### 2. Set up Formspree Waitlist (Optional)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, get your Form ID (looks like `abcd1234`)
3. Create `.env` file:
```
VITE_FORMSPREE_ID=your_form_id_here
```

Without this, the waitlist form will show an error. To test the site without setup, just don't fill in the env var.

### 3. Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

### 4. Deployment to GitHub Pages

#### Step 1: Configure GitHub Repository
1. Go to your repo → **Settings → Pages**
2. Set **Source** to "GitHub Actions"
3. Add GitHub secret (if using Formspree):
   - `VITE_FORMSPREE_ID` = your form ID from formspree.io

#### Step 2: Push to Main
The GitHub Actions workflow will automatically:
1. Build the project
2. Deploy to GitHub Pages

You can view the workflow in `.github/workflows/deploy.yml`

### 5. View Your Site

Once deployed, your site will be available at:
- `https://yourusername.github.io/voicelift` (if repo is named `voicelift`)
- Or your custom domain (if configured in repo settings)

## Build & Preview

```bash
npm run build      # Build for production
npm run preview    # Preview the built version locally
```

## Tech Stack

- **Framework**: React 19 + Vite
- **Waitlist**: Formspree (email form backend)
- **Deployment**: GitHub Pages + GitHub Actions
- **Fonts**: Bebas Neue + DM Sans (Google Fonts)

## File Structure

```
src/
  App.jsx          # Main landing page component (with Formspree integration)
  main.jsx         # Entry point
index.html         # HTML entry
vite.config.js     # Vite configuration
.github/
  workflows/
    deploy.yml     # GitHub Actions deploy workflow
```
