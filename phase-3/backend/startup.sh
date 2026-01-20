#!/bin/bash

# startup.sh - Script to initialize the application with database setup

# Wait for database to be ready and run any pending migrations
echo "Waiting for database to be ready..."
python -c "
import asyncio
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
        exit(1)

asyncio.run(wait_for_db())
"

# Create tables if they don't exist
echo "Creating database tables..."
python -c "
import asyncio
from app.db import create_db_and_tables

async def setup_db():
    await create_db_and_tables()
    print('Database tables created')

asyncio.run(setup_db())
"

# Start the application
echo "Starting the application..."
exec uvicorn app.main:app --host=0.0.0.0 --port=\${PORT:-8000}