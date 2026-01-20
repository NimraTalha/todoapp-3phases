# Todo Backend with AI Chatbot

This is a backend service for a Todo application with AI chatbot functionality.

## Endpoints

- `/health` - Health check
- `/api/ping` - Ping endpoint
- `/api/auth/sign-in` - User sign in
- `/api/auth/sign-up` - User sign up
- `/api/tasks/` - Todo operations
- `/api/{user_id}/chat` - AI chatbot endpoint

## Environment Variables

- `BETTER_AUTH_SECRET` - Secret for JWT authentication
- `COHERE_API_KEY` - API key for Cohere AI service
- `DATABASE_URL` - PostgreSQL database URL

## Usage

This backend is designed to work with the Todo frontend application.