import { Outlet, NavLink } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold tracking-tight">
            Finance Flow
          </span>
          <nav className="flex gap-4 text-sm font-medium">
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `rounded px-3 py-1 transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              Транзакции
            </NavLink>
            <NavLink
              to="/transactions/new"
              className={({ isActive }) =>
                `rounded px-3 py-1 transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              Создать
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `rounded px-3 py-1 transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              Аналитика
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
