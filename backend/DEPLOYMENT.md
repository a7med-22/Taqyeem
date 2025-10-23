# Vercel Deployment Guide for Taqyeem Backend

This guide will help you deploy your Taqyeem backend API to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **GitHub Repository**: Push your code to GitHub

## Step 1: Prepare Your Database

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel deployment
5. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/taqyeem`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from your backend directory:

   ```bash
   cd backend
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **No**
   - Project name: `taqyeem-backend` (or your preferred name)
   - Directory: `./` (current directory)

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `backend`
5. Click "Deploy"

## Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taqyeem
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Step 4: Update Frontend Configuration

Update your frontend's API base URL to point to your Vercel deployment:

```javascript
// In your frontend config
const API_BASE_URL = "https://your-backend-project.vercel.app/api/v1";
```

## Step 5: Test Your Deployment

1. Visit your Vercel deployment URL
2. Test the health endpoint: `https://your-project.vercel.app/health`
3. Test your API endpoints

## Important Notes

- **MongoDB Connection**: Make sure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0)
- **Environment Variables**: Never commit sensitive data to your repository
- **CORS**: Update the `FRONTEND_URL` environment variable to match your frontend domain
- **Rate Limiting**: Adjust rate limiting settings based on your needs

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**

   - Check your MongoDB Atlas connection string
   - Ensure IP whitelist includes 0.0.0.0/0
   - Verify database user permissions

2. **CORS Errors**

   - Update `FRONTEND_URL` environment variable
   - Check your frontend is making requests to the correct domain

3. **Environment Variables Not Loading**
   - Ensure all variables are set in Vercel dashboard
   - Redeploy after adding new environment variables

## File Structure for Vercel

```
backend/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── vercel.json           # Vercel configuration
├── server.js             # Main Express app
├── package.json          # Dependencies and scripts
└── ...                   # Your other files
```

## Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployment logs
vercel logs
```

Your API will be available at: `https://your-project-name.vercel.app`
