from datetime import timedelta

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.application.auth.use_cases import (
  ACCESS_TOKEN_EXPIRE_MINUTES,
  SECRET_KEY,
  Token,
  authenticate_user,
  create_access_token,
  hash_password,
)
from app.db.base import SessionLocal
from app.db.models import User
from app.domain.users.entities import UserCreate, UserRead
from app.infrastructure.users_repository import UsersRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter(prefix="/auth", tags=["auth"])


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def get_current_user(
  token: str = Depends(oauth2_scheme),
  db: Session = Depends(get_db),
) -> User:
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user_id: str | None = payload.get("sub")
    if user_id is None:
      raise credentials_exception
  except jwt.PyJWTError:
    raise credentials_exception

  repo = UsersRepository(db)
  user = repo.get_by_id(int(user_id))
  if user is None:
    raise credentials_exception
  return user


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
  repo = UsersRepository(db)
  existing = repo.get_by_email(payload.email)
  if existing:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
  user = repo.create(
    email=payload.email,
    hashed_password=hash_password(payload.password),
    full_name=payload.full_name,
  )
  return user


@router.post("/login", response_model=Token)
def login_for_access_token(
  form_data: OAuth2PasswordRequestForm = Depends(),
  db: Session = Depends(get_db),
):
  repo = UsersRepository(db)
  user = authenticate_user(repo, form_data.username, form_data.password)
  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Incorrect email or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(subject=str(user.id), expires_delta=access_token_expires)
  return Token(access_token=access_token)


@router.get("/me", response_model=UserRead)
def read_users_me(current_user: User = Depends(get_current_user)):
  return current_user

