from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Fee(Base):
    __tablename__ = "fees"
    caste = Column(String, primary_key=True)   # general, obc, sc, st
    lang = Column(String, default="en")        # keep fixed as "en"
    amount = Column(String)                    # fee amount text

# SQLite database
DATABASE_URL = "sqlite:///./college.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
