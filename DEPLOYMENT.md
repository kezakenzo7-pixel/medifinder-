# Medicine Finder Pro - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Project**
   ```bash
   cd "c:\Users\USER\Desktop\New folder"
   npm run build
   vercel --prod
   ```

### Option 2: Netlify
1. **Build Project**
   ```bash
   cd "c:\Users\USER\Desktop\New folder"
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or use Netlify CLI

### Option 3: GitHub + Vercel (Best for ongoing updates)
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-deploy on every push

## Current Project Status
- ✅ Vercel configuration exists
- ✅ Build scripts ready
- ✅ Static files optimized
- ✅ Environment variables configured

## Environment Variables Needed
- `VITE_APP_NAME`: Medicine Finder Pro
- `VITE_APP_VERSION`: 1.0.0
- `VITE_ENABLE_ANALYTICS`: true
- `VITE_ENABLE_NOTIFICATIONS`: true

## Deployment Commands
```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## Post-Deployment Checklist
- [ ] Test all user login flows
- [ ] Verify medicine search works
- [ ] Test cart functionality
- [ ] Check payment processing
- [ ] Test mobile responsiveness
- [ ] Verify all navigation links

## Custom Domain Setup
After deployment, you can:
1. Add custom domain in Vercel dashboard
2. Update DNS settings
3. Enable SSL certificate
4. Set up analytics

## Support
For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [netlify.com/docs](https://netlify.com/docs)
- Project issues: Check console logs in browser
