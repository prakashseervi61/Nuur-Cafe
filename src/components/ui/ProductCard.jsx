import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ProductCard({ product, index = 0, onPreview }) {
  const { addItem } = useCart()
  const showToast = useToast()
  const cardRef = useRef(null)
  const addedRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!cardRef.current) return
    if (prefersReducedMotion) {
      gsap.set(cardRef.current, { y: 0, opacity: 1 })
      return
    }
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.08,
        ease: 'power3.out',
      }
    )
  }, [index, prefersReducedMotion])

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product)
    showToast('Added')

    if (!prefersReducedMotion && cardRef.current && !addedRef.current) {
      addedRef.current = true
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          onComplete: () => { addedRef.current = false },
        }
      )
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-500 opacity-0"
      onClick={() => onPreview?.(product)}
      aria-label={`${product.name} — €${product.price.toFixed(2)}`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1a120b]/80 text-[#fdf6ee] text-[11px] tracking-[0.08em] font-medium backdrop-blur-sm border border-white/10">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-base font-medium text-brown-900 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
          <span className="font-display text-sm font-semibold text-brown-900 whitespace-nowrap">
            €{product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-body-sm text-brown-500 line-clamp-2 mb-4">
          {product.description}
        </p>
        <button
          onClick={handleAddToCart}
          className="group/cta flex w-full items-center justify-between gap-3 rounded-xl bg-brown-900 px-4 py-3 text-cream-50 text-sm font-medium tracking-wide shadow-sm shadow-brown-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:text-brown-950 hover:shadow-md hover:shadow-gold-600/20 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label={`Add ${product.name} to cart`}
        >
          <span>Add to Order</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  )
}
