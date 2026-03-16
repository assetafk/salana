import { Outlet, NavLink } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_#ffffff1a,_transparent_55%),radial-gradient(circle_at_bottom,_#4f46e51a,_transparent_55%)]" />
      <header className="relative border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100">
            <span className="h-6 w-6 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-sm shadow-black/40" />
            Finance Flow
          </span>
          <nav className="flex gap-1 rounded-full bg-zinc-900/60 p-1 text-xs font-medium text-zinc-300 shadow-sm shadow-black/40 ring-1 ring-white/10">
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-zinc-50 text-zinc-900 shadow-sm'
                    : 'hover:bg-zinc-800/60'
                }`
              }
            >
              Транзакции
            </NavLink>
            <NavLink
              to="/transactions/new"
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-zinc-50 text-zinc-900 shadow-sm'
                    : 'hover:bg-zinc-800/60'
                }`
              }
            >
              Создать
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-zinc-50 text-zinc-900 shadow-sm'
                    : 'hover:bg-zinc-800/60'
                }`
              }
            >
              Аналитика
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="relative mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
