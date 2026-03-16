from datetime import datetime, date
from typing import Iterable, Optional

from sqlalchemy.orm import Session

from app.db.models import Transaction


class TransactionsRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def list_for_user(
    self,
    user_id: int,
    from_date: Optional[date] = None,
    to_date: Optional[date] = None,
    category: Optional[str] = None,
    type: Optional[str] = None,
  ) -> Iterable[Transaction]:
    query = self.db.query(Transaction).filter(Transaction.user_id == user_id)
    if from_date is not None:
      query = query.filter(Transaction.date >= datetime.combine(from_date, datetime.min.time()))
    if to_date is not None:
      query = query.filter(Transaction.date <= datetime.combine(to_date, datetime.max.time()))
    if category is not None:
      query = query.filter(Transaction.category == category)
    if type is not None:
      query = query.filter(Transaction.type == type)
    return query.order_by(Transaction.date.desc()).all()

  def get_for_user(self, user_id: int, transaction_id: int) -> Optional[Transaction]:
    return (
      self.db.query(Transaction)
      .filter(Transaction.user_id == user_id, Transaction.id == transaction_id)
      .first()
    )

  def create_for_user(
    self,
    user_id: int,
    *,
    title: str,
    amount: float,
    category: str,
    type: str,
    date: datetime,
    note: Optional[str] = None,
  ) -> Transaction:
    tx = Transaction(
      user_id=user_id,
      title=title,
      amount=amount,
      category=category,
      type=type,
      date=date,
      note=note,
    )
    self.db.add(tx)
    self.db.commit()
    self.db.refresh(tx)
    return tx

  def update_for_user(
    self,
    user_id: int,
    transaction_id: int,
    **fields: object,
  ) -> Optional[Transaction]:
    tx = self.get_for_user(user_id, transaction_id)
    if tx is None:
      return None
    for key, value in fields.items():
      if value is not None and hasattr(tx, key):
        setattr(tx, key, value)
    self.db.commit()
    self.db.refresh(tx)
    return tx

  def delete_for_user(self, user_id: int, transaction_id: int) -> bool:
    tx = self.get_for_user(user_id, transaction_id)
    if tx is None:
      return False
    self.db.delete(tx)
    self.db.commit()
    return True

