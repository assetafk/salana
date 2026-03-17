import type { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-6">
      {children}
    </div>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white/80 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      {children}
    </div>
  )
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[32px] font-semibold tracking-tight text-zinc-900">
        {title}
      </h1>
      {subtitle ? <p className="text-sm text-zinc-500">{subtitle}</p> : null}
    </div>
  )
}

