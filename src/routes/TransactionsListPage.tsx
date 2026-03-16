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
          className="inline-flex items-center rounded-full bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-900 shadow-sm shadow-black/40 transition hover:bg-white"
        >
          Новая транзакция
        </Link>
      </div>

      <Card>
        {isLoading && <p className="text-sm text-zinc-300">Загружаем транзакции…</p>}
        {isError && (
          <p className="text-sm text-rose-400">
            Не удалось загрузить список. Попробуйте обновить страницу.
          </p>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <p className="text-sm text-zinc-300">
            Пока нет ни одной транзакции. Нажмите «Новая транзакция», чтобы добавить первую.
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/10">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-white/5 bg-white/5 text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                <tr>
                  <th className="px-4 py-2.5">Дата</th>
                  <th className="px-4 py-2.5">Название</th>
                  <th className="px-4 py-2.5">Категория</th>
                  <th className="px-4 py-2.5 text-right">Сумма</th>
                  <th className="px-4 py-2.5 text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-white/5 last:border-0 odd:bg-white/[0.01] hover:bg-white/[0.06]"
                  >
                    <td className="px-4 py-2.5 text-[11px] text-zinc-400">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-zinc-100">
                      {t.title}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] text-zinc-300">
                      {t.category}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-right text-[13px] font-medium ${
                        t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}
                      {t.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[11px]">
                      <button
                        className="mr-2 rounded-full border border-white/15 px-3 py-1 text-zinc-100 shadow-sm shadow-black/40 transition hover:bg-white/10"
                        onClick={() => navigate(`/transactions/${t.id}`)}
                      >
                        Открыть
                      </button>
                      <button
                        className="rounded-full border border-rose-500/70 px-3 py-1 text-rose-300 shadow-sm shadow-black/40 transition hover:bg-rose-500/15"
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

