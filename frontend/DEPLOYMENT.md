# Taqyeem Frontend - Vercel Deployment

## Environment Variables

Create these environment variables in your Vercel project settings:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_APP_ENV=production
```

## Deployment Steps

1. **Connect to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**

   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**

   - Add your environment variables in Vercel dashboard
   - Go to Project Settings → Environment Variables
   - Add the variables listed above

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

## Automatic Deployments

- Every push to `main` branch will trigger automatic deployment
- Pull requests will create preview deployments
- You can also trigger manual deployments from Vercel dashboard

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

## Important Notes

- Make sure your backend API supports CORS for your Vercel domain
- Update your backend's allowed origins to include your Vercel URL
- Test all environment variables after deployment
