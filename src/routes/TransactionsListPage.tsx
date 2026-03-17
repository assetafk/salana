import { Link, useNavigate } from 'react-router-dom'
import { useDeleteTransaction, useTransactions } from '../shared/hooks/useTransactions.ts'
import { PageContainer, PageTitle, Card } from '../shared/components/Layout.tsx'

export function TransactionsListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useTransactions()
  const deleteMutation = useDeleteTransaction()

  return (
    <PageContainer>
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] text-zinc-600 shadow-sm shadow-black/5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.4)]" />
            Легкий контроль над личными финансами
          </div>
          <PageTitle
            title="Видно всё, что важно для денег."
            subtitle="Один аккуратный экран для транзакций, категорий и динамики — без шумных таблиц и лишних настроек."
          />
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/transactions/new"
              className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-[13px] font-medium text-zinc-50 shadow-sm shadow-black/10 transition hover:bg-black"
            >
              Добавить первую транзакцию
            </Link>
            <Link
              to="/analytics"
              className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2.5 text-[12px] font-medium text-zinc-800 shadow-sm shadow-black/5 transition hover:bg-white"
            >
              Смотреть аналитику
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 pt-3 text-[11px] text-zinc-500">
            <div>
              <div className="text-zinc-900">Мгновенный обзор</div>
              <div className="text-zinc-500">Баланс по категориям и датам в один клик</div>
            </div>
            <div>
              <div className="text-zinc-900">Честная простота</div>
              <div className="text-zinc-500">Никаких лишних экранов и настроек</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-emerald-400/25 via-sky-400/15 to-transparent blur-2xl" />
          <Card>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Сводка за сегодня</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                  Live
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-3 shadow-[0_14px_30px_rgba(0,0,0,0.06)]">
                  <div className="text-[11px] text-zinc-500">Чистый поток</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    + 24 300 ₽
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-500">
                    +18% к среднему дню
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 p-3 shadow-[0_14px_30px_rgba(0,0,0,0.06)]">
                  <div className="text-[11px] text-zinc-500">Расходы</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    9 800 ₽
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">
                    Основное: еда, транспорт
                  </div>
                </div>
              </div>
              <div className="h-14 rounded-2xl bg-gradient-to-r from-emerald-400/35 via-sky-400/30 to-transparent sm:h-16" />
            </div>
          </Card>
        </div>
      </section>

      <Card>
        {isLoading && <p className="text-sm text-zinc-500">Загружаем транзакции…</p>}
        {isError && (
          <p className="text-sm text-rose-500">
            Не удалось загрузить список. Попробуйте обновить страницу.
          </p>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <p className="text-sm text-zinc-500">
            Пока нет ни одной транзакции. Нажмите «Новая транзакция», чтобы добавить первую.
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/60">
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="min-w-full table-fixed text-left text-[11px] sm:text-xs">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                <tr>
                  <th className="w-24 px-4 py-2.5">Дата</th>
                  <th className="w-40 px-4 py-2.5">Название</th>
                  <th className="w-32 px-4 py-2.5">Категория</th>
                  <th className="w-24 px-4 py-2.5 text-right">Сумма</th>
                  <th className="w-32 px-4 py-2.5 text-right">Действия</th>
                </tr>
              </thead>
                <tbody>
                  {data.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-zinc-100 last:border-0 odd:bg-zinc-50 hover:bg-zinc-100/70"
                    >
                      <td className="px-4 py-2.5 text-[11px] text-zinc-500">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="truncate px-4 py-2.5 text-[13px] text-zinc-900">
                        {t.title}
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-zinc-600">
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
                          className="mr-2 rounded-full border border-zinc-300 px-3 py-1 text-zinc-800 shadow-sm shadow-black/5 transition hover:bg-white"
                          onClick={() => navigate(`/transactions/${t.id}`)}
                        >
                          Открыть
                        </button>
                        <button
                          className="mt-1 inline-flex rounded-full border border-rose-500/60 px-3 py-1 text-rose-600 shadow-sm shadow-black/5 transition hover:bg-rose-500/10 sm:mt-0"
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
          </div>
        )}
      </Card>
    </PageContainer>
  )
}

