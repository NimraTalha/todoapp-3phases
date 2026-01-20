# Todo App with AI Chatbot - Railway Deployment

This repository contains a full-stack Todo application with an AI-powered chatbot assistant. The application is designed to be easily deployed on Railway.

## Architecture

- **Frontend**: Next.js 16+ application with beautiful UI and responsive design
- **Backend**: FastAPI server with JWT authentication and PostgreSQL database
- **AI Chatbot**: Powered by Cohere's command-r-plus model with natural language processing
- **Database**: PostgreSQL for data persistence

## Features

- User authentication (sign up/sign in)
- Full CRUD operations for todo items
- AI chatbot that understands natural language commands
- Beautiful, responsive UI with glassmorphism effects
- Optimistic updates for smooth user experience

## Deployment on Railway

### Prerequisites

- Railway account (https://railway.app)
- Cohere API key (https://cohere.ai)

### Important Configuration

Before deploying the backend to Railway, you should remove the `vercel.json` file from the backend directory to avoid conflicts with Railway's build process. The application includes both Vercel and Railway configurations, but they can conflict during the build process.

### Backend Deployment

1. Fork this repository
2. Connect your GitHub account to Railway
3. Create a new Railway project
4. Select this repository and the `phase-3/backend` directory
5. Add the following environment variables:
   - `COHERE_API_KEY`: Your Cohere API key
   - `BETTER_AUTH_SECRET`: A strong secret for JWT signing
   - `DATABASE_URL`: Will be automatically set when you provision PostgreSQL
6. Provision a PostgreSQL database from the "Provision" tab
7. Deploy the backend

### Frontend Deployment

1. Create a new Railway project for the frontend
2. Select this repository and the `phase-2/frontend` directory
3. Add the environment variable:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend
4. Deploy the frontend

## Chatbot Capabilities

The AI chatbot supports natural language commands in multiple languages:

- English: "Add a task to buy groceries"
- Roman Urdu: "Mera task add kardo 'buy milk'"
- Urdu: "میرا کام شامل کریں 'water plants'"

Supported commands:
- Add tasks: "Add a task called 'Buy groceries'"
- List tasks: "Show my tasks" or "list dikhao"
- Complete tasks: "Mark task 1 as complete" or "marks bhi lagado"
- Delete tasks: "Delete task 2" or "delete kardo"
- Update tasks: "Update task 1 to 'Buy organic groceries'"
- Get user info: "Who am I?"

## Environment Variables

### Backend
- `COHERE_API_KEY`: Required for AI chatbot functionality
- `BETTER_AUTH_SECRET`: Secret for JWT token signing
- `DATABASE_URL`: Connection string for PostgreSQL (automatically set by Railway)

### Frontend
- `NEXT_PUBLIC_API_URL`: URL of the deployed backend API

## Local Development

To run the application locally:

1. Clone the repository
2. Set up environment variables in `.env.local` files
3. Run the backend:
   ```bash
   cd phase-3/backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
4. Run the frontend:
   ```bash
   cd phase-2/frontend
   npm install
   npm run dev
   ```

## Docker Support

The repository includes Dockerfiles for both backend and frontend, as well as a docker-compose file for local development:

```bash
docker-compose up --build
```

## Troubleshooting

### Chatbot not working
- Verify that `COHERE_API_KEY` is correctly set in the backend environment
- Check backend logs for any API errors

### Authentication issues
- Ensure `BETTER_AUTH_SECRET` is the same in both backend and frontend
- Verify that CORS allows requests from your frontend domain

### Database connection issues
- Confirm that PostgreSQL is provisioned and `DATABASE_URL` is set
- Check that the database schema is properly migrated

## Scaling

Railway allows easy scaling of resources based on your application's needs. Adjust CPU, memory, and database resources as required based on usage patterns.