import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { menuData, categories } from '../data/menu'
import ProductCard from '../components/ui/ProductCard'
import ProductPreview from '../components/ui/ProductPreview'
import { useReducedMotion } from '../hooks/useReducedMotion'


export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewProduct, setPreviewProduct] = useState(null)
  const gridRef = useRef(null)
  const headerRef = useRef(null)
  const categoryRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const allCategories = ['All', ...categories]

  const filteredProducts = activeCategory === 'All'
    ? menuData.flatMap((cat) => cat.products)
    : menuData.find((cat) => cat.category === activeCategory)?.products || []

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(headerRef.current?.children || [], { y: 0, opacity: 1 })
      return
    }
    gsap.fromTo(
      headerRef.current?.children || [],
      { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [prefersReducedMotion])

  const handleCategoryChange = useCallback((category) => {
    if (category === activeCategory) return

    const cards = gridRef.current?.querySelectorAll('[data-card]')
    if (cards?.length && !prefersReducedMotion) {
      gsap.to(cards, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(category)
        },
      })
    } else {
      setActiveCategory(category)
    }
  }, [activeCategory, prefersReducedMotion])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    if (cards.length) {
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
      )
    }
  }, [activeCategory, prefersReducedMotion])

  return (
    <div className="min-h-screen bg-cream-50 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="mb-16">
          <span className="label-lg text-gold-600 block mb-3">Menu</span>
          <h1 className="font-display text-display-xl text-brown-900 font-semibold mb-4">
            Everything we serve,<br />made with intention.
          </h1>
          <p className="text-body-lg text-brown-600 max-w-lg">
            From single-origin pour-overs to house-baked pastries. Each item
            crafted with care, priced fairly, and ready when you are.
          </p>
        </div>

        <div
          ref={categoryRef}
          className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide"
          role="tablist"
          aria-label="Menu categories"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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
          role="tabpanel"
        >
          {filteredProducts.map((product, i) => (
            <div key={product.id} data-card>
              <ProductCard
                product={product}
                index={i}
                onPreview={setPreviewProduct}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-lg text-brown-500">No items in this category yet.</p>
          </div>
        )}
      </div>

      <ProductPreview
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  )
}
