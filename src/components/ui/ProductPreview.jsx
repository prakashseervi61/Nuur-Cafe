import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ProductPreview({ product, onClose }) {
  const { addItem } = useCart()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!product) return

    document.body.style.overflow = 'hidden'

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(contentRef.current, { y: 0, opacity: 1, scale: 1 })

      const handleEsc = (e) => { if (e.key === 'Escape') handleClose() }
      window.addEventListener('keydown', handleEsc)

      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    }

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        contentRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.15'
      )

    const handleEsc = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
      tl.kill()
    }
  }, [product, prefersReducedMotion])

  const handleClose = () => {
    if (prefersReducedMotion) {
      onClose()
      return
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    })
    tl.to(contentRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.1')
  }

  const handleAdd = () => {
    addItem(product)
    handleClose()
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-brown-950/70 backdrop-blur-md"
        onClick={handleClose}
      />
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl max-h-[90vh] bg-cream-50 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-brown-900/80 text-cream-50 flex items-center justify-center hover:bg-brown-900 transition-colors backdrop-blur-sm"
          aria-label="Close preview"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          {product.tag && (
            <span className="label-sm text-gold-600 block mb-2">{product.tag}</span>
          )}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-brown-900 mb-2">
            {product.name}
          </h2>
          <p className="font-display text-xl font-semibold text-gold-700 mb-4">
            €{product.price.toFixed(2)}
          </p>
          <p className="text-body-md text-brown-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.ingredients && (
            <div className="mb-6">
              <p className="label-sm text-brown-400 uppercase mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-brown-100 text-brown-700 text-xs"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
            >
              Add to Order — €{product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
