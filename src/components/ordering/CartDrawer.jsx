import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, cartTotal, cartCount } = useCart()
  const drawerRef = useRef(null)
  const overlayRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return

    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      )
    } else {
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1 })
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-16 left-0 right-0 bottom-0 bg-brown-950/60 backdrop-blur-sm z-[60]"
        onClick={closeCart}
        style={{ opacity: 0 }}
      />
      <div
        ref={drawerRef}
        className="fixed top-16 right-0 bottom-0 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col z-[65]"
        style={{ transform: 'translateX(100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-brown-100">
          <div>
            <h2 className="font-display text-lg font-semibold">Your Order</h2>
            <p className="text-body-sm text-brown-500 mt-0.5">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-brown-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-brown-100 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brown-400">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p className="font-display text-lg font-medium text-brown-900 mb-1">Your cart is empty</p>
              <p className="text-body-sm text-brown-500 mb-6">Add something delicious to get started.</p>
              <Link
                to="/menu"
                onClick={closeCart}
                className="px-6 py-3 rounded-full bg-brown-900 text-cream-50 text-sm font-medium hover:bg-brown-800 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="flex gap-4 p-3 rounded-2xl bg-white shadow-sm"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-medium text-brown-900 truncate">{item.name}</h3>
                    <p className="text-body-xs text-brown-500 mt-0.5">€{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-brown-200 flex items-center justify-center text-brown-600 hover:bg-brown-100 transition-colors text-sm"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-brown-200 flex items-center justify-center text-brown-600 hover:bg-brown-100 transition-colors text-sm"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-brown-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-brown-900">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brown-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-body-lg text-brown-600">Total</span>
              <span className="font-display text-xl font-semibold">€{cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/online-order"
              onClick={closeCart}
              className="block w-full py-3.5 rounded-full bg-brown-900 text-cream-50 text-center font-medium tracking-wide hover:bg-brown-800 transition-colors"
            >
              Go to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}