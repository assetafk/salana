import { useParams, useNavigate } from 'react-router-dom'
import { PageContainer, PageTitle, Card } from '../shared/components/Layout.tsx'
import {
  useDeleteTransaction,
  useTransaction,
  useUpdateTransaction,
} from '../shared/hooks/useTransactions.ts'
import { TransactionForm } from '../shared/components/TransactionForm.tsx'

export function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useTransaction(id)
  const deleteMutation = useDeleteTransaction()
  const updateMutation = useUpdateTransaction(id!)

  if (isLoading) {
    return (
      <PageContainer>
        <PageTitle title="Транзакция" />
        <Card>
          <p className="text-sm text-slate-300">Загружаем транзакцию…</p>
        </Card>
      </PageContainer>
    )
  }

  if (isError || !data) {
    return (
      <PageContainer>
        <PageTitle title="Транзакция" />
        <Card>
          <p className="text-sm text-rose-400">
            Не удалось загрузить транзакцию или она была удалена.
          </p>
        </Card>
      </PageContainer>
    )
  }

  const defaultValues = {
    title: data.title,
    amount: String(data.amount),
    category: data.category,
    type: data.type,
    date: data.date.slice(0, 10),
    note: data.note ?? '',
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-3">
        <PageTitle
          title="Транзакция"
          subtitle="Измените детали движения денег"
        />
        <button
          className="rounded border border-rose-500/70 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/10"
          onClick={async () => {
            if (!id) return
            await deleteMutation.mutateAsync(id)
            navigate('/transactions')
          }}
        >
          Удалить
        </button>
      </div>
      <Card>
        <TransactionForm
          defaultValues={defaultValues}
          submitting={updateMutation.isPending}
          onSubmit={async (values) => {
            if (!id) return
            await updateMutation.mutateAsync(values)
            navigate('/transactions')
          }}
        />
      </Card>
    </PageContainer>
  )
}

