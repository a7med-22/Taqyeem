# 🚀 Step-by-Step Vercel Deployment Guide

Follow these steps in order to deploy your Taqyeem platform.

---

## ✅ Step 1: Verify MongoDB Atlas Setup

### 1.1 Check IP Whitelist
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click on **"Network Access"** (left sidebar)
3. Check if you have an IP address entry
4. **IMPORTANT**: You need to allow Vercel to connect:
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (or add `0.0.0.0/0`)
   - Click **"Confirm"**
   - ⚠️ This allows connections from anywhere (required for Vercel)

### 1.2 Verify Connection String
Your connection string should look like:
```
mongodb+srv://a7med-22:ahmed123@cluster0.wij54tl.mongodb.net/taqyeem?retryWrites=true&w=majority
```

✅ **Check**: Does your connection string work? (You mentioned you already have it set up)

---

## 🎯 Step 2: Prepare Cloudinary (For File Uploads)

### 2.1 Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up (free tier available)
2. After signup, go to **Dashboard**
3. You'll see:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### 2.2 Note Your Credentials
Write them down - you'll need them in Step 4:
- Cloud Name: `_________________`
- API Key: `_________________`
- API Secret: `_________________`

---

## 🚀 Step 3: Deploy Backend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended) or email

### 3.2 Create Backend Project
1. After login, click **"Add New..."** → **"Project"**
2. **Import Git Repository**:
   - If your code is on GitHub: Select your repository
   - If not: You'll need to push to GitHub first
3. **Configure Project**:
   - **Project Name**: `taqyeem-backend` (or any name you like)
   - **Framework Preset**: **Other** (or leave as default)
   - **Root Directory**: Click "Edit" and set to `backend`
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
4. **DON'T CLICK DEPLOY YET** - We need to add environment variables first!

### 3.3 Add Environment Variables
Before deploying, click **"Environment Variables"** and add these:

#### Required Variables:

1. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://a7med-22:ahmed123@cluster0.wij54tl.mongodb.net/taqyeem?retryWrites=true&w=majority`
   - Environments: Production, Preview, Development (check all)

2. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate a strong random string (minimum 32 characters)
   - Example: `my-super-secret-jwt-key-2024-production-min-32-chars`
   - Environments: Production, Preview, Development (check all)

3. **JWT_EXPIRE**
   - Key: `JWT_EXPIRE`
   - Value: `7d`
   - Environments: Production, Preview, Development (check all)

4. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environments: Production only

5. **CLOUDINARY_CLOUD_NAME**
   - Key: `CLOUDINARY_CLOUD_NAME`
   - Value: Your Cloudinary cloud name from Step 2
   - Environments: Production, Preview, Development (check all)

6. **CLOUDINARY_API_KEY**
   - Key: `CLOUDINARY_API_KEY`
   - Value: Your Cloudinary API key from Step 2
   - Environments: Production, Preview, Development (check all)

7. **CLOUDINARY_API_SECRET**
   - Key: `CLOUDINARY_API_SECRET`
   - Value: Your Cloudinary API secret from Step 2
   - Environments: Production, Preview, Development (check all)

8. **CLOUDINARY_FOLDER**
   - Key: `CLOUDINARY_FOLDER`
   - Value: `taqyeem`
   - Environments: Production, Preview, Development (check all)

