from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
  email: EmailStr
  full_name: Optional[str] = Field(default=None, max_length=255)


class UserCreate(UserBase):
  password: str = Field(min_length=8, max_length=128)


class UserRead(UserBase):
  id: int
  created_at: datetime

  class Config:
    from_attributes = True


class UserInDB(UserBase):
  id: int
  hashed_password: str
  created_at: datetime

  class Config:
    from_attributes = True

