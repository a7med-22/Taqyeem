# Agora.io Setup Guide

## Getting Your Agora.io Credentials

1. **Sign up for Agora.io** (if you haven't already):
   - Go to https://www.agora.io/
   - Click "Sign Up" and create a free account

2. **Create a Project**:
   - After signing up, go to https://console.agora.io/
   - Click "Create" to create a new project
   - Give it a name (e.g., "Taqyeem Video Calls")
   - Select "Video Call" as the use case
   - Click "Submit"

3. **Get Your Credentials**:
   - In your project dashboard, you'll see:
     - **App ID**: A string like `abc123def456...`
     - **App Certificate**: Click "Show" to reveal it (keep this secret!)

4. **Add Credentials to Backend**:
   - Open `backend/.env` file
   - Add or update:
     ```env
     AGORA_APP_ID=your-actual-app-id-here
     AGORA_APP_CERTIFICATE=your-actual-app-certificate-here
     ```
   - Replace the placeholders with your actual credentials

5. **Restart Backend Server**:
   - Stop your backend server (Ctrl+C)
   - Start it again: `npm run dev`

## Testing

After setting up your credentials:

1. Accept a reservation (as interviewer)
2. Click "Start Interview" on the session
3. The channel should be created successfully
4. Both users can then join the video call

## Free Tier

Agora.io offers:
- **10,000 minutes per month** (free forever)
- After that: $0.99 per 1,000 minutes
- Example: 2 people × 30 minutes = 60 minutes = $0.06 (if over free tier)

## Troubleshooting

### Error: "Agora App ID is not configured"
- **Cause**: App ID is missing or not set
- **Solution**: 
  1. Check that `AGORA_APP_ID` is set in `backend/.env`
  2. Make sure you copied the full App ID (no spaces, no quotes)
  3. Restart the backend server after adding the key

### Error: "Agora App Certificate is not configured"
- **Cause**: App Certificate is missing or not set
- **Solution**: 
  1. Check that `AGORA_APP_CERTIFICATE` is set in `backend/.env`
  2. Make sure you copied the full App Certificate (no spaces, no quotes)
  3. Restart the backend server after adding the certificate

### Error: "Failed to generate token"
- **Cause**: Invalid credentials or network issue
- **Solution**: 
  1. Verify your App ID and App Certificate are correct
  2. Check that you're using the correct project's credentials
  3. Make sure your backend can reach Agora's servers

### Video/Audio not working
- **Cause**: Browser permissions or network issues
- **Solution**: 
  1. Allow camera/microphone permissions in your browser
  2. Check your network connection
  3. Try a different browser (Chrome/Firefox recommended)

## Need Help?

- Agora Documentation: https://docs.agora.io/
- Agora Console: https://console.agora.io/
- Support: support@agora.io





