from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes_auth import get_current_user, get_db
from app.application.transactions.use_cases import build_analytics_for_user
from app.db.models import User
from app.domain.transactions.entities import TransactionFilters
from app.infrastructure.transactions_repository import TransactionsRepository

router = APIRouter(prefix="/analytics", tags=["analytics"])


def get_repo(db: Session = Depends(get_db)) -> TransactionsRepository:
  return TransactionsRepository(db)


@router.get("/categories")
def analytics_by_categories(
  filters: TransactionFilters = Depends(),
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  summary = build_analytics_for_user(repo, current_user.id, filters)
  return summary["byCategory"]


@router.get("/types")
def analytics_by_types(
  filters: TransactionFilters = Depends(),
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  summary = build_analytics_for_user(repo, current_user.id, filters)
  return summary["byType"]


@router.get("/dates")
def analytics_by_dates(
  filters: TransactionFilters = Depends(),
  current_user: User = Depends(get_current_user),
  repo: TransactionsRepository = Depends(get_repo),
):
  summary = build_analytics_for_user(repo, current_user.id, filters)
  return summary["byDate"]

