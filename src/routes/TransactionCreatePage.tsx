import { useNavigate } from 'react-router-dom'
import { PageContainer, PageTitle, Card } from '../shared/components/Layout.tsx'
import { TransactionForm } from '../shared/components/TransactionForm.tsx'
import { useCreateTransaction } from '../shared/hooks/useTransactions.ts'

export function TransactionCreatePage() {
  const navigate = useNavigate()
  const createMutation = useCreateTransaction()

  return (
    <PageContainer>
      <PageTitle
        title="Новая транзакция"
        subtitle="Опишите движение денег в понятных терминах"
      />
      <Card>
        <TransactionForm
          submitting={createMutation.isPending}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            navigate('/transactions')
          }}
        />
      </Card>
    </PageContainer>
  )
}

