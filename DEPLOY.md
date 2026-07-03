# Deploy to Vercel

## Pre-flight

```powershell
cd g:\gitee\personal_introduce
npm run build
```

Ensure these files exist before deploy:

| File | Purpose |
|------|---------|
| `public/images/wechatqr.png` | WeChat QR on Contact section |
| `public/avatar.svg` (or your photo) | Hero avatar |
| `public/resume.pdf` | Resume download |

---

## Option A — GitHub + Vercel (recommended)

### 1. Create GitHub repo

https://github.com/new → name: `personal_introduce` → Create

### 2. Push code

```powershell
cd g:\gitee\personal_introduce

git add .
git commit -m "feat: personal portfolio ready for Vercel deployment"

git remote add origin https://github.com/skyteam168/personal_introduce.git
git branch -M main
git push -u origin main
```

> Replace `skyteam168/personal_introduce` with your actual GitHub repo.

### 3. Import on Vercel

1. https://vercel.com/new
2. Import `skyteam168/personal_introduce`
3. Framework: **Next.js** (auto-detected)
4. Environment Variables → add:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SITE_URL` | `https://yangxiaowei.dev` |

5. Click **Deploy**

### 4. Custom domain

Vercel Project → **Settings → Domains** → Add `yangxiaowei.dev`

DNS (at your registrar):

```
Type   Name   Value
CNAME  @      cname.vercel-dns.com
CNAME  www    cname.vercel-dns.com
```

---

## Option B — Vercel CLI (no GitHub)

```powershell
cd g:\gitee\personal_introduce
npx vercel login
npx vercel
npx vercel env add NEXT_PUBLIC_SITE_URL
# enter: https://yangxiaowei.dev

npx vercel --prod
```

---

## After deploy

- [ ] Open live URL and test dark mode / language toggle
- [ ] Test WeChat QR and PDF download
- [ ] Test AI chat widget
- [ ] Submit sitemap: `https://yangxiaowei.dev/sitemap.xml`
