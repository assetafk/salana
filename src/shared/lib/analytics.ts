import { Transaction } from '../../entities/transaction.types.ts'

export function groupByCategory(transactions: Transaction[]) {
  const map = new Map<string, number>()
  transactions.forEach((t) => {
    const prev = map.get(t.category) ?? 0
    const signed = t.type === 'income' ? t.amount : -t.amount
    map.set(t.category, prev + signed)
  })
  return Array.from(map.entries()).map(([category, total]) => ({
    category,
    total,
  }))
}

export function groupByType(transactions: Transaction[]) {
  let income = 0
  let expense = 0
  transactions.forEach((t) => {
    if (t.type === 'income') income += t.amount
    else expense += t.amount
  })
  return [
    { type: 'Доход', value: income },
    { type: 'Расход', value: expense },
  ]
}

export function groupByDate(transactions: Transaction[]) {
  const map = new Map<string, number>()
  transactions.forEach((t) => {
    const day = new Date(t.date).toISOString().slice(0, 10)
    const prev = map.get(day) ?? 0
    const signed = t.type === 'income' ? t.amount : -t.amount
    map.set(day, prev + signed)
  })

  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, total]) => ({ date, total }))
}

