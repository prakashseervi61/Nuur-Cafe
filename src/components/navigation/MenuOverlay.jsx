import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { navigation, cafe } from '../../data/cafe'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const menuItemsRef = useRef([])
  const location = useLocation()
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!overlayRef.current) return

    if (prefersReducedMotion) {
      if (isOpen) {
        gsap.set(overlayRef.current, { visibility: 'visible', clipPath: 'inset(0 0 0% 0)' })
        gsap.set(menuItemsRef.current, { y: 0, opacity: 1 })
      } else if (hasAnimated.current) {
        gsap.set(overlayRef.current, { visibility: 'hidden' })
      }
      hasAnimated.current = true
      return
    }

    if (isOpen) {
      const tl = gsap.timeline()

      tl.set(overlayRef.current, { visibility: 'visible' })
        .fromTo(
          overlayRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
        )
        .fromTo(
          menuItemsRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: -0.2 }
        )
    } else if (hasAnimated.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden' })
        },
      })

      tl.to(menuItemsRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.in',
      })
        .to(
          overlayRef.current,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.5,
            ease: 'power4.inOut',
          },
          '-=0.15'
        )
    }

    hasAnimated.current = true
  }, [isOpen, prefersReducedMotion])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-brown-950 flex flex-col justify-center items-center"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav className="flex flex-col items-center gap-6">
        {navigation.map((item, i) => (
          <Link
            key={item.path}
            to={item.path}
            ref={(el) => (menuItemsRef.current[i] = el)}
            onClick={onClose}
            className={`group relative font-display text-5xl md:text-7xl font-light tracking-tight transition-colors duration-300 ${
              location.pathname === item.path
                ? 'text-gold-400'
                : 'text-cream-100 hover:text-cream-50'
            }`}
          >
            <span className="relative z-10">{item.label}</span>
            {location.pathname === item.path && (
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-400" />
            )}
          </Link>
        ))}
      </nav>

      <div
        ref={(el) => (menuItemsRef.current[navigation.length] = el)}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2"
      >
        <p className="text-cream-500 text-sm tracking-wider">
          {cafe.address.full}
        </p>
        <p className="text-cream-600 text-xs tracking-wider">
          {cafe.phone}
        </p>
      </div>
    </div>
  )
}
