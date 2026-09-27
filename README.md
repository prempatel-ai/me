# Prem Patel — Hybrid Developer Portfolio & Academic Résumé

A clean, high-performance web resume and developer portfolio designed for **Premkumar M. Patel (Prem Patel)**, synthesizing the best aspects of two premier minimalist portfolios:
- **[Minimal Light Theme](https://minimal-light-theme.yliu.me)**: Scholarly clarity, publication/project cards, honors badges, categorized skills, and ATS-clean print formatting.
- **[J Rosser Portfolio](https://jrosser.co.uk/)**: Modern `JetBrains Mono` aesthetic, smooth Light/Dark theme toggle with local storage persistence, signature vertical connected timeline, pastel pill badges, and developer polish.

---

## ⚡ Tech Stack & GitHub Pages Architecture

Chosen specifically for **zero-dependency, instant GitHub Pages deployment**:
- **Pure Semantic HTML5**: Accessible, search-engine indexed, and standard.
- **Modern CSS3**: CSS custom properties (variables), Glassmorphism headers, responsive CSS Grid & Flexbox, and dedicated `@media print` rules.
- **Vanilla JavaScript**: Lightweight theme switcher (saved in `localStorage`), interactive category filtering, 1-click email copy toast, and keyboard shortcuts (`T` for theme, `Ctrl+P` for print).
- **Embedded SVG Visuals**: Custom project architecture banners, monogram logo, developer avatar, and favicon. Zero broken links or external asset failures.
- **Relative Asset Paths (`./`)**: Ensures your portfolio works seamlessly whether deployed at `https://<username>.github.io/` or inside a sub-repository like `https://<username>.github.io/resume/`.

---

## 🚀 How to Deploy to GitHub Pages (2-Minute Guide)

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this `resume` folder:

```bash
# Navigate to this folder if not already there:
cd "c:\Users\ASUS\Desktop\resume"

# Initialize git repository
git init

# Add all files (excluding the clone reference folder if desired)
git add .

# Commit
git commit -m "Initial commit: Prem Patel hybrid portfolio & resume"
```

### Step 2: Push to GitHub
1. Create a new public repository on GitHub (e.g. `resume` or `prempatel-ai.github.io`).
2. Run:
```bash
git branch -M main
git remote add origin https://github.com/prempatel-ai/resume.git
git push -u origin main
```

### Step 3: Turn on GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (gear icon) -> **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Click **Save**.
5. Your portfolio will be live in ~60 seconds at `https://<your-username>.github.io/resume/`!

---

## 🖨️ Print / Save as PDF Feature

Clicking the **"PDF CV"** button in the header or pressing `Ctrl+P` activates an optimized `@media print` stylesheet.
- Strips interactive navigation, theme toggles, and backgrounds.
- Formats Prem's experience, education, hackathons, and technical skills into an ultra-clean, ATS-friendly printable PDF suitable for recruiter submissions.

---

## 📁 Project Structure

```
resume/
├── index.html          # Main HTML with all sections (About, Projects, Résumé, Skills, Contact)
├── styles.css          # Design system, themes (Light/Dark), and @media print stylesheet
├── script.js           # Theme toggle, project filtering, email copy, and keyboard shortcuts
├── .nojekyll           # Tells GitHub Pages to bypass Jekyll processing
├── README.md           # Documentation and GitHub Pages deployment guide
└── assets/
    ├── favicon.svg     # Modern monogram favicon
    ├── avatar.svg      # Developer avatar illustration
    └── projects/       # Architecture SVG banners for AgentPay, CampusCircle, CliniqueAI, RAG Lab
```
