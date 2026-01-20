# The Evolution of Todo - Full Stack Application

This repository contains a full-stack Todo application with an AI-powered chatbot assistant, developed in three phases.

## Project Structure

```
├───phase-1\
│   ├───.claude\
│   ├───.qwen\
│   ├───.specify\
│   ├───history\
│   ├───specs\
│   └───src\
├───phase-2\
│   ├───.claude\
│   ├───.specify\
│   ├───backend\          # FastAPI backend implementation
│   ├───frontend\         # Next.js frontend implementation
│   ├───history\
│   └───specs\
└───phase-3\
    ├───.claude\
    ├───.specify\
    ├───backend\          # Enhanced backend with AI chatbot
    ├───frontend\         # Enhanced frontend
    ├───history\
    └───specs\
├───RAILWAY_DEPLOYMENT_GUIDE.md  # Guide for deploying on Railway
├───RAILWAY_README.md            # README for Railway deployment
├───docker-compose.yml           # Docker compose for local development
└───...
```

## Features

- **Authentication**: Secure sign-up and sign-in with JWT-based authentication
- **Todo Management**: Full CRUD functionality (Add, Delete, Update, View, Mark Complete)
- **AI Chatbot**: Natural language processing for todo management using Cohere
- **Responsive Design**: Mobile-first approach with tablet and desktop support
- **Premium UI**: Glassmorphism effects, micro-interactions, and delightful animations

## Phases

### Phase 1
Initial planning and specification of the todo application.

### Phase 2
Full-stack implementation with:
- Backend: FastAPI server with JWT authentication
- Frontend: Next.js application with beautiful UI

### Phase 3
Enhanced version with AI chatbot integration:
- AI Chatbot: Powered by Cohere's command-r-plus model
- Natural language processing for todo management
- Enhanced UI with chat interface

## Deployment

The application can be deployed on platforms like Railway and Vercel. See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions on deploying the application with AI chatbot functionality on Railway.

## Technologies Used

- **Backend**: Python, FastAPI, SQLModel, PostgreSQL
- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS
- **AI**: Cohere for natural language processing
- **Authentication**: JWT tokens
- **Database**: PostgreSQL

## Getting Started

For local development, refer to the README files in the respective phase directories:

- `phase-2/backend/README.md`
- `phase-2/frontend/README.md`
- `phase-3/backend/README.md`
- `phase-3/frontend/README.md`

For deployment on Railway, see `RAILWAY_DEPLOYMENT_GUIDE.md`.

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