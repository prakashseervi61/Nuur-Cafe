import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
  const location = useLocation()
  const containerRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      gsap.set(containerRef.current, { opacity: 1 })
      return
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
