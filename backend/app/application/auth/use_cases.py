from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr

from app.db.models import User
from app.infrastructure.users_repository import UsersRepository

PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "CHANGE_ME_IN_PRODUCTION"


class Token(BaseModel):
  access_token: str
  token_type: str = "bearer"


def hash_password(password: str) -> str:
  return PWD_CONTEXT.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return PWD_CONTEXT.verify(plain_password, hashed_password)


def authenticate_user(repo: UsersRepository, email: str, password: str) -> Optional[User]:
  user = repo.get_by_email(email)
  if not user:
    return None
  if not verify_password(password, user.hashed_password):
    return None
  return user


def create_access_token(*, subject: str, expires_delta: Optional[timedelta] = None) -> str:
  if expires_delta is None:
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  expire = datetime.now(timezone.utc) + expires_delta
  to_encode = {"sub": subject, "exp": expire}
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

