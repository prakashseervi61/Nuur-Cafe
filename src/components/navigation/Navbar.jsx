import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import MenuOverlay from './MenuOverlay'
import { navigation, cafe } from '../../data/cafe'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
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
        setIsScrolled(false)
      } else if (currentY > lastScrollY.current + 5) {
        setIsVisible(false)
      } else if (currentY < lastScrollY.current - 5) {
        setIsVisible(true)
      }

      setIsScrolled(currentY > threshold)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOverlayOpen(false)
  }, [location])

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOverlayOpen])

  const routeBgColors = {
    '/': { r: 86, g: 80, b: 80 },
    '/about': { r: 253, g: 248, b: 243 },
  }

  const currentBg = routeBgColors[location.pathname] || routeBgColors['/']
  const { r, g, b } = currentBg
  const navBg = isScrolled
    ? `rgba(${Math.round(r * 0.3)}, ${Math.round(g * 0.3)}, ${Math.round(b * 0.3)}, 0.95)`
    : `rgba(${r}, ${g}, ${b}, 0.4)`

  const navTextColor = 'text-brown-900'
  const navHoverColor = 'hover:text-gold-600'
  const navActiveColor = 'text-gold-600'
  const navActiveLine = 'bg-gold-600'
  const hamburgerColor = 'bg-brown-900'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 pt-4">
          <div
            className="flex items-center justify-between rounded-full px-7 py-3.5 backdrop-blur-xl shadow-lg shadow-brown-950/20 transition-colors duration-500"
            style={{ backgroundColor: navBg }}
          >
            <Link
              to="/"
              className={`font-display text-xl tracking-[0.2em] font-bold transition-colors duration-300 ${navTextColor}`}
              aria-label="Nuur — Home"
            >
              {cafe.name.toUpperCase()}
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navigation.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm tracking-[0.06em] uppercase font-semibold transition-colors duration-300 ${
                    location.pathname === item.path
                      ? navActiveColor
                      : `${navTextColor} ${navHoverColor}`
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className={`absolute -bottom-1 left-0 h-px w-full ${navActiveLine}`} />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/online-order"
                className="hidden md:inline-flex items-center px-6 py-2 rounded-full bg-gold-500 text-brown-900 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-300"
              >
                Order
              </Link>

              <button
                onClick={toggleCart}
                className={`relative p-2 transition-colors ${navTextColor} hover:opacity-80`}
                aria-label={`Cart with ${cartCount} items`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-500 text-brown-900 text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label={isOverlayOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOverlayOpen}
              >
                <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${hamburgerColor} ${isOverlayOpen ? 'rotate-45 translate-y-[3.75px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] transition-all duration-300 ${hamburgerColor} ${isOverlayOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${hamburgerColor} ${isOverlayOpen ? '-rotate-45 -translate-y-[3.75px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MenuOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </>
  )
}
