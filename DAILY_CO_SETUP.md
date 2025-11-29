# Daily.co Setup Guide

## Getting Your Daily.co API Key

1. **Sign up for Daily.co** (if you haven't already):
   - Go to https://dashboard.daily.co/
   - Sign up for a free account

2. **Get your API Key**:
   - After signing up, go to https://dashboard.daily.co/developers
   - Click on "Create API Key" or use an existing one
   - Copy your API key (it looks like: `abc123def456ghi789...`)

3. **Add API Key to Backend**:
   - Open `backend/.env` file
   - Add or update:
     ```env
     DAILY_CO_API_KEY=your-actual-api-key-here
     ```
   - Replace `your-actual-api-key-here` with your actual API key from Daily.co

4. **Restart Backend Server**:
   - Stop your backend server (Ctrl+C)
   - Start it again: `npm run dev`

## Testing

After setting up your API key:

1. Accept a reservation (as interviewer)
2. Click "Start Interview" on the session
3. The room should be created successfully
4. Both users can then join the video call

## Troubleshooting

### Error: "authentication-error"
- **Cause**: API key is missing, incorrect, or not set
- **Solution**: 
  1. Check that `DAILY_CO_API_KEY` is set in `backend/.env`
  2. Make sure you copied the full API key (no spaces, no quotes)
  3. Restart the backend server after adding the key

### Error: "Daily.co API key is not configured"
- **Cause**: The API key is not set in the environment
- **Solution**: Add `DAILY_CO_API_KEY` to your `.env` file

### Error: "Daily.co authentication failed"
- **Cause**: The API key is invalid or expired
- **Solution**: 
  1. Go to Daily.co dashboard
  2. Generate a new API key
  3. Update it in your `.env` file
  4. Restart the server

## Free Tier Limits

- **10,000 participant-minutes per month** (free)
- After that: $0.004 per participant-minute
- Example: 2 people × 30 minutes = 60 minutes = $0.24

## Need Help?

- Daily.co Documentation: https://docs.daily.co/
- Daily.co Dashboard: https://dashboard.daily.co/
- Support: support@daily.co





