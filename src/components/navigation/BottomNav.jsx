import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const items = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    path: '/menu',
    label: 'Menu',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    ),
  },
  {
    path: '/online-order',
    label: 'Order',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navRef = useRef(null)
  const itemRefs = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!navRef.current) return
    const ctx = gsap.context(() => {
      const itemsToAnimate = itemRefs.current.filter(Boolean)
      if (prefersReducedMotion) {
        gsap.set(navRef.current, { y: 0, opacity: 1 })
        gsap.set(itemsToAnimate, { y: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        navRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power3.out' }
      )
      gsap.fromTo(
        itemsToAnimate,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, delay: 0.35, stagger: 0.08, ease: 'back.out(1.5)' }
      )
    }, navRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    const activeItem = itemRefs.current[items.findIndex((item) => item.path === location.pathname)]
    if (activeItem) {
      gsap.fromTo(activeItem, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
    }
  }, [location.pathname, prefersReducedMotion])

  return (
    <nav ref={navRef} className="fixed bottom-3 left-3 right-3 z-[55] md:hidden overflow-hidden rounded-2xl border border-[#8c5437]/40 bg-[#1a120b]/95 shadow-2xl shadow-[#110d08]/30 backdrop-blur-xl" aria-label="Mobile navigation">
      <div className="flex items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {items.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              ref={(element) => { itemRefs.current[index] = element }}
              to={item.path}
              className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all duration-300 ${
                isActive
                  ? 'bg-[#f5c96b]/10 text-[#f5c96b]'
                  : 'text-[#b9a896] hover:bg-[#fdf8f3]/5 hover:text-[#f7efe5]'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400" />
                )}
              </span>
              <span className="text-[10px] tracking-wider font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
