import { Outlet, NavLink } from 'react-router-dom'
import { InteractiveBackground } from './shared/components/Background.tsx'

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <InteractiveBackground />
      <header className="relative border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900">
            <span className="h-6 w-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-600 shadow-sm shadow-black/10" />
            Finance Flow
          </span>
          <nav className="hidden gap-1 rounded-full bg-zinc-100/80 p-1 text-xs font-medium text-zinc-600 shadow-sm shadow-black/5 ring-1 ring-zinc-200 sm:flex">
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-zinc-900 text-zinc-50 shadow-sm'
                    : 'hover:bg-white'
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
                    ? 'bg-zinc-900 text-zinc-50 shadow-sm'
                    : 'hover:bg-white'
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
                    ? 'bg-zinc-900 text-zinc-50 shadow-sm'
                    : 'hover:bg-white'
                }`
              }
            >
              Аналитика
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default App
