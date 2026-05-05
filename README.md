# HACHIBETO — Landing Page

Artist landing page for **Hachibeto** — music, geometry, and the infinite loop.

---

## Project Structure

```
hachibeto/
├── index.html        # Main HTML
├── css/
│   └── style.css     # All styles
├── js/
│   └── main.js       # Canvas animations & interactivity
└── README.md
```

No build tools, no dependencies, no npm. Pure HTML/CSS/JS — open it in any browser.

---

## Running Locally on Ubuntu

### Option 1 — Just open the file (simplest)
```bash
xdg-open index.html
```
This works for basic testing but some browsers restrict canvas features on `file://` URLs.

### Option 2 — Python local server (recommended)
```bash
# Python 3 (comes pre-installed on Ubuntu)
cd hachibeto
python3 -m http.server 8080
```
Then open your browser at: **http://localhost:8080**

### Option 3 — Node.js live server (with auto-reload)
```bash
# Install once
npm install -g live-server

# Run from the project folder
cd hachibeto
live-server --port=8080
```
Browser will auto-refresh whenever you save a file.

---

## Deploying to GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to https://github.com/new
2. Name it `hachibeto` (or anything you like)
3. Set it to **Public**
4. Do NOT add a README (you already have one)
5. Click **Create repository**

### Step 2 — Push your code
```bash
cd hachibeto
git init
git add .
git commit -m "Initial commit — Hachibeto landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hachibeto.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

Your site will be live at:
**https://YOUR_USERNAME.github.io/hachibeto**

It may take 1–2 minutes to go live on first deploy.

### Step 4 — Updating the site
Any time you make changes:
```bash
git add .
git commit -m "Update: describe what changed"
git push
```
GitHub Pages will automatically redeploy.

---

## Customising

| What to change | Where |
|---|---|
| Artist name / copy | `index.html` |
| Social media URLs | `index.html` — contact section `href` values |
| Colors | `css/style.css` — `:root` CSS variables at the top |
| Animation speed | `js/main.js` — `t * 0.012` multipliers |
| Font | `index.html` — Google Fonts link + `css/style.css` font-family |

---

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge.
Requires JavaScript enabled for canvas animations.
