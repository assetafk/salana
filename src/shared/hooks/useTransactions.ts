import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from '../../entities/transaction.api.ts'
import type { TransactionFormValues } from '../../entities/transaction.types.ts'

const TRANSACTIONS_KEY = ['transactions']

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTIONS_KEY,
    queryFn: getTransactions,
  })
}

export function useTransaction(id: string | undefined) {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, id],
    queryFn: () => {
      if (!id) throw new Error('id is required')
      return getTransactionById(id)
    },
    enabled: Boolean(id),
  })
}

export function useCreateTransaction() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (payload: TransactionFormValues) => createTransaction(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: TRANSACTIONS_KEY })
    },
  })
}

export function useUpdateTransaction(id: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (payload: TransactionFormValues) => updateTransaction(id, payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: TRANSACTIONS_KEY })
      client.invalidateQueries({ queryKey: [...TRANSACTIONS_KEY, id] })
    },
  })
}

export function useDeleteTransaction() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: TRANSACTIONS_KEY })
    },
  })
}

