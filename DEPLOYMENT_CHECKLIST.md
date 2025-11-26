# ✅ Vercel Deployment Checklist

Quick checklist to ensure everything is ready for production deployment.

## 🔧 Pre-Deployment

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB user created with appropriate permissions
- [ ] IP whitelist set to `0.0.0.0/0` in MongoDB Atlas
- [ ] Cloudinary account created
- [ ] All environment variables documented

### Frontend
- [ ] No hardcoded API URLs in code
- [ ] All environment variables use `VITE_` prefix
- [ ] Build command works locally (`npm run build`)

## 🚀 Deployment Steps

### 1. Deploy Backend
- [ ] Create new Vercel project for backend
- [ ] Set root directory to `backend`
- [ ] Add all backend environment variables
- [ ] Deploy and note the URL
- [ ] Test health endpoint: `https://your-backend.vercel.app/health`

### 2. Deploy Frontend
- [ ] Create new Vercel project for frontend
- [ ] Set root directory to `frontend`
- [ ] Set framework to Vite
- [ ] Set build command to `npm run build`
- [ ] Set output directory to `dist`
- [ ] Add `VITE_API_BASE_URL` with backend URL
- [ ] Add other frontend environment variables
- [ ] Deploy and note the URL

### 3. Update CORS
- [ ] Update backend `FRONTEND_URL` environment variable
- [ ] Redeploy backend (or wait for auto-redeploy)

## ✅ Post-Deployment Testing

### Backend Tests
- [ ] Health endpoint works: `/health`
- [ ] Root endpoint works: `/`
- [ ] API endpoints respond correctly
- [ ] Database connection works
- [ ] File uploads work (Cloudinary)

### Frontend Tests
- [ ] Homepage loads
- [ ] User registration works
- [ ] User login works
- [ ] API calls succeed (check browser console)
- [ ] No CORS errors
- [ ] File uploads work
- [ ] All pages load correctly

## 🔒 Security Verification

- [ ] JWT_SECRET is strong and unique
- [ ] No sensitive data in code
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] MongoDB user has limited permissions
- [ ] Environment variables are set in Vercel (not committed)

## 📊 Monitoring Setup

- [ ] Vercel analytics enabled (optional)
- [ ] MongoDB Atlas monitoring enabled
- [ ] Error tracking set up (optional)

## 🎯 Final Steps

- [ ] Test complete user flow (register → login → use app)
- [ ] Test admin functionality
- [ ] Test interviewer functionality
- [ ] Test candidate functionality
- [ ] Verify all features work in production

---

**🎉 Once all items are checked, your platform is production-ready!**

