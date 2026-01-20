---
title: Todo Backend with AI Chatbot
emoji: 📝
colorFrom: purple
colorTo: green
sdk: docker
pinned: false
license: mit
---

# Todo Backend with AI Chatbot

This is a backend service for a Todo application with AI chatbot functionality powered by Cohere.

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

## About

This backend provides a complete API for a todo application with AI chatbot functionality. It uses:
- FastAPI for the web framework
- SQLModel for database modeling
- Cohere for AI chatbot functionality
- JWT for authentication