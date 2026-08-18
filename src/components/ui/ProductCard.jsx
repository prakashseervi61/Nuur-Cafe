import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product, index = 0, onPreview }) {
  const { addItem } = useCart()
  const cardRef = useRef(null)
  const addedRef = useRef(false)

  useEffect(() => {
    if (!cardRef.current) return
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
  }, [index])

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product)

    if (cardRef.current && !addedRef.current) {
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
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-500 cursor-pointer opacity-0"
      onClick={() => onPreview?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPreview?.(product) } }}
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
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brown-900/80 text-cream-100 text-[11px] tracking-wider font-medium backdrop-blur-sm">
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
          className="w-full py-2.5 rounded-xl bg-brown-900 text-cream-50 text-sm font-medium tracking-wide hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Order
        </button>
      </div>
    </div>
  )
}
