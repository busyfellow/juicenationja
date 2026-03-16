# Juice Nation JA — juicenationja.com

## FORGE Meal Replacement Shake Website

A production static website for **FORGE by Juice Nation JA** (Naturali Foods Ltd.) — Jamaica's real-fruit meal replacement shake.

### Tech Stack
- Pure HTML, CSS, vanilla JavaScript — zero build tools, zero dependencies
- Google Fonts: Playfair Display + DM Sans
- CSS custom properties design system
- IntersectionObserver scroll animations
- Mobile-first responsive design

### Site Structure
```
juicenationja/
├── index.html              ← Homepage (hero, products, benefits, comparison, reviews, FAQ)
├── 404.html                ← Branded error page
├── favicon.svg             ← SVG favicon
├── robots.txt              ← Search engine crawl rules
├── sitemap.xml             ← XML sitemap for SEO
├── _redirects              ← Cloudflare Pages clean URL redirects
├── _headers                ← Security & caching headers
├── css/
│   ├── global.css          ← Design system (colors, typography, nav, footer, components)
│   ├── home.css            ← Homepage section styles
│   └── pages.css           ← All inner page styles
├── js/
│   └── main.js             ← Navigation, animations, form, tabs, quiz logic
├── images/
│   ├── forge-blueberry-strawberry-1.jpg
│   ├── forge-blueberry-strawberry-2.jpg
│   ├── forge-coffee-banana-1.jpg
│   ├── forge-coffee-banana-2.jpg
│   ├── forge-peanut-banana.jpg
│   ├── forge-peanut-banana-strawberry-1.jpg
│   └── forge-peanut-banana-strawberry-2.jpg
└── pages/
    ├── products.html       ← Product detail pages for all 4 flavors
    ├── nutrition.html      ← Full nutrition facts tables per flavor
    ├── our-story.html      ← Founder story, timeline, values
    ├── find-us.html        ← Store locations & ordering channels
    ├── contact.html        ← Contact form & contact info
    └── quiz.html           ← "Which FORGE is right for you?" interactive quiz
```

### Pages
| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, product grid, benefits, comparison table, reviews, FAQ |
| Products | `/pages/products.html` | Detailed PDP for all 4 FORGE flavors with sticky images |
| Nutrition | `/pages/nutrition.html` | Full nutrition label tables + flavor comparison |
| Our Story | `/pages/our-story.html` | Founder story, company timeline, values |
| Find Us | `/pages/find-us.html` | Store locations, ordering channels (WhatsApp, phone, email) |
| Contact | `/pages/contact.html` | Contact form with validation + contact info sidebar |
| Quiz | `/pages/quiz.html` | 3-step interactive quiz with flavor recommendation |
| 404 | `/404.html` | Branded error page |

---

## Deploying to Cloudflare Pages

### Option 1: Direct Upload (Quickest)
1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages**
3. Select **Upload assets**
4. Name the project `juicenationja`
5. **IMPORTANT:** Upload the CONTENTS of the folder, not the folder itself. Select all files inside the project root.
6. Click **Deploy**
7. Go to **Custom domains** → Add `juicenationja.com`

### Option 2: Git-Based Deployment (Recommended)
1. Push this repository to GitHub
2. In Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**
3. Connect your GitHub account
4. Select the `juicenationja` repository
5. Build settings:
   - **Build command:** (leave empty — no build step)
   - **Build output directory:** `/` (root)
6. Click **Deploy**
7. Go to **Custom domains** → Add `juicenationja.com`

### Custom Domain Setup
In Cloudflare DNS for `juicenationja.com`:
- Cloudflare automatically creates a CNAME record when you add the custom domain in Pages
- Ensure the domain is active on Cloudflare (DNS managed by Cloudflare)
- SSL is automatic and free

### Clean URLs
The `_redirects` file provides clean URLs:
- `juicenationja.com/products` → `/pages/products.html`
- `juicenationja.com/nutrition` → `/pages/nutrition.html`
- `juicenationja.com/our-story` → `/pages/our-story.html`
- `juicenationja.com/find-us` → `/pages/find-us.html`
- `juicenationja.com/contact` → `/pages/contact.html`
- `juicenationja.com/quiz` → `/pages/quiz.html`

---

## Cost: $0/month
- **Hosting:** Cloudflare Pages Free Tier (unlimited bandwidth, global CDN)
- **SSL:** Free (automatic via Cloudflare)
- **Domain:** Already owned (juicenationja.com)
- **Fonts:** Google Fonts (free)
- **No server costs** — purely static files

---

## Before You Go Live — Checklist

### Images to Add/Replace
- [ ] Hero section: Product bottle photo or lifestyle shot
- [ ] Our Story page: Founder photo
- [ ] OG image: Create a 1200x630 social sharing image

### Content to Update
- [ ] Social media links (Instagram, Facebook — currently `#` placeholders)
- [ ] Specific store names/addresses once confirmed
- [ ] Pricing if you want to display it publicly

### Functionality to Connect
- [ ] Contact form: Connect to [Formspree](https://formspree.io) (50 free/month) or Cloudflare Worker
- [ ] WhatsApp link: Verify number (currently wa.me/18765571212)
- [ ] Analytics: Add Cloudflare Web Analytics (free) or Google Analytics

---

## Contact
- **Email:** info@juicenation.com
- **Phone:** 1 876 557 1212
- **WhatsApp:** wa.me/18765571212
- **Location:** Kingston, Jamaica
- **Legal Entity:** Naturali Foods Ltd.
