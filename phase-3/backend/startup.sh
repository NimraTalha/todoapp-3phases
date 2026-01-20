#!/bin/bash

# startup.sh - Script to initialize the application with database setup

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable is not set"
  echo "Please make sure you have provisioned a PostgreSQL database in Railway"
  exit 1
fi

echo "Using DATABASE_URL: $DATABASE_URL"

# Wait for database to be ready and run any pending migrations
echo "Waiting for database to be ready..."
python -c "
import asyncio
import os
import time
from app.db import engine
from sqlalchemy import text

async def wait_for_db():
    max_attempts = 30
    attempt = 0
    while attempt < max_attempts:
        try:
            async with engine.begin() as conn:
                await conn.execute(text('SELECT 1'))
            print('Database connection successful')
            break
        except Exception as e:
            print(f'Database not ready, attempt {attempt + 1}/30: {e}')
            attempt += 1
            time.sleep(2)
    else:
        print('Could not connect to database after 30 attempts')
        # Don't exit here, let the app start and handle DB issues at runtime
        print('Continuing startup, database connection will be retried at runtime')

asyncio.run(wait_for_db())
"

# Create tables if they don't exist
echo "Creating database tables..."
python -c "
import asyncio
import os
from app.db import create_db_and_tables

async def setup_db():
    try:
        await create_db_and_tables()
        print('Database tables created')
    except Exception as e:
        print(f'Warning: Could not create database tables: {e}')
        print('This might be because the database is not yet ready, continuing startup...')

asyncio.run(setup_db())
"

# Start the application
echo "Starting the application..."
PORT=\${PORT:-8000}
echo "Using port: \$PORT"
exec uvicorn app.main:app --host=0.0.0.0 --port=\$PORT