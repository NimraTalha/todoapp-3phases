# Deploying Todo App with AI Chatbot on Railway

This guide explains how to deploy the full-stack Todo application with AI chatbot functionality on Railway.

## Overview

The application consists of:
- **Backend**: FastAPI server with JWT authentication and AI chatbot powered by Cohere
- **Frontend**: Next.js application with beautiful UI and chat interface

## Prerequisites

- Railway account (https://railway.app)
- Vercel account (for frontend deployment) - OR use Railway for both
- Cohere API key (https://cohere.ai)

## Deploying the Backend on Railway

### 1. Create a new Railway project

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Choose "Deploy from GitHub" and connect to your repository
4. Select the `todolist/Todopro/phase-3/backend` directory

### 2. Configure Environment Variables

Go to the "Variables" tab in your Railway project and add:

```
COHERE_API_KEY=your_cohere_api_key_here
BETTER_AUTH_SECRET=your_strong_secret_here
```

Note: DATABASE_URL will be automatically populated if you provision a PostgreSQL database in the next step.

### 3. Provision a Database

1. Go to the "Provision" tab in your Railway project
2. Select "PostgreSQL" from the database options
3. Click "Deploy"

### 4. Important: Remove Vercel Configuration (Optional but Recommended)

Before deploying, you may want to remove the `vercel.json` file from the repository to avoid any potential conflicts with Railway's build process. Either:

- Remove the file from your repository, or
- Create a new branch specifically for Railway deployment without the `vercel.json` file

### 5. Deploy the Backend

Click "Deploy" to deploy your backend. Railway will automatically use the Dockerfile and requirements.txt to build and deploy your application. Once deployed, note the public URL assigned to your backend.

## Deploying the Frontend

### Option A: Deploy on Vercel (Recommended)

1. Go to https://vercel.com and sign in
2. Click "New Project" and import your repository
3. Select the `todolist/Todopro/phase-2/frontend` directory
4. In the settings, add the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-project.railway.app
   ```
5. Click "Deploy"

### Option B: Deploy on Railway

1. Create a new Railway project
2. Choose "Deploy from GitHub" and connect to your repository
3. Select the `todolist/Todopro/phase-2/frontend` directory
4. Add the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-project.railway.app
   ```
5. Configure Build & Run settings:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
   - Build Directory: `out`

## Testing the Chatbot Functionality

After deployment:

1. Sign up or sign in to your deployed application
2. Navigate to the dashboard
3. Look for the chatbot interface (usually a floating button or dedicated section)
4. Try sending messages like:
   - "Add a task called 'Buy groceries'"
   - "Show my tasks"
   - "Mark task 1 as complete"
   - "Delete task 2"

## Troubleshooting Common Issues

### 1. Chatbot not responding
- Verify that your Cohere API key is correctly set in the backend environment variables
- Check the backend logs in Railway for any errors
- Ensure the frontend is pointing to the correct backend API URL

### 2. Authentication issues
- Make sure the `BETTER_AUTH_SECRET` is the same across both backend and frontend
- Verify that CORS is properly configured to allow requests from your frontend domain

### 3. Database connection issues
- Check that the PostgreSQL database is properly provisioned and connected
- Verify that the `DATABASE_URL` environment variable is set correctly

## Updating Deployments

To update your deployments after making changes:

1. Commit and push your changes to the GitHub repository
2. Railway will automatically detect the changes and redeploy
3. Monitor the deployment logs for any issues

## Monitoring & Logs

- Access backend logs in Railway by clicking on your project and selecting "Logs"
- For frontend logs, use your hosting platform's logging system (Vercel dashboard)

## Scaling

Railway allows you to scale your application based on demand. Adjust the resources allocated to your backend and database as needed based on usage patterns.