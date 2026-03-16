from collections import defaultdict
from datetime import date
from typing import Iterable, List

from app.db.models import Transaction as TransactionModel
from app.domain.transactions.entities import (
  TransactionCreate,
  TransactionFilters,
  TransactionRead,
  TransactionUpdate,
)
from app.infrastructure.transactions_repository import TransactionsRepository


def create_transaction_for_user(
  repo: TransactionsRepository,
  user_id: int,
  payload: TransactionCreate,
) -> TransactionRead:
  tx = repo.create_for_user(
    user_id=user_id,
    title=payload.title,
    amount=payload.amount,
    category=payload.category,
    type=payload.type,
    date=payload.date,
    note=payload.note,
  )
  return TransactionRead.model_validate(tx)


def update_transaction_for_user(
  repo: TransactionsRepository,
  user_id: int,
  transaction_id: int,
  payload: TransactionUpdate,
) -> TransactionRead | None:
  tx = repo.update_for_user(
    user_id=user_id,
    transaction_id=transaction_id,
    title=payload.title,
    amount=payload.amount,
    category=payload.category,
    type=payload.type,
    date=payload.date,
    note=payload.note,
  )
  if tx is None:
    return None
  return TransactionRead.model_validate(tx)


def list_transactions_for_user(
  repo: TransactionsRepository,
  user_id: int,
  filters: TransactionFilters,
) -> List[TransactionRead]:
  items = repo.list_for_user(
    user_id=user_id,
    from_date=filters.from_date,
    to_date=filters.to_date,
    category=filters.category,
    type=filters.type,
  )
  return [TransactionRead.model_validate(item) for item in items]


def delete_transaction_for_user(
  repo: TransactionsRepository,
  user_id: int,
  transaction_id: int,
) -> bool:
  return repo.delete_for_user(user_id=user_id, transaction_id=transaction_id)


def _group_by_category(transactions: Iterable[TransactionModel]):
  totals: dict[str, float] = defaultdict(float)
  for t in transactions:
    signed = t.amount if t.type == "income" else -t.amount
    totals[t.category] += signed
  return [{"category": k, "total": v} for k, v in totals.items()]


def _group_by_type(transactions: Iterable[TransactionModel]):
  income = 0.0
  expense = 0.0
  for t in transactions:
    if t.type == "income":
      income += t.amount
    else:
      expense += t.amount
  return [
    {"type": "Доход", "value": income},
    {"type": "Расход", "value": expense},
  ]


def _group_by_date(transactions: Iterable[TransactionModel]):
  totals: dict[date, float] = defaultdict(float)
  for t in transactions:
    day = t.date.date()
    signed = t.amount if t.type == "income" else -t.amount
    totals[day] += signed
  return [
    {"date": d.isoformat(), "total": total}
    for d, total in sorted(totals.items(), key=lambda item: item[0])
  ]


def build_analytics_for_user(
  repo: TransactionsRepository,
  user_id: int,
  filters: TransactionFilters,
):
  txs = repo.list_for_user(
    user_id=user_id,
    from_date=filters.from_date,
    to_date=filters.to_date,
    category=filters.category,
    type=filters.type,
  )
  return {
    "byCategory": _group_by_category(txs),
    "byType": _group_by_type(txs),
    "byDate": _group_by_date(txs),
  }

