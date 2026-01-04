# Deployment Guide

This guide shows how to deploy your VitePress site to various platforms.

## GitHub Pages

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with VitePress
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option 2: Manual Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d .vitepress/dist"
  }
}
```

Then run:
```bash
npm install -D gh-pages
npm run deploy
```

## Netlify

### Option 1: Netlify UI

1. Connect your Git repository
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.vitepress/dist`
   - **Node version**: 20

### Option 2: netlify.toml

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".vitepress/dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Vercel

### Option 1: Vercel UI

1. Import your Git repository
2. Vercel auto-detects VitePress
3. Deploy!

### Option 2: vercel.json

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vitepress/dist",
  "framework": "vitepress"
}
```

## CloudFlare Pages

1. Connect your Git repository
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.vitepress/dist`
   - **Node version**: 20

## Custom Server (Nginx)

Build locally and upload:

```bash
npm run build
# Upload .vitepress/dist/* to your server
```

Nginx config:

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/your-site;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }

  # Enable gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Base URL Configuration

If deploying to a subdirectory (e.g., `username.github.io/repo`), update `.vitepress/config.mts`:

```ts
export default defineConfig({
  base: '/repo/', // Add trailing slash!
  // ... rest of config
})
```

## Environment Variables

For API keys or sensitive data, use environment variables:

### In .vitepress/config.mts:
```ts
export default defineConfig({
  vite: {
    define: {
      __API_KEY__: JSON.stringify(process.env.API_KEY)
    }
  }
})
```

### Platform-specific:
- **Netlify**: Set in UI under Site settings → Environment variables
- **Vercel**: Set in UI under Settings → Environment Variables
- **GitHub Actions**: Set as repository secrets

## Preview Deployments

Most platforms support preview deployments:

- **Netlify**: Auto-deploys pull requests
- **Vercel**: Auto-deploys pull requests
- **CloudFlare**: Configure branch deployments

## Custom Domain

After deployment:

1. **Add CNAME record** pointing to your platform:
   - Netlify: `your-site.netlify.app`
   - Vercel: `your-site.vercel.app`
   - GitHub Pages: `username.github.io`

2. **Configure in platform UI**:
   - Add custom domain in settings
   - Enable HTTPS (usually automatic)

## Troubleshooting

### 404 on page refresh
- Ensure clean URLs are supported by your platform
- Check redirect rules are configured

### Assets not loading
- Verify `base` config in `.vitepress/config.mts`
- Check all asset paths are absolute (start with `/`)

### Build fails
- Verify Node version (should be 20+)
- Check `npm run build` works locally
- Review build logs for specific errors

---

For more details, see [VitePress Deployment Guide](https://vitepress.dev/guide/deploy)
