## Интеграция React Query с FastAPI-бэкендом

### 1. Базовая конфигурация клиента

- Бэкенд поднимается, например, на `http://localhost:8000`.
- Все защищённые эндпойнты требуют заголовок:

```http
Authorization: Bearer <access_token>
```

Токен берётся из ответа `POST /auth/login`.

### 2. Эндпойнты FastAPI

- `POST /auth/register` — регистрация пользователя.
- `POST /auth/login` — логин, возвращает:

```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

- `GET /auth/me` — текущий пользователь.
- `GET /transactions` — список транзакций текущего пользователя.
- `POST /transactions` — создание транзакции.
- `PUT /transactions/{id}` — обновление.
- `DELETE /transactions/{id}` — удаление.
- `GET /transactions/analytics/summary` — агрегированная аналитика.

### 3. Соответствие типов фронта и бэкенда

- `TransactionRead` (бэкенд) ↔ `Transaction` (фронт) — одинаковый набор полей, кроме типа `id` (int vs uuid/string). На фронте можно привести `id` к строке.
- `TransactionCreate/Update` (бэкенд) ↔ `TransactionFormValues` (фронт) — форма перед отправкой конвертируется:
  - `amount: string` → `amount: number`.
  - `date: string (YYYY-MM-DD)` → `date: string` в ISO: `new Date(date).toISOString()`.

### 4. Примеры запросов для замены локального репозитория

#### 4.1. Получение списка транзакций

Вместо `getTransactions()` из `src/entities/transaction.api.ts`:

```ts
async function fetchTransactions(token: string): Promise<Transaction[]> {
  const res = await fetch('http://localhost:8000/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to load transactions')
  }

  const data = await res.json()
  return data.map((t: any) => ({
    ...t,
    id: String(t.id),
  }))
}
```

#### 4.2. Создание транзакции

```ts
async function createTransactionApi(token: string, payload: TransactionFormValues): Promise<Transaction> {
  const body = {
    title: payload.title,
    amount: Number(payload.amount),
    category: payload.category,
    type: payload.type,
    date: new Date(payload.date).toISOString(),
    note: payload.note,
  }

  const res = await fetch('http://localhost:8000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error('Failed to create transaction')
  }

  const created = await res.json()
  return { ...created, id: String(created.id) }
}
```

#### 4.3. Аналитика

```ts
async function fetchAnalytics(token: string) {
  const res = await fetch('http://localhost:8000/transactions/analytics/summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to load analytics')
  }
  return res.json()
}
```

Возвращаемое значение по полям соответствует текущему использованию функций `groupByCategory`, `groupByType`, `groupByDate` на фронте.

