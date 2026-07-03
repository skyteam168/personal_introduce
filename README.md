# Xiaowei Yang — Personal Brand Portfolio

A production-grade personal brand website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [yangxiaowei.dev](https://yangxiaowei.dev) (configure after deployment)

## Features

- Apple / OpenAI inspired minimalist design
- Dynamic particle background with mouse parallax
- Bilingual support (中文 / English)
- Dark / Light theme toggle
- Responsive design (mobile, tablet, desktop)
- Scroll animations with Framer Motion
- AI Chat assistant (Ask Xiaowei AI)
- Project detail pages with architecture diagrams
- One-click PDF resume download
- SEO optimized (sitemap, robots, Open Graph)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

### Personal Info

Edit `lib/data.ts` for:
- Contact information (email, phone, GitHub, LinkedIn)
- Skills, experience, projects, certificates
- Tech proficiency levels

### Translations

Edit `lib/i18n.ts` for Chinese and English text content.

### AI Chat Knowledge Base

Edit `lib/ai-knowledge.ts` to update the AI assistant's responses.

### Assets

Replace these files in `public/`:
- `avatar.svg` — Your profile photo
- `resume.pdf` — Your PDF resume
- `images/wechat-qr.svg` — Your WeChat QR code

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy — zero configuration needed

### Cloudflare Pages / Netlify

1. Build command: `npm run build`
2. Output directory: `.next` (use Next.js adapter)

### GitHub Pages

Requires static export configuration. Add to `next.config.ts`:

```ts
const nextConfig = { output: 'export' };
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout + SEO
│   ├── globals.css           # Global styles
│   ├── sitemap.ts            # SEO sitemap
│   ├── robots.ts             # SEO robots
│   └── projects/[slug]/      # Project detail pages
├── components/
│   ├── Hero.tsx              # Hero with particles
│   ├── About.tsx             # About section
│   ├── Skills.tsx            # Skills grid
│   ├── Experience.tsx        # Timeline
│   ├── Projects.tsx          # Project cards
│   ├── TechStack.tsx         # Proficiency bars
│   ├── Certificates.tsx      # Certifications
│   ├── Contact.tsx           # Contact info
│   ├── AIChat.tsx            # AI assistant widget
│   ├── Navbar.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   └── ParticleBackground.tsx
├── lib/
│   ├── data.ts               # Content data
│   ├── i18n.ts               # Translations
│   └── ai-knowledge.ts       # AI chat knowledge
└── public/
    ├── avatar.svg
    ├── resume.pdf
    └── images/
```

## License

Private — All rights reserved.
