import { Link, useNavigate } from 'react-router-dom'
import { useDeleteTransaction, useTransactions } from '../shared/hooks/useTransactions.ts'
import { PageContainer, PageTitle, Card } from '../shared/components/Layout.tsx'

export function TransactionsListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useTransactions()
  const deleteMutation = useDeleteTransaction()

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-3">
        <PageTitle
          title="Транзакции"
          subtitle="История доходов и расходов"
        />
        <Link
          to="/transactions/new"
          className="inline-flex items-center rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow hover:bg-emerald-400"
        >
          Новая транзакция
        </Link>
      </div>

      <Card>
        {isLoading && <p className="text-sm text-slate-300">Загружаем транзакции…</p>}
        {isError && (
          <p className="text-sm text-rose-400">
            Не удалось загрузить список. Попробуйте обновить страницу.
          </p>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <p className="text-sm text-slate-300">
            Пока нет ни одной транзакции. Нажмите «Новая транзакция», чтобы добавить первую.
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">Дата</th>
                  <th className="px-3 py-2">Название</th>
                  <th className="px-3 py-2">Категория</th>
                  <th className="px-3 py-2 text-right">Сумма</th>
                  <th className="px-3 py-2 text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/70"
                  >
                    <td className="px-3 py-2 text-xs text-slate-400">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-100">{t.title}</td>
                    <td className="px-3 py-2 text-xs text-slate-300">{t.category}</td>
                    <td
                      className={`px-3 py-2 text-right text-sm font-medium ${
                        t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}
                      {t.amount.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      <button
                        className="mr-2 rounded border border-slate-700 px-2 py-1 text-slate-200 hover:bg-slate-800"
                        onClick={() => navigate(`/transactions/${t.id}`)}
                      >
                        Открыть
                      </button>
                      <button
                        className="rounded border border-rose-500/70 px-2 py-1 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => deleteMutation.mutate(t.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PageContainer>
  )
}

