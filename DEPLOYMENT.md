# 🚀 Deployment Guide

## Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. **Push to GitHub first:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/coding-ducks.git
git push -u origin main
```

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Build Settings (Auto-detected)

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables

No environment variables needed for this project!

## Deploy to Netlify

### Option 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. **Push to GitHub**
2. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Netlify Configuration

A `netlify.toml` file is included with the correct settings.

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/coding-ducks",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update vite.config.ts:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/coding-ducks/'
});
```

4. Deploy:
```bash
npm run deploy
```

## Troubleshooting

### Build Errors

If you get TypeScript errors:
```bash
npm run build
```

All errors should be fixed. If not, check:
- Node version (use v18 or higher)
- Clean install: `rm -rf node_modules package-lock.json && npm install`

### Routing Issues

The `vercel.json` file ensures all routes redirect to index.html for client-side routing.

For Netlify, create `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Performance

The app is optimized with:
- Code splitting
- Lazy loading
- Vite's fast build
- Minimal dependencies

## Post-Deployment

After deployment:
1. Test all pages (Home, Dojo, Duels, Leaderboard, Profile)
2. Try solving a challenge
3. Check localStorage persistence
4. Test on mobile devices
5. Share your link! 🎉

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

---

**Your app is now live! 🦆✨**
