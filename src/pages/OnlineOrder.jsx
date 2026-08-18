import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { menuData, categories } from '../data/menu'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ui/ProductCard'
import ProductPreview from '../components/ui/ProductPreview'


export default function OnlineOrder() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewProduct, setPreviewProduct] = useState(null)
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  const allCategories = ['All', ...categories]

  const filteredProducts = activeCategory === 'All'
    ? menuData.flatMap((cat) => cat.products)
    : menuData.find((cat) => cat.category === activeCategory)?.products || []

  useEffect(() => {
    gsap.fromTo(
      headerRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
    )
  }, [activeCategory])

  const [checkoutStep, setCheckoutStep] = useState(null)

  const handleCheckout = () => {
    setCheckoutStep('details')
  }

  const handlePlaceOrder = () => {
    setCheckoutStep('confirmed')
    gsap.fromTo(
      '.order-confirmed',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="mb-12">
          <span className="label-lg text-gold-600 block mb-3">Order Online</span>
          <h1 className="font-display text-display-xl text-brown-900 font-semibold mb-4">
            Skip the queue.
          </h1>
          <p className="text-body-lg text-brown-600 max-w-lg">
            Order ahead and pick up when it's ready. Same quality, zero wait.
          </p>
        </div>

        {checkoutStep === 'confirmed' ? (
          <div className="order-confirmed max-w-lg mx-auto rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold text-brown-900 mb-3">Order Placed</h2>
            <p className="text-body-lg text-brown-600 mb-2">
              Your order will be ready for pickup in approximately 10–15 minutes.
            </p>
            <p className="text-body-sm text-brown-500 mb-8">
              We'll send a notification when it's ready. Order #{Math.floor(Math.random() * 900) + 100}
            </p>
            <button
              onClick={() => { clearCart(); setCheckoutStep(null) }}
              className="px-6 py-2.5 rounded-full bg-brown-900 text-cream-50 text-sm font-medium hover:bg-brown-800 transition-colors"
            >
              Start New Order
            </button>
          </div>
        ) : checkoutStep === 'details' ? (
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setCheckoutStep(null)}
              className="flex items-center gap-2 text-body-sm text-brown-600 hover:text-brown-900 transition-colors mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to menu
            </button>

            <div className="rounded-3xl bg-white p-8 shadow-sm mb-6">
              <h3 className="font-display text-xl font-semibold text-brown-900 mb-6">Your Order</h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown-900 truncate">{item.name}</p>
                      <p className="text-xs text-brown-500">€{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-brown-100 text-brown-600 flex items-center justify-center text-sm hover:bg-brown-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-brown-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-brown-100 text-brown-600 flex items-center justify-center text-sm hover:bg-brown-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium text-brown-900 w-16 text-right">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-brown-100" />
              <div className="flex justify-between mt-4">
                <span className="text-body-md text-brown-600">Total</span>
                <span className="font-display text-lg font-semibold text-brown-900">€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm mb-6">
              <h3 className="font-display text-lg font-semibold text-brown-900 mb-4">Pickup Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 rounded-xl bg-brown-50 border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone number (for ready notification)"
                  className="w-full px-4 py-3.5 rounded-xl bg-brown-50 border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                />
                <select className="w-full px-4 py-3.5 rounded-xl bg-brown-50 border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all">
                  <option>When should it be ready?</option>
                  <option>ASAP (10–15 min)</option>
                  <option>In 30 minutes</option>
                  <option>In 1 hour</option>
                </select>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
            >
              Place Order — €{total.toFixed(2)}
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide" role="tablist">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brown-900 text-cream-50'
                      : 'bg-brown-100 text-brown-600 hover:bg-brown-200'
                  }`}
                  role="tab"
                  aria-selected={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <div key={product.id} data-card>
                  <ProductCard product={product} index={i} onPreview={setPreviewProduct} />
                </div>
              ))}
            </div>

            {itemCount > 0 && (
              <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                  onClick={handleCheckout}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-brown-900 text-cream-50 font-medium shadow-2xl hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
                >
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-brown-950 text-xs font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                  View Order — €{total.toFixed(2)}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ProductPreview
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  )
}
