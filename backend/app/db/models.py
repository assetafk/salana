from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from .base import Base


class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  email = Column(String(255), unique=True, index=True, nullable=False)
  hashed_password = Column(String(255), nullable=False)
  full_name = Column(String(255), nullable=True)
  created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

  transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")


class Transaction(Base):
  __tablename__ = "transactions"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

  title = Column(String(255), nullable=False)
  amount = Column(Float, nullable=False)
  category = Column(String(64), nullable=False)
  type = Column(String(16), nullable=False)  # income / expense
  date = Column(DateTime, nullable=False)
  note = Column(Text, nullable=True)

  created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

  user = relationship("User", back_populates="transactions")

