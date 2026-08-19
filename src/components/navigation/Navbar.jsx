import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import MenuOverlay from './MenuOverlay'
import { navigation, cafe } from '../../data/cafe'

export default function Navbar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const { cartCount, toggleCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const threshold = 80
      if (currentY < threshold) {
        setIsVisible(true)
      } else if (currentY > lastScrollY.current + 5) {
        setIsVisible(false)
      } else if (currentY < lastScrollY.current - 5) {
        setIsVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOverlayOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOverlayOpen])

  return (
    <>
      {/* Hidden SVG wave filter — defined once */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="wave-filter" x="-10%" y="-60%" width="120%" height="220%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.1"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 pt-4">
          <div className="flex items-center justify-between rounded-full px-7 py-3.5 bg-[#0e0905]/75 backdrop-blur-xl border border-white/[0.06] shadow-lg shadow-black/30">

            {/* Brand — wave pour on hover */}
            <Link
              to="/"
              className="nuur-brand group relative font-display text-lg tracking-[0.25em] font-semibold select-none"
              aria-label="Nuur — Home"
            >
              <span className="text-white">{cafe.name.toUpperCase()}</span>
              <span
                aria-hidden="true"
                className="nuur-brand__fill absolute inset-0 overflow-hidden text-[#c9a96e]"
                style={{ filter: 'url(#wave-filter)' }}
              >
                {cafe.name.toUpperCase()}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-[#c9a96e]'
                      : 'text-white/80 hover:text-[#c9a96e]'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-[#c9a96e]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/online-order"
                className="hidden md:inline-flex items-center px-6 py-2 rounded-full bg-[#c9a96e] text-[#0e0905] text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#e8d5b0] transition-colors duration-300"
              >
                Order
              </Link>

              <button
                onClick={toggleCart}
                className="relative p-2 text-white hover:opacity-80 transition-opacity"
                aria-label={`Cart with ${cartCount} items`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#c9a96e] text-[#0e0905] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label={isOverlayOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOverlayOpen}
              >
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${isOverlayOpen ? 'rotate-45 translate-y-[3.75px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${isOverlayOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${isOverlayOpen ? '-rotate-45 -translate-y-[3.75px]' : ''}`} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      <MenuOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </>
  )
}
