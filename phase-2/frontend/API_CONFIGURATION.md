# API Configuration for Deployed Frontend

## Issue Description
The deployed frontend at `https://todoapp-3phases-tham.vercel.app/` is currently trying to connect to a backend API at `http://localhost:8000/api`, which is only accessible from the local development environment. This causes authentication and API calls to fail on the deployed version.

## Solution
To fix this issue, you need to configure the deployed frontend to connect to the deployed backend API.

### Step 1: Determine the Deployed Backend URL
The backend is deployed separately from the frontend. You need to find the URL of the deployed backend API. It's likely deployed on Vercel as well, possibly at a URL like:
- `https://[your-backend-project-name].vercel.app/api`
- Or another domain where you've deployed the backend

### Step 2: Configure Environment Variables in Vercel
1. Go to your Vercel dashboard for the frontend project
2. Navigate to Settings → Environment Variables
3. Add/update the following environment variable:
   ```
   NEXT_PUBLIC_API_URL=[your-deployed-backend-api-url]
   ```
   For example:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-project-name.vercel.app/api
   ```

### Step 3: Redeploy the Frontend
After updating the environment variables, redeploy your frontend for the changes to take effect.

## Verification
After deployment:
1. Visit the sign-in page: `https://todoapp-3phases-tham.vercel.app/auth/sign-in`
2. Open browser developer tools (F12) and navigate to the Network tab
3. Try signing in with valid credentials
4. You should see successful API calls to your backend API in the Network tab
5. After successful sign-in, you should be redirected to the dashboard

## Troubleshooting
- If authentication still fails, check the browser console for error messages
- Verify that CORS is properly configured on your backend to allow requests from `https://todoapp-3phases-tham.vercel.app`
- Ensure your deployed backend is running and accessible
- Check that the authentication endpoints are available at `[BACKEND_URL]/auth/sign-in` and `[BACKEND_URL]/auth/sign-up`