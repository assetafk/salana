import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  transactionCategorySchema,
  transactionFormSchema,
  transactionTypeSchema,
} from '../../entities/transaction.types.ts'
import type { TransactionFormValues } from '../../entities/transaction.types.ts'

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
      className="grid gap-5 md:grid-cols-2"
    >
      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-zinc-200">
          Название
        </label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30 placeholder:text-zinc-500"
          {...register('title')}
          placeholder="Например, зарплата или кофе"
        />
        {errors.title && (
          <p className="text-xs text-rose-400">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-zinc-200">
          Сумма
        </label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30 placeholder:text-zinc-500"
          {...register('amount')}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-xs text-rose-400">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-zinc-200">
          Категория
        </label>
        <select
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30"
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

      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-zinc-200">
          Тип
        </label>
        <select
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30"
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

      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-zinc-200">
          Дата
        </label>
        <input
          type="date"
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30"
          {...register('date')}
        />
        {errors.date && (
          <p className="text-xs text-rose-400">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-1.5 md:col-span-2">
        <label className="block text-[13px] font-medium text-zinc-200">
          Комментарий
        </label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-[13px] text-zinc-50 outline-none ring-1 ring-transparent transition focus:border-white/30 focus:ring-white/30 placeholder:text-zinc-500"
          {...register('note')}
          placeholder="Необязательно"
        />
        {errors.note && (
          <p className="text-xs text-rose-400">{errors.note.message}</p>
        )}
      </div>

      <div className="md:col-span-2 flex justify-end gap-3 pt-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-full bg-zinc-50 px-5 py-2 text-[13px] font-medium text-zinc-900 shadow-sm shadow-black/40 transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </div>
    </form>
  )
}

