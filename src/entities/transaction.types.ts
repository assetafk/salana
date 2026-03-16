import { z } from 'zod'

export const transactionIdSchema = z.string().uuid()

export const transactionCategorySchema = z.enum([
  'salary',
  'freelance',
  'food',
  'housing',
  'transport',
  'entertainment',
  'health',
  'other',
])

export const transactionTypeSchema = z.enum(['income', 'expense'])

export const transactionSchema = z.object({
  id: transactionIdSchema,
  title: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(120, 'Название не должно быть длиннее 120 символов'),
  amount: z
    .number()
    .positive('Сумма должна быть больше нуля'),
  category: transactionCategorySchema,
  type: transactionTypeSchema,
  date: z.string().datetime({ offset: true }),
  note: z.string().max(500, 'Комментарий не должен быть длиннее 500 символов').optional(),
})

export const transactionFormSchema = transactionSchema
  .omit({ id: true })
  .extend({
    amount: z
      .string()
      .min(1, 'Укажите сумму')
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
        message: 'Сумма должна быть числом больше нуля',
      }),
    date: z.string().min(1, 'Укажите дату'),
  })

export type TransactionId = z.infer<typeof transactionIdSchema>
export type Transaction = z.infer<typeof transactionSchema>
export type TransactionFormValues = z.infer<typeof transactionFormSchema>
