import { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
      {children}
    </div>
  )
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[28px] font-semibold tracking-tight text-zinc-50">
        {title}
      </h1>
      {subtitle ? <p className="text-sm text-zinc-400">{subtitle}</p> : null}
    </div>
  )
}

