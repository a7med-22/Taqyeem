# 🚀 Vercel Production Deployment Guide

Complete guide to deploy Taqyeem platform to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Cloudinary Account**: For file uploads (CVs, images)
4. **GitHub Repository**: Push your code to GitHub

---

## 🔧 Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster (Free tier is fine for testing)
3. Create a database user with read/write permissions
4. **Important**: Whitelist IP addresses:
   - For Vercel: Add `0.0.0.0/0` (allows all IPs)
   - Or add specific Vercel IP ranges
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/taqyeem?retryWrites=true&w=majority
   ```

---

## 🔧 Step 2: Prepare Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials:
   - Cloud Name
   - API Key
   - API Secret

---

## 🚀 Step 3: Deploy Backend

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. Click **"Deploy"**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Navigate to backend
cd backend

# Deploy
vercel --prod
```

### Configure Backend Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taqyeem?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_FOLDER=taqyeem

# CORS (will be updated after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Environment
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important**: After deploying, note your backend URL (e.g., `https://taqyeem-backend.vercel.app`)

---

## 🎨 Step 4: Deploy Frontend

### Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import the same GitHub repository
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**

### Configure Frontend Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
# API Configuration (use your backend URL from Step 3)
VITE_API_BASE_URL=https://your-backend-project.vercel.app/api/v1

# App Configuration
VITE_APP_NAME=Taqyeem
VITE_APP_NAME_AR=تقييم
VITE_APP_DESCRIPTION=Bilingual Interview & Learning Platform
VITE_APP_DESCRIPTION_AR=منصة المقابلات والتعلم ثنائية اللغة

# Environment
VITE_NODE_ENV=production

# Features
VITE_ENABLE_DEVTOOLS=false
VITE_ENABLE_ANALYTICS=false
```

**Important**: Replace `https://your-backend-project.vercel.app` with your actual backend URL!

---

## 🔄 Step 5: Update CORS Settings

After frontend is deployed:

1. Go to Backend project in Vercel
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-frontend-project.vercel.app
   ```
3. **Redeploy** the backend (or it will auto-redeploy)

**Note**: You can add multiple origins separated by commas:
```
FRONTEND_URL=https://your-frontend.vercel.app,https://www.yourdomain.com
```

---

## ✅ Step 6: Verify Deployment

### Test Backend

1. Health Check:
   ```
   https://your-backend.vercel.app/health
   ```
   Should return: `{"success": true, "message": "Taqyeem API is running", ...}`

2. API Root:
   ```
   https://your-backend.vercel.app/
   ```
   Should show welcome message with available endpoints

### Test Frontend

1. Visit your frontend URL
2. Try registering a new user
3. Test login functionality
4. Verify API calls are working

---

## 🔒 Security Checklist

- [ ] Strong JWT_SECRET (minimum 32 characters, random)
- [ ] MongoDB user has appropriate permissions (not admin)
- [ ] Cloudinary credentials are secure
- [ ] CORS is properly configured
- [ ] Environment variables are set in Vercel (not in code)
- [ ] Rate limiting is enabled
- [ ] Helmet security headers are enabled

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string is correct
- Check database user permissions

**CORS Errors**
- Ensure `FRONTEND_URL` matches your frontend domain exactly
- Check for trailing slashes
- Verify CORS middleware is working

**Environment Variables Not Loading**
- Ensure all variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

**Function Timeout**
- Vercel free tier has 10s timeout
- Pro tier has 60s timeout
- Check if database queries are optimized

### Frontend Issues

**API Calls Failing**
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for CORS errors
- Ensure backend is deployed and running

**Build Errors**
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript/ESLint errors

---

## 📊 Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor function execution times
- Track API response times

### MongoDB Atlas Monitoring
- Monitor database connections
- Check query performance
- Set up alerts for high usage

---

## 🔄 Continuous Deployment

Vercel automatically deploys on:
- Push to `main` branch → Production
- Pull requests → Preview deployments
- Manual deployments from dashboard

---

## 📝 Environment Variables Summary

### Backend (Required)
```
MONGODB_URI
JWT_SECRET
JWT_EXPIRE
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
FRONTEND_URL
NODE_ENV=production
```

### Frontend (Required)
```
VITE_API_BASE_URL
VITE_APP_NAME
VITE_APP_NAME_AR
```

---

## 🎯 Next Steps

1. Set up custom domains (optional)
2. Configure SSL certificates (automatic with Vercel)
3. Set up monitoring and alerts
4. Configure backup strategies for MongoDB
5. Set up CI/CD pipelines

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review browser console for frontend errors
4. Test API endpoints directly with Postman/Insomnia

---

**🎉 Your Taqyeem platform is now live on Vercel!**

