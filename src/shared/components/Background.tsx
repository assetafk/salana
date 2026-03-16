import { useEffect, useState } from 'react'

type Point = { x: number; y: number }

export function InteractiveBackground() {
  const [cursor, setCursor] = useState<Point>({ x: 50, y: 30 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setCursor({ x, y })
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  const spotlight = `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(24,24,27,0.16), transparent 60%)`
  const base = 'radial-gradient(circle at top, #e5e7eb, transparent 55%), radial-gradient(circle at bottom, #d4d4d8, transparent 55%)'

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 transition-colors duration-500"
      style={{
        backgroundImage: `${spotlight}, ${base}`,
      }}
    />
  )
}

