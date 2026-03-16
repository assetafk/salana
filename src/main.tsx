import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { TransactionsListPage } from './routes/TransactionsListPage.tsx'
import { TransactionCreatePage } from './routes/TransactionCreatePage.tsx'
import { TransactionDetailPage } from './routes/TransactionDetailPage.tsx'
import { AnalyticsPage } from './routes/AnalyticsPage.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/transactions" replace />} />
            <Route path="transactions" element={<TransactionsListPage />} />
            <Route path="transactions/new" element={<TransactionCreatePage />} />
            <Route path="transactions/:id" element={<TransactionDetailPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
