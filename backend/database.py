import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "pegar url de conexion de neon"
)

engine = create_engine(
    DATABASE_URL, 
    pool_pre_ping=True,  # <--- Esto detecta conexiones caídas y las reabre solo
    pool_recycle=300     # <--- Recicla las conexiones cada 5 minutos
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()