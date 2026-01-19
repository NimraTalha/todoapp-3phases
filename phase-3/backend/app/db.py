from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from .core.config import settings

from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
import os

# For serverless functions, use minimal connection pool settings
# Neon requires sslmode=require for secure connections
# asyncpg uses 'postgresql+asyncpg://'
database_url = settings.DATABASE_URL
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)

# Clean up query params for asyncpg
parsed = urlparse(database_url)
qs = parse_qs(parsed.query)

# Remove unsupported keys
for key in ["sslmode", "channel_binding", "options"]:
    qs.pop(key, None)

# Rebuild URL without forcing ssl query params; we'll pass SSL via connect_args
new_query = urlencode(qs, doseq=True)
database_url = urlunparse(parsed._replace(query=new_query))

# Determine connect args: enable SSL for non-local hosts (e.g., Neon)
connect_args = {}
hostname = parsed.hostname or ""
if hostname not in ("localhost", "127.0.0.1", ""):
    # asyncpg expects `ssl` argument (True or SSLContext) instead of sslmode
    connect_args = {"ssl": True}

# For serverless functions, use minimal pool settings to avoid connection issues
engine = create_async_engine(
    database_url,
    echo=bool(os.getenv("SQLALCHEMY_ECHO")),  # Only enable if explicitly set
    future=True,
    connect_args=connect_args,
    pool_pre_ping=True,    # Check connection liveness before using
    pool_recycle=300,      # Recycle connections every 5 minutes
    pool_size=1,           # Minimal pool size for serverless
    max_overflow=2,        # Allow minimal overflow
    pool_timeout=20,       # Timeout for getting connection from pool
    pool_reset_on_return="commit"  # Reset connection when returned to pool
)

from sqlmodel import SQLModel

async def get_async_session() -> AsyncSession:
    async with AsyncSession(engine, expire_on_commit=False) as session:
        yield session

# For serverless, we'll create tables on demand rather than at startup
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
