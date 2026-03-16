from datetime import datetime, date
from typing import Literal, Optional

from pydantic import BaseModel, Field


TransactionType = Literal["income", "expense"]


class TransactionBase(BaseModel):
  title: str = Field(min_length=3, max_length=120)
  amount: float = Field(gt=0)
  category: str
  type: TransactionType
  date: datetime
  note: Optional[str] = Field(default=None, max_length=500)


class TransactionCreate(TransactionBase):
  pass


class TransactionUpdate(BaseModel):
  title: Optional[str] = Field(default=None, min_length=3, max_length=120)
  amount: Optional[float] = Field(default=None, gt=0)
  category: Optional[str] = None
  type: Optional[TransactionType] = None
  date: Optional[datetime] = None
  note: Optional[str] = Field(default=None, max_length=500)


class TransactionRead(TransactionBase):
  id: int

  class Config:
    from_attributes = True


class TransactionFilters(BaseModel):
  from_date: Optional[date] = None
  to_date: Optional[date] = None
  category: Optional[str] = None
  type: Optional[TransactionType] = None

