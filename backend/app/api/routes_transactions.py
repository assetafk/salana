from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.routes_auth import get_current_user, get_db
from app.application.transactions.use_cases import (
  build_analytics_for_user,
  create_transaction_for_user,
  delete_transaction_for_user,
  list_transactions_for_user,
  update_transaction_for_user,
)
from app.db.models import User
from app.domain.transactions.entities import (
  TransactionCreate,
  TransactionFilters,
  TransactionRead,
  TransactionUpdate,
)
from app.infrastructure.transactions_repository import TransactionsRepository

router = APIRouter(prefix="/transactions", tags=["transactions"])


def get_repo(db: Session = Depends(get_db)) -> TransactionsRepository:
  return TransactionsRepository(db)


@router.get("/", response_model=list[TransactionRead])
def list_transactions(
  filters: TransactionFilters = Depends(),
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  return list_transactions_for_user(repo, current_user.id, filters)


@router.post("/", response_model=TransactionRead, status_code=status.HTTP_201_CREATED)
def create_transaction(
  payload: TransactionCreate,
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  return create_transaction_for_user(repo, current_user.id, payload)


@router.put("/{transaction_id}", response_model=TransactionRead)
def update_transaction(
  transaction_id: int,
  payload: TransactionUpdate,
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  updated = update_transaction_for_user(repo, current_user.id, transaction_id, payload)
  if updated is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
  return updated


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(
  transaction_id: int,
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  ok = delete_transaction_for_user(repo, current_user.id, transaction_id)
  if not ok:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
  return None


@router.get("/analytics/summary")
def analytics_summary(
  filters: TransactionFilters = Depends(),
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  return build_analytics_for_user(repo, current_user.id, filters)

