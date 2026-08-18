import { useEffect, useState } from 'react'

const MQL = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => MQL?.matches ?? false)

  useEffect(() => {
    if (!MQL) return
    const handler = (e) => setReduced(e.matches)
    MQL.addEventListener('change', handler)
    return () => MQL.removeEventListener('change', handler)
  }, [])

  return reduced
}
