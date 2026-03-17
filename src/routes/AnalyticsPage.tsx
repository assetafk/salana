import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { PageContainer, PageTitle, Card } from '../shared/components/Layout.tsx'
import { useTransactions } from '../shared/hooks/useTransactions.ts'
import { groupByCategory, groupByDate, groupByType } from '../shared/lib/analytics.ts'

const COLORS = ['#22c55e', '#f97316', '#06b6d4', '#a855f7', '#facc15', '#fb7185']

export function AnalyticsPage() {
  const { data, isLoading, isError } = useTransactions()

  const categoryData = data ? groupByCategory(data) : []
  const typeData = data ? groupByType(data) : []
  const dateData = data ? groupByDate(data) : []

  return (
    <PageContainer>
      <PageTitle
        title="Аналитика"
        subtitle="Сводный обзор движения денег"
      />

      {isLoading && (
        <Card>
          <p className="text-sm text-zinc-500">Строим графики…</p>
        </Card>
      )}

      {isError && (
        <Card>
          <p className="text-sm text-rose-400">
            Не удалось загрузить данные для аналитики.
          </p>
        </Card>
      )}

      {!isLoading && !isError && data && data.length === 0 && (
        <Card>
          <p className="text-sm text-zinc-500">
            Пока нет данных для аналитики. Добавьте несколько транзакций.
          </p>
        </Card>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-[13px] font-semibold text-zinc-900">
              Баланс по категориям
            </h2>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="category" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1f2937' }}
                  />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-[13px] font-semibold text-zinc-900">
              Доходы vs расходы
            </h2>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="type"
                    outerRadius={90}
                    label
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-[13px] font-semibold text-zinc-900">
              Динамика по датам
            </h2>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="date" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#38bdf8"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </PageContainer>
  )
}