9. **FRONTEND_URL** (We'll update this after frontend deployment)
   - Key: `FRONTEND_URL`
   - Value: `http://localhost:5173` (temporary, we'll change it later)
   - Environments: Production, Preview, Development (check all)

10. **RATE_LIMIT_WINDOW_MS**
    - Key: `RATE_LIMIT_WINDOW_MS`
    - Value: `900000`
    - Environments: Production, Preview, Development (check all)

11. **RATE_LIMIT_MAX_REQUESTS**
    - Key: `RATE_LIMIT_MAX_REQUESTS`
    - Value: `100`
    - Environments: Production, Preview, Development (check all)

### 3.4 Deploy Backend
1. After adding all environment variables, click **"Deploy"**
2. Wait for deployment to complete (usually 1-2 minutes)
3. **IMPORTANT**: Copy your deployment URL (e.g., `https://taqyeem-backend.vercel.app`)
   - You'll see it in the deployment page
   - It will be something like: `https://your-project-name.vercel.app`

### 3.5 Test Backend
1. Open your backend URL in browser
2. Test health endpoint: `https://your-backend-url.vercel.app/health`
   - Should return: `{"success": true, "message": "Taqyeem API is running", ...}`
3. Test root endpoint: `https://your-backend-url.vercel.app/`
   - Should show welcome message

✅ **Backend URL**: `https://_________________.vercel.app`
(Write this down - you'll need it for frontend!)

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Create Frontend Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. **Import the same Git Repository** (yes, same repo, different project)
3. **Configure Project**:
   - **Project Name**: `taqyeem-frontend` (or any name)
   - **Framework Preset**: **Vite** (should auto-detect)
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (should auto-fill)
   - **Output Directory**: `dist` (should auto-fill)
   - **Install Command**: `npm install` (should auto-fill)

### 4.2 Add Frontend Environment Variables
Before deploying, click **"Environment Variables"** and add:

1. **VITE_API_BASE_URL**
   - Key: `VITE_API_BASE_URL`
   - Value: `https://your-backend-url.vercel.app/api/v1`
   - ⚠️ Replace `your-backend-url` with your actual backend URL from Step 3.5!
   - Environments: Production, Preview, Development (check all)

2. **VITE_APP_NAME**
   - Key: `VITE_APP_NAME`
   - Value: `Taqyeem`
   - Environments: Production, Preview, Development (check all)

3. **VITE_APP_NAME_AR**
   - Key: `VITE_APP_NAME_AR`
   - Value: `تقييم`
   - Environments: Production, Preview, Development (check all)

4. **VITE_APP_DESCRIPTION**
   - Key: `VITE_APP_DESCRIPTION`
   - Value: `Bilingual Interview & Learning Platform`
   - Environments: Production, Preview, Development (check all)

5. **VITE_APP_DESCRIPTION_AR**
   - Key: `VITE_APP_DESCRIPTION_AR`
   - Value: `منصة المقابلات والتعلم ثنائية اللغة`
   - Environments: Production, Preview, Development (check all)

6. **VITE_NODE_ENV**
   - Key: `VITE_NODE_ENV`
   - Value: `production`
   - Environments: Production only

7. **VITE_ENABLE_DEVTOOLS**
   - Key: `VITE_ENABLE_DEVTOOLS`
   - Value: `false`
   - Environments: Production only

8. **VITE_ENABLE_ANALYTICS**
   - Key: `VITE_ENABLE_ANALYTICS`
   - Value: `false`
   - Environments: Production only

### 4.3 Deploy Frontend
1. Click **"Deploy"**
2. Wait for deployment (usually 2-3 minutes)
3. **IMPORTANT**: Copy your frontend URL (e.g., `https://taqyeem-frontend.vercel.app`)

✅ **Frontend URL**: `https://_________________.vercel.app`

---

## 🔗 Step 5: Connect Frontend and Backend

### 5.1 Update Backend CORS
1. Go back to your **Backend Project** in Vercel
2. Go to **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **Edit**
5. Change value to your frontend URL: `https://your-frontend-url.vercel.app`
6. Click **Save**
7. **Redeploy**: Go to **Deployments** tab → Click the three dots (⋯) on latest deployment → **Redeploy**

### 5.2 Test the Connection
1. Open your frontend URL in browser
2. Open browser **Developer Tools** (F12) → **Console** tab
3. Try to register a new user or login
4. Check console for errors:
   - ✅ No CORS errors = Good!
   - ❌ CORS errors = Check FRONTEND_URL in backend

---

## ✅ Step 6: Final Testing

### Test These Features:
- [ ] Homepage loads
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads after login
- [ ] API calls work (check browser console - no errors)
- [ ] File uploads work (if you have Cloudinary set up)

---

## 🎉 Success!

Your Taqyeem platform is now live on Vercel!

**Backend**: `https://_________________.vercel.app`
**Frontend**: `https://_________________.vercel.app`

---

## 🐛 Troubleshooting

### Backend Issues:
- **MongoDB Connection Failed**: Check IP whitelist in MongoDB Atlas (must include 0.0.0.0/0)
- **CORS Errors**: Make sure FRONTEND_URL in backend matches your frontend URL exactly
- **Environment Variables Not Working**: Redeploy after adding/changing variables

### Frontend Issues:
- **API Calls Failing**: Check VITE_API_BASE_URL is correct
- **Build Errors**: Check Node.js version (should be 18+)

---

## 📝 Quick Reference

### Backend Environment Variables:
```
MONGODB_URI=your-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=taqyeem
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables:
```
VITE_API_BASE_URL=https://your-backend.vercel.app/api/v1
VITE_APP_NAME=Taqyeem
VITE_APP_NAME_AR=تقييم
VITE_APP_DESCRIPTION=Bilingual Interview & Learning Platform
VITE_APP_DESCRIPTION_AR=منصة المقابلات والتعلم ثنائية اللغة
VITE_NODE_ENV=production
VITE_ENABLE_DEVTOOLS=false
VITE_ENABLE_ANALYTICS=false
```

