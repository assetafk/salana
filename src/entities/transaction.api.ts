import type { Transaction, TransactionFormValues } from './transaction.types.ts'
import { v4 as uuid } from 'uuid'

const STORAGE_KEY = 'finance-flow:transactions'

function readStorage(): Transaction[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Transaction[]
  } catch {
    return []
  }
}

function writeStorage(data: Transaction[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function simulateDelay<T>(value: T, delay = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay))
}

export async function getTransactions(): Promise<Transaction[]> {
  return simulateDelay(readStorage())
}

export async function getTransactionById(id: string): Promise<Transaction | undefined> {
  const all = readStorage()
  return simulateDelay(all.find((t) => t.id === id))
}

export async function createTransaction(
  payload: TransactionFormValues,
): Promise<Transaction> {
  const all = readStorage()
  const next: Transaction = {
    id: uuid(),
    title: payload.title,
    amount: Number(payload.amount),
    category: payload.category,
    type: payload.type,
    date: new Date(payload.date).toISOString(),
    note: payload.note,
  }
  const updated = [next, ...all]
  writeStorage(updated)
  return simulateDelay(next)
}

export async function updateTransaction(
  id: string,
  payload: TransactionFormValues,
): Promise<Transaction> {
  const all = readStorage()
  const index = all.findIndex((t) => t.id === id)
  if (index === -1) {
    throw new Error('Транзакция не найдена')
  }
  const updatedItem: Transaction = {
    ...all[index],
    title: payload.title,
    amount: Number(payload.amount),
    category: payload.category,
    type: payload.type,
    date: new Date(payload.date).toISOString(),
    note: payload.note,
  }
  const updated = [...all]
  updated[index] = updatedItem
  writeStorage(updated)
  return simulateDelay(updatedItem)
}

export async function deleteTransaction(id: string): Promise<void> {
  const all = readStorage()
  const updated = all.filter((t) => t.id !== id)
  writeStorage(updated)
  await simulateDelay(undefined)
}
