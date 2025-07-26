# PDFSIR Tools - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PDFSIR Tools"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `PDF_CO_API_KEY=your_api_key`
   - Deploy automatically

### Option 2: Netlify
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `.next` folder to Netlify
   - Or connect your GitHub repository
   - Add environment variable: `PDF_CO_API_KEY=your_api_key`

### Option 3: Self-Hosted
1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Build and start**
   ```bash
   npm run build
   pm2 start npm --name "pdfsir-tools" -- start
   ```

## 🔧 Environment Variables

Required environment variables for production:

```env
PDF_CO_API_KEY=your_pdf_co_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📊 Performance Optimization

The platform is optimized for:
- Fast loading with Next.js 15 Turbopack
- Efficient file processing via PDF.co API
- Responsive images and lazy loading
- Minimal JavaScript bundle size

## 🔒 Security Considerations

- API keys are stored securely in environment variables
- Files are processed via PDF.co (not stored locally)
- CORS protection enabled
- File size and type validation

## 📈 Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics, Vercel Analytics)
- Performance monitoring
- API usage tracking for PDF.co limits

## 🌍 Custom Domain

After deployment, you can add a custom domain:
1. Purchase your domain
2. Add DNS records pointing to your deployment
3. Configure SSL certificate (automatic on Vercel/Netlify)

## 📱 PWA Support (Optional)

To make it a Progressive Web App:
1. Add `next-pwa` package
2. Configure service worker
3. Add manifest.json
4. Enable offline functionality

## 🔄 Updates and Maintenance

- Monitor PDF.co API usage and limits
- Update dependencies regularly
- Monitor error logs
- Backup configuration and environment variables
