# 🚀 Complete Upload & Deployment Guide for PDFSIR Tools

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Create GitHub Repository
1. **Go to GitHub.com** and sign in (create account if needed)
2. **Click "New Repository"** (green button)
3. **Name it:** `pdfsir-tools`
4. **Make it Public** (or Private if you prefer)
5. **Click "Create Repository"**

### Step 2: Upload Your Project to GitHub
1. **Extract your project files** (from the ZIP/TAR.GZ you downloaded)
2. **Open terminal/command prompt** in the project folder
3. **Run these commands:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PDFSIR Tools Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pdfsir-tools.git
   git push -u origin main
   ```
   *(Replace YOUR_USERNAME with your GitHub username)*

### Step 3: Deploy to Vercel
1. **Go to vercel.com** and sign up with your GitHub account
2. **Click "New Project"**
3. **Import your `pdfsir-tools` repository**
4. **Configure settings:**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: Leave empty
5. **Add Environment Variable:**
   - Key: `PDF_CO_API_KEY`
   - Value: `z2009@yahoo.com_BAdeT1HQWUk5C7jX0DnmDA9I0u7ATkdqazXvUJqwLrcF9q0DmUMmYQ8FaCDIBr9H`
6. **Click "Deploy"**

### Step 4: Your Site is Live!
- Vercel will give you a URL like: `https://pdfsir-tools-xyz.vercel.app`
- Your PDFSIR Tools platform is now live and accessible worldwide!

---

## Option 2: Deploy to Netlify

### Step 1: Prepare Your Project
1. **Extract your project files**
2. **Open terminal in project folder**
3. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

### Step 2: Deploy to Netlify
1. **Go to netlify.com** and sign up
2. **Drag and drop** your entire project folder to Netlify
3. **Or connect GitHub repository** (follow same GitHub steps as above)
4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Add Environment Variable:**
   - Key: `PDF_CO_API_KEY`
   - Value: `z2009@yahoo.com_BAdeT1HQWUk5C7jX0DnmDA9I0u7ATkdqazXvUJqwLrcF9q0DmUMmYQ8FaCDIBr9H`

---

## Option 3: Deploy to Railway

### Step 1: Upload to GitHub (same as Vercel steps 1-2)

### Step 2: Deploy to Railway
1. **Go to railway.app** and sign up with GitHub
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your `pdfsir-tools` repository**
5. **Add Environment Variable:**
   - Key: `PDF_CO_API_KEY`
   - Value: `z2009@yahoo.com_BAdeT1HQWUk5C7jX0DnmDA9I0u7ATkdqazXvUJqwLrcF9q0DmUMmYQ8FaCDIBr9H`
6. **Railway will automatically deploy**

---

## Option 4: Manual Upload (No GitHub)

### For Netlify (Drag & Drop)
1. **Extract your project**
2. **Open terminal and build:**
   ```bash
   npm install
   npm run build
   ```
3. **Go to netlify.com**
4. **Drag the entire project folder** to the deploy area
5. **Add environment variables** in site settings

### For Vercel (Direct Upload)
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
2. **In your project folder:**
   ```bash
   vercel login
   vercel --prod
   ```
3. **Follow the prompts** and add environment variables

---

## 🔧 Important Configuration

### Environment Variables (Required for all platforms)
Always add this environment variable:
- **Key:** `PDF_CO_API_KEY`
- **Value:** `z2009@yahoo.com_BAdeT1HQWUk5C7jX0DnmDA9I0u7ATkdqazXvUJqwLrcF9q0DmUMmYQ8FaCDIBr9H`

### Custom Domain (Optional)
After deployment, you can add your own domain:
1. **Buy a domain** (GoDaddy, Namecheap, etc.)
2. **In your deployment platform** (Vercel/Netlify):
   - Go to Domain settings
   - Add your custom domain
   - Update DNS records as instructed

---

## 📱 Testing Your Deployment

After deployment, test these features:
1. **Homepage loads** with all 26 tools
2. **Click on any tool** (e.g., Merge PDF)
3. **Upload a test file** to verify PDF.co integration
4. **Test language toggle** (EN/العربية)
5. **Test on mobile device**

---

## 🚨 Troubleshooting

### Common Issues:
1. **Build fails:** Make sure all dependencies are in package.json
2. **API not working:** Check environment variable is set correctly
3. **404 errors:** Ensure Next.js routing is configured properly
4. **Slow loading:** Enable CDN and optimize images

### Getting Help:
- Check deployment platform documentation
- Review error logs in platform dashboard
- Verify environment variables are set
- Test locally first with `npm run dev`

---

## 🎉 Success Checklist

✅ Project uploaded to platform
✅ Environment variables configured
✅ Build completed successfully
✅ Site is accessible via provided URL
✅ All 26 PDF tools are working
✅ File upload and processing works
✅ Language toggle functions
✅ Mobile responsive design works

---

**Your PDFSIR Tools platform will be live and accessible worldwide!**

Choose the option that works best for you - Vercel is recommended for beginners as it's the easiest and most reliable.
