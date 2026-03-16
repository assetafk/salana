import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TransactionFormValues,
  transactionCategorySchema,
  transactionFormSchema,
  transactionTypeSchema,
} from '../../entities/transaction.types.ts'

type Props = {
  defaultValues?: Partial<TransactionFormValues>
  onSubmit: (values: TransactionFormValues) => void
  submitting?: boolean
}

const categories = transactionCategorySchema.options
const types = transactionTypeSchema.options

export function TransactionForm({ defaultValues, onSubmit, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 md:grid-cols-2"
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-200">
          Название
        </label>
        <input
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('title')}
          placeholder="Например, зарплата или кофе"
        />
        {errors.title && (
          <p className="text-xs text-rose-400">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-200">
          Сумма
        </label>
        <input
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('amount')}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-xs text-rose-400">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-200">
          Категория
        </label>
        <select
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('category')}
        >
          <option value="">Выберите категорию</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-rose-400">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-200">
          Тип
        </label>
        <select
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('type')}
        >
          <option value="">Выберите тип</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t === 'income' ? 'Доход' : 'Расход'}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-xs text-rose-400">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-200">
          Дата
        </label>
        <input
          type="date"
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('date')}
        />
        {errors.date && (
          <p className="text-xs text-rose-400">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-1 md:col-span-2">
        <label className="block text-sm font-medium text-slate-200">
          Комментарий
        </label>
        <textarea
          rows={3}
          className="w-full resize-none rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/60 focus:ring"
          {...register('note')}
          placeholder="Необязательно"
        />
        {errors.note && (
          <p className="text-xs text-rose-400">{errors.note.message}</p>
        )}
      </div>

      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </div>
    </form>
  )
}

